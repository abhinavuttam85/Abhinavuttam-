import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON and urlencoded parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API endpoint for reservations
  app.post("/api/bookings", async (req, res) => {
    try {
      const { name, phone, guests, date, time, foodItem } = req.body;

      // Validate input data
      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ success: false, error: "Please enter a valid full name." });
      }

      if (!phone || !/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({ success: false, error: "Please enter a valid 10-digit mobile number." });
      }

      const guestsNum = parseInt(guests, 10);
      if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 15) {
        return res.status(400).json({ success: false, error: "Number of guests must be between 1 and 15." });
      }

      if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ success: false, error: "Please pick a valid booking date." });
      }

      // Check if date is in the past (only date part)
      const bookingDate = new Date(date);
      bookingDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (bookingDate < today) {
        return res.status(400).json({ success: false, error: "Booking date cannot be in the past." });
      }

      if (!time || typeof time !== "string" || !time.includes(":")) {
        return res.status(400).json({ success: false, error: "Please select a valid time." });
      }

      // SMS Templates
      const customerContact = "+91 99999 56832";
      const foodItemDesc = foodItem && foodItem !== "None (Reserve table only)" ? ` pre-ordering ${foodItem}` : "";
      const customerMsg = `Hi ${name}, your table request${foodItemDesc} at SGF Narela for ${guestsNum} guests on ${date} at ${time} has been sent! We look forward to serving you at Bawana-Narela Road. For updates call: ${customerContact}.`;
      const adminMsg = `NEW BOOKING ALERT: ${name} (${phone}) requested a table for ${guestsNum} people on ${date} at ${time}${foodItem ? ` with food: ${foodItem}` : ""}.`;

      // Twilio credentials checking
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioFrom = process.env.TWILIO_FROM_NUMBER;
      const twilioAdminTo = process.env.TWILIO_TO_ADMIN_NUMBER;

      const keysPresent = !!(twilioSid && twilioToken && twilioFrom && twilioAdminTo);

      if (keysPresent) {
        console.log(`[Twilio Integration] Credentials detected. Sending SMS to Customer (${phone}) and Admin (${twilioAdminTo})`);
        
        try {
          // Send to Customer
          const customerResponse = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
            {
              method: "POST",
              headers: {
                "Authorization": `Basic ${Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                From: twilioFrom,
                To: phone.startsWith("+") ? phone : `+91${phone}`,
                Body: customerMsg,
              }).toString(),
            }
          );

          let customerFailed = false;
          let adminFailed = false;

          if (!customerResponse.ok) {
            customerFailed = true;
            console.log(`[Twilio Service Alert]: Customer notification status ${customerResponse.status}. Details summarized internally.`);
          }

          // Send to Admin
          const adminResponse = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
            {
              method: "POST",
              headers: {
                "Authorization": `Basic ${Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                From: twilioFrom,
                To: twilioAdminTo.startsWith("+") ? twilioAdminTo : `+91${twilioAdminTo}`,
                Body: adminMsg,
              }).toString(),
            }
          );

          if (!adminResponse.ok) {
            adminFailed = true;
            console.log(`[Twilio Service Alert]: Admin notification status ${adminResponse.status}. Details summarized internally.`);
          }

          if (customerFailed || adminFailed) {
            // Authentic keys present but failed credentials check (401 etc.) or other Twilio check
            console.log("[Twilio Service Alert]: Credentials response status activates local sandbox fallback.");
            return res.status(200).json({
              success: true,
              simulated: true, // fallback to sandbox
              message: "Reservation logged successfully! (SMS Simulation Active - Check Credentials)",
              warning: "The configured Twilio credentials failed authentication. Falls back to simulator mode dynamically.",
              messages: {
                customer: customerMsg,
                admin: adminMsg,
              },
              data: { name, phone, guests: guestsNum, date, time, foodItem: foodItem || "None" }
            });
          }

          return res.status(200).json({
            success: true,
            simulated: false,
            message: "Table booked! SMS confirmations sent successfully via Twilio.",
            data: { name, phone, guests: guestsNum, date, time, foodItem: foodItem || "None" }
          });

        } catch (twilioErr: any) {
          console.log(`[Twilio Service Alert]: Dispatch connection status. Message: ${twilioErr?.message || twilioErr}`);
          // Fallback to simulated success so user's app experience is uninterrupted
          return res.status(200).json({
            success: true,
            simulated: true,
            warning: "Twilio API encountered a connection error. Simulating delivery locally.",
            messages: {
              customer: customerMsg,
              admin: adminMsg,
            },
            data: { name, phone, guests: guestsNum, date, time, foodItem: foodItem || "None" }
          });
        }
      } else {
        // Simulated execution (Twilio keys missing)
        console.log(`[Development Mock SMS Logging]:
----------------------------------------
To Customer (+91${phone}):
"${customerMsg}"
----------------------------------------
To Store Admin (${twilioAdminTo || "+91 99999 56832 (Default)"}):
"${adminMsg}"
----------------------------------------`);

        return res.status(200).json({
          success: true,
          simulated: true,
          message: "Thank you! Your table booking has been tentatively recorded.",
          messages: {
            customer: customerMsg,
            admin: adminMsg,
          },
          data: { name, phone, guests: guestsNum, date, time, foodItem: foodItem || "None" }
        });
      }

    } catch (routeErr: any) {
      console.error("[Backend Booking Error]:", routeErr);
      return res.status(500).json({ success: false, error: routeErr?.message || "Internal server error." });
    }
  });

  // Local/In-Memory Testimonials storage (fallback when Supabase is not configured)
  let localTestimonials = [
    {
      id: "review-1",
      name: "Aman Sharma",
      text: "The Malai Chaap here is out of this world! It has a perfect melt-in-your-mouth texture with just the right amount of cardamoms.",
      rating: 5,
      created_at: new Date().toISOString()
    },
    {
      id: "review-2",
      name: "Pooja Malhotra",
      text: "Best pure veg food option in Narela Bhorgarh area. SGF maintains high standards and the tandoori butter naan is always crisp and fresh.",
      rating: 5,
      created_at: new Date().toISOString()
    },
    {
      id: "review-3",
      name: "Vikram Singh",
      text: "Extremely friendly staff and clean open kitchen. We booked a family table for 10 people and the service was super fast. Highly recommended!",
      rating: 4,
      created_at: new Date().toISOString()
    }
  ];

  // Lazy compilers for custom environment clients
  let supabaseInstance: any = null;
  const getSupabase = () => {
    if (!supabaseInstance) {
      const url = process.env.SUPABASE_URL?.trim();
      const anon = process.env.SUPABASE_ANON_KEY?.trim();
      const isUrlValid = (str: string) => {
        try {
          const u = new URL(str);
          return u.protocol === "http:" || u.protocol === "https:";
        } catch (_) {
          return false;
        }
      };

      if (url && anon && isUrlValid(url)) {
        try {
          supabaseInstance = createClient(url, anon);
          console.log("[Supabase Status] Connected to client.");
        } catch (err) {
          console.log("[Supabase Status] Offline check bypassed.");
        }
      } else if (url && anon) {
        console.log("[Supabase Status] Checked local fallback schema.");
      }
    }
    return supabaseInstance;
  };

  let stripeInstance: any = null;
  const getStripe = () => {
    if (!stripeInstance) {
      const secret = process.env.STRIPE_SECRET_KEY?.trim();
      if (secret && secret !== "STRIPE_SECRET_KEY") {
        try {
          stripeInstance = new Stripe(secret);
          console.log("[Stripe Status] Connected to payment client.");
        } catch (err) {
          console.log("[Stripe Status] Standby bypass activated.");
        }
      }
    }
    return stripeInstance;
  };

  // Testimonials Fetch API Endpoint
  app.get("/api/testimonials", async (req, res) => {
    try {
      const supabase = getSupabase();
      if (supabase) {
        console.log("[Supabase] Fetching testimonials table...");
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          return res.json({ success: true, count: data.length, data, source: "supabase" });
        }
        console.warn("[Supabase Warn] Failed to query table testimonials, falling back to local list. Error:", error);
      }
      
      // Fallback is local in memory
      return res.json({ success: true, count: localTestimonials.length, data: localTestimonials, source: "local" });
    } catch (err: any) {
      console.error("[Testimonials GET API Error]:", err);
      return res.json({ success: true, count: localTestimonials.length, data: localTestimonials, source: "local" });
    }
  });

  // Testimonials Insert API Endpoint
  app.post("/api/testimonials", async (req, res) => {
    try {
      const { name, text, rating } = req.body;

      if (!name || !text) {
        return res.status(400).json({ success: false, error: "Please enter your name and a genuine review text." });
      }

      const parsedRating = parseInt(rating, 10) || 5;

      const newReview = {
        id: "review-" + Date.now(),
        name: name.trim(),
        text: text.trim(),
        rating: Math.max(1, Math.min(5, parsedRating)),
        created_at: new Date().toISOString()
      };

      const supabase = getSupabase();
      if (supabase) {
        console.log("[Supabase] Attempting to insert review to remote table: testimonials");
        const { data, error } = await supabase
          .from("testimonials")
          .insert([newReview])
          .select();

        if (!error) {
          return res.status(201).json({ success: true, data: newReview, synced: true });
        }
        console.warn("[Supabase Error] insert failed, fallback to local database saving:", error);
      }

      // Add to local list state
      localTestimonials.unshift(newReview);
      return res.status(201).json({ success: true, data: newReview, synced: false });
    } catch (err: any) {
      console.error("[Testimonials POST API Error]:", err);
      return res.status(500).json({ success: false, error: "Unable to record testimonial." });
    }
  });

  // Stripe Payment Checkout Intent Endpoint
  app.post("/api/payments/create-checkout-session", async (req, res) => {
    try {
      const { bookingName, phone, amountINR, guests } = req.body;

      const userAmount = parseInt(amountINR, 10) || 500; // default reservation deposit to 500 INR

      // Check Stripe Keys
      const stripe = getStripe();
      if (stripe) {
        console.log("[Stripe API] Initializing checkout session for guarantee deposit...");
        
        // Use App URL as fallback redirection point for success/failure
        const appUrl = process.env.APP_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: `SGF Narela Premium Table Deposit`,
                  description: `Guarantee Deposit for ${guests || 2} guests under name: ${bookingName || "SGF Guest"} (${phone || "Local Contact"})`,
                },
                unit_amount: userAmount * 100, // Stripe expects paise for INR
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${appUrl}?payment_status=success&amount=${userAmount}&trx_id=stripe_${Date.now()}`,
          cancel_url: `${appUrl}?payment_status=cancelled`,
        });

        return res.json({
          success: true,
          simulated: false,
          sessionId: session.id,
          checkoutUrl: session.url,
          amount: userAmount
        });
      } else {
        // Stripe Credentials Not Configured -> Support fully detailed Development Sandbox Simulator!
        console.log(`[Stripe Dev Mode Simulator]: Initiating high-conversion transaction for ₹${userAmount}`);
        
        const mockTrxId = "sgf_mock_stripe_" + Math.random().toString(36).substring(4).toUpperCase();
        
        return res.json({
          success: true,
          simulated: true,
          trxId: mockTrxId,
          amount: userAmount,
          message: "Thank you! Testing simulator mode initialized. Proceed to local confirmation gateway.",
          customerName: bookingName || "Guest",
          customerPhone: phone || "9999956832"
        });
      }

    } catch (paymentErr: any) {
      console.error("[Payments Backend Error]:", paymentErr);
      return res.status(500).json({ success: false, error: paymentErr?.message || "Internal server error." });
    }
  });

  // Serve static assets in production, otherwise mount Vite
  if (process.env.NODE_ENV !== "production") {
    console.log("[Dev Environment] Mounting Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Production Environment] Serving static files from 'dist'...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully up at http://0.0.0.0:${PORT}`);
  });
}

startServer();
