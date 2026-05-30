import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Utensils, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Menu as MenuIcon, 
  X, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Users, 
  SlidersHorizontal,
  Leaf,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Sun,
  Moon,
  Ticket,
  Printer,
  Download,
  Sparkles,
  QrCode,
  Share2
} from "lucide-react";
import { MENU_ITEMS } from "./menuData";
import { MenuItem } from "./types";
import TestimonialsSection from "./components/TestimonialsSection";
import GallerySection from "./components/GallerySection";

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Theme Toggle State
  const [theme, setTheme] = useState(() => {
    // Check local storage or default to dark
    const savedTheme = localStorage.getItem("sgf-theme");
    return savedTheme || "dark";
  });

  // Toggle Theme effect
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("sgf-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  
  // Booking Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [foodItem, setFoodItem] = useState("None (Reserve table only)");
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [smsSimulated, setSmsSimulated] = useState(false);
  const [smsLogs, setSmsLogs] = useState<any>(null);
  const [selectedChannel, setSelectedChannel] = useState<"whatsapp" | "sms" | null>(null);
  const [successTab, setSuccessTab] = useState<"pass" | "receipt">("pass");
  const [walletAdded, setWalletAdded] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [downloadingPass, setDownloadingPass] = useState(false);
  const [downloadFinished, setDownloadFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(900); // 15 mins hold duration

  // Validation Error States for Shake & Red Glow
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});

  // VIP Seating and Payment Integration State Controls
  const [wantsVIPSeat, setWantsVIPSeat] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentTrxId, setPaymentTrxId] = useState("");
  const [isSimulatedPayment, setIsSimulatedPayment] = useState(false);

  // Simulated credit card terminal inputs
  const [ccNumber, setCCNumber] = useState("");
  const [ccExpiry, setCCExpiry] = useState("");
  const [ccCvv, setCCCvv] = useState("");
  const [ccName, setCCName] = useState("");

  // Countdown Timer for table auto-release
  useEffect(() => {
    let interval: any = null;
    if (submitSuccess) {
      setSecondsLeft(900); // 15 minutes limit (900 seconds)
      setSelectedChannel(null);
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [submitSuccess]);

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePrintPass = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    const passId = "SGF-PASS-" + (bookingDetails?.phone?.slice(-4) || "8812");
    const vipTag = bookingDetails?.wantsVIP || paymentSuccess ? "★ FIRST CLASS VIP" : "ELITE CLASS DINER";
    const dishInfo = bookingDetails?.foodItem && bookingDetails.foodItem !== "None (Reserve table only)" 
      ? "<div style='margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px;'>" +
        "<strong>PRE-ORDERED DISH COUPON:</strong><br>" +
        "<span style='font-size: 15px; color: #ff3c00; font-weight: bold;'>" + bookingDetails.foodItem + "</span>" +
        "</div>"
      : "";

    const htmlLines = [
      "<html>",
      "  <head>",
      "    <title>SGF Narela Dining Pass - " + (bookingDetails?.name || "") + "</title>",
      "    <style>",
      "      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@500;700&display=swap');",
      "      body { font-family: 'Space Grotesk', 'Courier New', sans-serif; background: #fff; color: #111; padding: 40px 20px; display: flex; justify-content: center; align-items: center; }",
      "      .pass-card { border: 3px solid #ff4500; padding: 30px; width: 380px; border-radius: 16px; position: relative; background: #fafafa; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }",
      "      .header-info { border-bottom: 2px dashed #000; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }",
      "      .brand { font-weight: 900; font-size: 20px; letter-spacing: -0.5px; color: #ff4500; margin: 0; }",
      "      .subtitle { font-size: 9px; letter-spacing: 2px; color: #666; margin-top: 4px; text-transform: uppercase; }",
      "      .pass-tag { display: inline-block; margin-top: 10px; background: #111; color: #fff; font-size: 10px; font-weight: bold; padding: 4px 12px; border-radius: 50px; letter-spacing: 1px; }",
      "      .row { display: flex; justify-content: space-between; margin: 12px 0; font-size: 13px; font-family: 'JetBrains Mono', monospace; }",
      "      .label { color: #666; font-size: 11px; }",
      "      .value { font-weight: bold; color: #111; }",
      "      .barcode { margin: 25px 0 10px 0; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 4px; border-top: 1px dashed #ccc; padding-top: 20px; }",
      "      .watermark { text-align: center; font-size: 9px; color: #888; margin-top: 15px; font-style: italic; }",
      "    </style>",
      "  </head>",
      "  <body onload='window.print()'>",
      "    <div class='pass-card'>",
      "      <div class='header-info'>",
      "        <div class='brand'>SGF NARELA</div>",
      "        <div class='subtitle'>Express Dining Boarding Pass</div>",
      "        <div class='pass-tag'>" + vipTag + "</div>",
      "      </div>",
      "      <div class='row'><span class='label'>PASS-ID:</span><span class='value'>" + passId + "</span></div>",
      "      <div class='row'><span class='label'>PASS HOLDER:</span><span class='value'>" + (bookingDetails?.name || "").toUpperCase() + "</span></div>",
      "      <div class='row'><span class='label'>CONTACT NO:</span><span class='value'>+91 " + (bookingDetails?.phone || "") + "</span></div>",
      "      <div class='row'><span class='label'>DINERS NO:</span><span class='value'>" + (bookingDetails?.guests || "") + " Guests</span></div>",
      "      <div class='row'><span class='label'>ARRIVING DATE:</span><span class='value'>" + (bookingDetails?.date || "") + "</span></div>",
      "      <div class='row'><span class='label'>TIME SLOT:</span><span class='value' style='font-size: 15px; color: #ff4500;'>" + (bookingDetails?.time || "") + "</span></div>",
      dishInfo,
      "      <div class='barcode'>||||| | ||||| | |||| | ||| ||||<br>" + passId + "</div>",
      "      <div class='watermark'>Please present upon entry at front desk.<br>SGF Narela • Ready to delicious.</div>",
      "    </div>",
      "  </body>",
      "</html>"
    ];

    printWindow.document.write(htmlLines.join("\n"));
    printWindow.document.close();
  };

  // Set today's date for date minimum validation attribute
  const [todayString, setTodayString] = useState("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setTodayString(`${yyyy}-${mm}-${dd}`);
    setDate(`${yyyy}-${mm}-${dd}`);

    // Parse incoming Stripe callbacks (Redirect URL queries)
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment_status");
    const stripeTrxId = params.get("trx_id");
    const amountVal = params.get("amount");

    if (paymentStatus === "success") {
      setPaymentSuccess(true);
      setPaymentTrxId(stripeTrxId || "stripe_completed_authorized");
      setIsSimulatedPayment(false);
      setBookingDetails({
        name: "SGF Premium VIP Guest",
        phone: "Stripe Secure Payer",
        guests: "VVIP Sofa Lounge Confirmed",
        date: "See Card Statement",
        time: "Pre-Authorized Timslot",
        amountPaid: amountVal || "500"
      });
      setSubmitSuccess(true);
      
      // Clean query parameters from URL for clean appearance
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === "cancelled") {
      setSubmitError("Seating confirmation prepay checkout session was cancelled. Standard seat request remains open.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Simple scroll spy to update active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "menu", "book-table", "find-us"];
      const scrollPosition = window.scrollY + 120; // offset for sticky header

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Form Submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setInvalidFields([]);
    setShakeFields({});

    // Extra Validation
    if (!name.trim()) {
      setSubmitError("Please enter your full name.");
      setIsSubmitting(false);
      setInvalidFields((prev) => [...prev, "name"]);
      setShakeFields((prev) => ({ ...prev, name: true }));
      setTimeout(() => {
        setShakeFields((prev) => ({ ...prev, name: false }));
      }, 500);
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setSubmitError("Please enter a valid 10-digit mobile number.");
      setIsSubmitting(false);
      setInvalidFields((prev) => [...prev, "phone"]);
      setShakeFields((prev) => ({ ...prev, phone: true }));
      setTimeout(() => {
        setShakeFields((prev) => ({ ...prev, phone: false }));
      }, 500);
      return;
    }
    const guestNum = parseInt(guests, 10);
    if (isNaN(guestNum) || guestNum < 1 || guestNum > 15) {
      setSubmitError("Bookings are strictly limited to 1 to 15 guests.");
      setIsSubmitting(false);
      setInvalidFields((prev) => [...prev, "guests"]);
      setShakeFields((prev) => ({ ...prev, guests: true }));
      setTimeout(() => {
        setShakeFields((prev) => ({ ...prev, guests: false }));
      }, 500);
      return;
    }
    if (!date) {
      setSubmitError("Please select a date for your booking.");
      setIsSubmitting(false);
      setInvalidFields((prev) => [...prev, "date"]);
      setShakeFields((prev) => ({ ...prev, date: true }));
      setTimeout(() => {
        setShakeFields((prev) => ({ ...prev, date: false }));
      }, 500);
      return;
    }
    if (!time) {
      setSubmitError("Please select a time slot for your booking.");
      setIsSubmitting(false);
      setInvalidFields((prev) => [...prev, "time"]);
      setShakeFields((prev) => ({ ...prev, time: true }));
      setTimeout(() => {
        setShakeFields((prev) => ({ ...prev, time: false }));
      }, 500);
      return;
    }

    try {
      setSubmissionStep(1); // Checking slot availability
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      setSubmissionStep(2); // Routing SMS Alerts & database updates
      
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          guests: guestNum,
          date,
          time,
          foodItem,
        }),
      });

      const result = await response.json();
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmissionStep(3); // Engraving secure reservation pass
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (response.ok && result.success) {
        const capturedDetails = {
          ...result.data,
          wantsVIP: wantsVIPSeat,
          amountPaid: wantsVIPSeat ? "500" : "0"
        };
        setBookingDetails(capturedDetails);
        setSmsSimulated(result.simulated);
        if (result.messages) {
          setSmsLogs(result.messages);
        }

        // Reset selected channel in modal so the user gets to choose WhatsApp or SMS confirmation option
        setSelectedChannel(null);

        // Clear form inputs
        setName("");
        setPhone("");
        setGuests("2");
        setFoodItem("None (Reserve table only)");

        if (wantsVIPSeat) {
          setPaymentModalOpen(true);
          setPaymentLoading(true);
          
          try {
            const payRes = await fetch("/api/payments/create-checkout-session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingName: name,
                phone: phone,
                amountINR: 500,
                guests: guestNum
              })
            });

            const payResult = await payRes.json();
            if (payRes.ok && payResult.success) {
              if (payResult.simulated) {
                // Remote credentials missing -> trigger robust local developer checkout sandbox
                setIsSimulatedPayment(true);
                setPaymentTrxId(payResult.trxId);
              } else if (payResult.checkoutUrl) {
                // Redirect straight to real Stripe checkout site!
                window.location.href = payResult.checkoutUrl;
                return;
              }
            } else {
              console.warn("Payment initiation bypassed. Serving standard free booking.");
              setSubmitSuccess(true);
            }
          } catch (payErr) {
            console.error("[Payments Integration Init Error]:", payErr);
            setSubmitSuccess(true);
          } finally {
            setPaymentLoading(false);
          }
        } else {
          setPaymentSuccess(false);
          setSubmitSuccess(true);
        }
      } else {
        setSubmitError(result.error || "Failed to confirm table booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Network error. Unable to connect to backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter Menu Items
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#121212] font-sans antialiased selection:bg-[#FF4500] selection:text-white relative">
      {/* Visual Accent Ambient Orbs */}
      <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] bg-radial from-[#FF4500]/10 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 animate-float" />
      <div className="absolute top-3/4 right-1/12 w-[550px] h-[550px] bg-radial from-[#D2143A]/10 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/2 animate-float" style={{ animationDelay: '3s' }} />

      {/* 1. Navbar Container (Sticky Glassmorphism) */}
      <header id="navbar-header" className="sticky top-0 z-50 w-full glass-morphism-header transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* SGF Branding Left */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-black/50 p-1 border border-white/5 group-hover:border-[#FF4500]/30 transition-all">
              <img 
                src="/src/assets/images/sgf_logo_1780040236840.png" 
                alt="SGF Narela Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display font-bold text-lg leading-none tracking-tight block text-white group-hover:text-gradient-flame transition-all">
                SGF <span className="text-xs font-semibold text-gray-400">Narela</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-semibold block text-[#FF4500]">
                Spice Grill Flame
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" id="header-desktop-nav">
            {[
              { id: "home", label: "Home" },
              { id: "experience", label: "Our Story" },
              { id: "menu", label: "Interactive Menu" },
              { id: "book-table", label: "Book Table" },
              { id: "find-us", label: "Find Us" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-4 py-2 font-bold text-xs uppercase tracking-widest rounded-full border transition-all duration-300 ease-out hover:scale-105 hover:bg-white/[0.04] hover:border-[#FF4500]/45 hover:shadow-[0_0_18px_rgba(255,69,0,0.35)] ${
                  activeSection === link.id
                    ? "text-white border-white/10 bg-white/[0.03] shadow-[0_0_10px_rgba(255,255,255,0.02)]"
                    : "text-gray-400 hover:text-white border-transparent"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Call To Action Right */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#book-table" 
              className="relative inline-flex items-center gap-2 group px-6 py-2.5 rounded-full bg-gradient-flame hover:scale-[1.03] transition-all duration-300 font-semibold text-sm text-white fire-glow-strong overflow-hidden"
              id="desktop-cta-book"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Calendar className="w-4 h-4 animate-pulse-slow" />
              <span>Book Table</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
            </a>
          </div>

          {/* Responsive Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none transition-colors relative z-50"
            id="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, scaleY: 0.95 }}
              animate={{ height: "auto", opacity: 1, scaleY: 1 }}
              exit={{ height: 0, opacity: 0, scaleY: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="md:hidden absolute top-full left-0 right-0 z-50 bg-[#121212]/98 border-b border-white/5 backdrop-blur-xl w-full overflow-hidden origin-top"
              id="mobile-nav-drawer"
            >
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.05
                    }
                  }
                }}
                className="px-4 pt-3 pb-6 space-y-2 flex flex-col"
              >
                {[
                  { id: "home", label: "Home" },
                  { id: "experience", label: "Our Story" },
                  { id: "menu", label: "Interactive Menu" },
                  { id: "book-table", label: "Book Table" },
                  { id: "find-us", label: "Find Us" },
                ].map((link) => (
                  <motion.a
                    key={link.id}
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                    }}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                      activeSection === link.id
                        ? "bg-gradient-flame text-white shadow-lg shadow-orange-600/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 20 } }
                  }}
                  className="pt-4 border-t border-white/5"
                >
                  <a
                    href="#book-table"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-flame text-white font-bold tracking-wide text-center uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4 animate-bounce" />
                    Reserve Now
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section (High-Impact Modern Industrial Flame) */}
      <section 
        id="home" 
        className="relative min-h-[92vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Cinematic Backdrop Image with Strong Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/sgf_kitchen_hero_1780040266453.png" 
            alt="SGF smoky indian tandoori kitchen background" 
            className="w-full h-full object-cover scale-[1.02] filter brightness-[0.25] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/92 via-transparent to-[#121212]/92" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Animated Flame Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#2c130b] border border-[#FF4500]/30 rounded-full px-4 py-1.5 mb-8 hover:border-[#FF4500]/60 transition-colors"
          >
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span>
              <Flame className="relative w-3.5 h-3.5 text-[#FF4500] fill-[#FF4500]" />
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-white">
              SGF Narela Store • Open Everyday
            </span>
          </motion.div>

          {/* Title Text */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1] uppercase"
          >
            SGF Narela: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#ff6a00] to-[#D2143A]">
              Igniting Flavors,
            </span> <br />
            Crafting Memories
          </motion.h1>

          {/* Decent Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-light mb-10"
          >
            Experience the ultimate culinary journey with the finest North Indian delicacies, signature chaaps, and smoky tandoori grills in Narela.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#book-table" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-flame text-white font-bold rounded-full cursor-pointer text-center text-sm uppercase tracking-wide transition-all shadow-lg hover:scale-[1.04] fire-glow-strong"
            >
              Book a Table
            </a>
            
            <a 
              href="#menu" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-full text-center text-sm uppercase tracking-wide transition-all"
            >
              Explore Menu
            </a>
          </motion.div>

          {/* Core USP Badges beneath CTAs */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/5 pt-10">
            {[
              { title: "Pure Veg Options", icon: Leaf, desc: "SGF Specialties Available" },
              { title: "100% Charcoal Tandoor", icon: Flame, desc: "Authentic Smoky Taste" },
              { title: "Open Kitchen Energy", icon: Utensils, desc: "Hygiene & Freshness First" },
              { title: "Opposite Hanuman Mandir", icon: MapPin, desc: "Easy to Reach in Narela" }
            ].map((usp, i) => (
              <div key={i} className="flex flex-col items-center text-center p-2">
                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#FF4500]/10 flex items-center justify-center text-[#FF4500] mb-3">
                  <usp.icon className="w-5 h-5" />
                </div>
                <h4 className="text-white font-semibold text-xs tracking-wide">{usp.title}</h4>
                <p className="text-[10px] text-gray-400 mt-1">{usp.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. About / Experience Section */}
      <section 
        id="experience" 
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative z-10 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column (Left) */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-4/3 fire-glow">
                <img 
                  src="/src/assets/images/sgf_kitchen_hero_1780040266453.png" 
                  alt="SGF gourmet dish tandoori skewers close up" 
                  className="w-full h-full object-cover filter brightness-[0.7] saturate-[1.2]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4500] block mb-1">
                    Bawana-Narela Road Point
                  </span>
                  <p className="text-white font-display font-semibold text-lg">
                    Opposite Hanuman Mandir, Bhorgarh
                  </p>
                </div>
              </div>
              {/* Offset decorative block */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-dashed border-[#FF4500]/20 rounded-2xl -z-0 pointer-events-none" />
            </div>

            {/* High-End Copy Column (Right) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[#FF4500] text-xs font-bold uppercase tracking-widest block font-mono">
                  THE PREMIER CASUAL DINING DESTINATION
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
                  DELHI’S ORIGINAL SMOKY EMBERS INDULGENAL BLISS
                </h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed font-light">
                At <strong>SGF (Spice Grill Flame) Narela</strong>, we bring centuries of North Indian street food elegance and modern casual dining together under one high-octane roof. Nestled convenience-first right opposite the historic Bhorgarh Hanuman Mandir on the Bawana - Narela Road, SGF has become a trusted local culinary household.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-xl bg-white/2 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm text-white">Pure Vegetarian Standards</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Our strict hygiene norms guarantee superb, flavor-packed vegetarian dishes and high-energy culinary delight.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/2 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500]">
                      <UTestIcon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm text-white">Legendary signature chaaps</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Marinated for 12 hours in our unique spice formulas prior to tandoori combustion, delivering soft juicy layers.
                  </p>
                </div>
              </div>

              {/* Business Stats Grid */}
              <div className="border-t border-white/5 pt-8 grid grid-cols-3 gap-6">
                <div>
                  <span className="font-display font-extrabold text-[#FF4500] text-3xl block">11:00</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">AM Opening Hour</span>
                </div>
                <div>
                  <span className="font-display font-extrabold text-white text-3xl block">12:00</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">AM Midnight Close</span>
                </div>
                <div>
                  <span className="font-display font-extrabold text-[#D2143A] text-3xl block">7</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Days a Week Open</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials Display and Submission Module */}
      <TestimonialsSection />


      {/* 4. Interactive Menu Section */}
      <section 
        id="menu" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[#181818] relative z-10 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-[#FF4500] text-xs font-bold uppercase tracking-widest block font-mono">
                DISCOVER THE SMOKY CULINARY INDEX
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
                THE SGF NARELA MENU CARD
              </h2>
              <p className="text-sm text-gray-400 max-w-xl">
                Fresh ingredients cooked by seasoned chefs inside intensive traditional clay ovens. Try our iconic Achari & Malai Soy Chaaps.
              </p>
            </div>

            {/* Keyword Search Field */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search spicy chaap, naan, rolls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
              />
              <SlidersHorizontal className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Toggle Filters Container */}
          <div className="flex overflow-x-auto pb-4 gap-2.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { id: "all", label: "All Masterpieces" },
              { id: "tandoor", label: "Straight From the Tandoor" },
              { id: "rolls", label: "Rumali Rolls & Wraps" },
              { id: "chinese", label: "Hot Selling Chinese" },
              { id: "continental", label: "Burgers, Pasta & Pizza" },
              { id: "northindian", label: "North Indian Curries" },
              { id: "breads", label: "Tandoori Breads" },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all duration-300 uppercase ${
                  selectedCategory === category.id
                    ? "bg-[#FF4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.35)] cursor-default"
                    : "bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredMenuItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Item Top: Veg status & tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Pure Veg Badge - green border, green circle inside */}
                        <div className="w-5 h-5 border-2 border-emerald-600 rounded flex items-center justify-center bg-transparent">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-[10px] opacity-45 uppercase tracking-widest font-black text-gray-300">
                          Vegetarian
                        </span>
                      </div>
                      
                      {/* Popular / Signature Tag */}
                      {item.popular && (
                        <div className="bg-[#ff4500]/10 text-[#FF4500] border border-[#ff4500]/20 text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                          <Flame className="w-3 h-3 fill-current" />
                          Signature
                        </div>
                      )}
                    </div>

                    {/* Item Header */}
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#F5F5F5] group-hover:text-[#FF4500] transition-colors leading-tight uppercase">
                        {item.name}
                      </h3>
                      {item.spicyLevel && (
                        <div className="flex items-center gap-0.5 mt-1.5" title={`Spiciness level: ${item.spicyLevel}/3`}>
                          {[...Array(item.spicyLevel)].map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 text-[#FF4500] fill-current" />
                          ))}
                          <span className="text-[10px] text-gray-500 font-mono ml-1 uppercase">Spicy</span>
                        </div>
                      )}
                    </div>

                    {/* Item Description */}
                    <p className="text-white/50 text-[11px] leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Price segment */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-white/40 block uppercase tracking-wider font-bold">PRICE</span>
                      <span className="font-display font-extrabold text-[#FF4500] text-xl">
                        ₹{item.price}
                      </span>
                    </div>
                    
                    <a
                      href="#book-table"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white/5 group-hover:bg-[#FF4500] group-hover:text-white text-gray-300 font-semibold text-xs rounded-xl tracking-wide uppercase transition-all duration-300"
                    >
                      <span>Book to Dine</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty Search Fallback */}
            {filteredMenuItems.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 inline-flex items-center justify-center text-gray-500">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold text-lg">No culinary masterpieces match your search</h3>
                <p className="text-gray-400 text-xs max-w-sm mx-auto">
                  Try typing basic terms like &apos;chaap&apos;, &apos;roti&apos;, &apos;Paneer&apos;, or click one of the preset filter category sliders.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Decorative Food and Ambiance Interactive Photo Gallery */}
      <GallerySection />

      {/* 5. Table Booking Engine */}
      <section 
        id="book-table" 
        className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          
          {/* Section Headers */}
          <div className="text-center space-y-2 mb-12">
            <span className="text-[#FF4500] text-xs font-bold uppercase tracking-widest block font-mono">
              INSTANT COMPLETED SECURE SEATING REQUEST
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
              RESERVE YOUR DINING EXPERIENCE
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Our automated system locks in your table and fires confirmation text alerts to your cell phone instantly. Zero booking charges.
            </p>
          </div>

          {/* Booking visual Container split */}
          <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl border border-white/5 grid grid-cols-1 md:grid-cols-12">
            
            {/* Left informational segment */}
            <div className="md:col-span-4 bg-gradient-flame p-8 flex flex-col justify-between text-white relative">
              {/* background graphic */}
              <div className="absolute inset-0 opacity-10 bg-radial from-white to-transparent pointer-events-none" />
              <div className="space-y-6 relative">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/10">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white mb-2">SGF Premium Seating</h3>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    SGF Narela tables hold up to 15 guests via instant digital booking. For larger caterings reach our main desk.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-10 border-t border-white/15 relative">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white/80 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase text-white">Daily Timing</h5>
                    <p className="text-[11px] text-white/80">11:00 AM - 12:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white/80 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase text-white">Direct Desk Contact</h5>
                    <p className="text-[11px] text-white/80">+91 99999 56832</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form segment containing exact requested inputs */}
            <form onSubmit={handleBookingSubmit} className="md:col-span-8 p-8 sm:p-10 space-y-6 bg-white/[0.01]/95 relative overflow-hidden transition-all duration-300">
              
              {/* Submission Interactive Feedback Progressive Overlay */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#121212]/98 backdrop-blur-md p-6 text-center select-none"
                  >
                    <div className="relative w-20 h-20 mb-5">
                      {/* Radiating fire-colored ring halos */}
                      <motion.div 
                        animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.45, 0.15] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/30"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.6, 1], opacity: [0.05, 0.25, 0.05] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}
                        className="absolute -inset-3 rounded-full bg-[#FF4500]/5 border border-[#FF4500]/10"
                      />
                      
                      {/* Central glowing badge */}
                      <div className="absolute inset-1.5 bg-gradient-to-tr from-orange-600/10 to-transparent border border-white/5 rounded-full flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,69,0,0.1)]">
                        <Flame className="w-7 h-7 text-[#FF4500] fill-[#FF4500]/30 animate-pulse" />
                      </div>
                    </div>

                    <h4 className="font-display font-extrabold text-lg text-white tracking-widest uppercase mb-1">
                      Booking Your Slot
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-6">
                      RESERVING AT SGF NARELA
                    </p>

                    {/* Highly tactile process list */}
                    <div className="w-full max-w-xs space-y-3.5 font-mono text-[11px] text-left border border-white/5 p-4 rounded-2xl bg-black/40">
                      {/* Step 1 */}
                      <div className={`flex items-center gap-3 transition-opacity duration-300 ${submissionStep >= 1 ? "opacity-100" : "opacity-30"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                          submissionStep > 1 
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                            : submissionStep === 1
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 animate-pulse"
                              : "border-gray-600 text-gray-500"
                        }`}>
                          {submissionStep > 1 ? "✓" : "1"}
                        </div>
                        <span className={submissionStep > 1 ? "text-gray-400 line-through" : "text-white"}>
                          Checking table availability...
                        </span>
                        {submissionStep === 1 && (
                          <span className="ml-auto text-[9px] font-black text-amber-500 animate-pulse">BUSY</span>
                        )}
                        {submissionStep > 1 && (
                          <span className="ml-auto text-[9px] font-black text-emerald-400">DONE</span>
                        )}
                      </div>

                      {/* Step 2 */}
                      <div className={`flex items-center gap-3 transition-opacity duration-300 ${submissionStep >= 2 ? "opacity-100" : "opacity-30"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                          submissionStep > 2 
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                            : submissionStep === 2
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 animate-pulse"
                              : "border-gray-600 text-gray-500"
                        }`}>
                          {submissionStep > 2 ? "✓" : "2"}
                        </div>
                        <span className={submissionStep > 2 ? "text-gray-400 line-through" : "text-white"}>
                          Registering SMS stream...
                        </span>
                        {submissionStep === 2 && (
                          <span className="ml-auto text-[9px] font-black text-amber-500 animate-pulse">ACTIVE</span>
                        )}
                        {submissionStep > 2 && (
                          <span className="ml-auto text-[9px] font-black text-emerald-400">DONE</span>
                        )}
                      </div>

                      {/* Step 3 */}
                      <div className={`flex items-center gap-3 transition-opacity duration-300 ${submissionStep >= 3 ? "opacity-100" : "opacity-30"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border ${
                          submissionStep === 3
                            ? "bg-[#FF4500]/10 border-[#FF4500] text-[#FF4500] animate-pulse"
                            : "border-gray-600 text-gray-500"
                        }`}>
                          3
                        </div>
                        <span className="text-white">
                          Generating booking pass...
                        </span>
                        {submissionStep === 3 && (
                          <span className="ml-auto text-[9px] font-black text-[#FF4500] animate-pulse">RUNNING</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {submitError && (
                <div className="p-4 bg-red-950/45 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-200 text-xs">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p>{submitError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 1. Name Input */}
                <motion.div 
                  animate={shakeFields["name"] ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <label htmlFor="customer-name" className="block opacity-40 uppercase text-[9px] font-bold mb-1 tracking-widest text-[#F5F5F5]">
                    Full Name <span className="text-[#FF4500]">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setInvalidFields((prev) => prev.filter((f) => f !== "name"));
                    }}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-600 ${
                      invalidFields.includes("name")
                        ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)] focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-950/10"
                        : "border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]"
                    }`}
                  />
                </motion.div>

                {/* 2. Phone Number Input */}
                <motion.div 
                  animate={shakeFields["phone"] ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <label htmlFor="customer-phone" className="block opacity-40 uppercase text-[9px] font-bold mb-1 tracking-widest text-[#F5F5F5]">
                    10-Digit Mobile Number <span className="text-[#FF4500]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">+91</span>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ''));
                        setInvalidFields((prev) => prev.filter((f) => f !== "phone"));
                      }} // Strips letters
                      className={`w-full bg-white/5 border rounded-xl pl-13 pr-4 py-3 text-sm text-white font-mono focus:outline-none transition-all placeholder-gray-600 ${
                        invalidFields.includes("phone")
                          ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)] focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-950/10"
                          : "border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]"
                      }`}
                    />
                  </div>
                </motion.div>

                {/* 3. Number of People Selector */}
                <motion.div 
                  animate={shakeFields["guests"] ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <label htmlFor="guests-count" className="block opacity-40 uppercase text-[9px] font-bold mb-1 tracking-widest text-[#F5F5F5]">
                    No. of Guests <span className="text-[#FF4500]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="guests-count"
                      required
                      value={guests}
                      onChange={(e) => {
                        setGuests(e.target.value);
                        setInvalidFields((prev) => prev.filter((f) => f !== "guests"));
                      }}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer ${
                        invalidFields.includes("guests")
                          ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)] focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-950/10"
                          : "border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]"
                      }`}
                    >
                      {[...Array(15)].map((_, idx) => (
                        <option key={idx + 1} value={idx + 1} className="bg-[#121212]">
                          {idx + 1} {idx === 0 ? "Person" : "Guests"}
                        </option>
                      ))}
                    </select>
                    <Users className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </motion.div>

                {/* 4. Date Picker */}
                <motion.div 
                  animate={shakeFields["date"] ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <label htmlFor="booking-date" className="block opacity-40 uppercase text-[9px] font-bold mb-1 tracking-widest text-[#F5F5F5]">
                    Date <span className="text-[#FF4500]">*</span>
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    min={todayString}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setInvalidFields((prev) => prev.filter((f) => f !== "date"));
                    }}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer font-mono text-left ${
                      invalidFields.includes("date")
                        ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)] focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-950/10"
                        : "border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]"
                    }`}
                  />
                </motion.div>

                {/* 5. Time Picker */}
                <motion.div 
                  animate={shakeFields["time"] ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <label htmlFor="booking-time" className="block opacity-40 uppercase text-[9px] font-bold mb-1 tracking-widest text-[#F5F5F5]">
                    Sitting Time <span className="text-[#FF4500]">*</span>
                  </label>
                  <input
                    id="booking-time"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      setInvalidFields((prev) => prev.filter((f) => f !== "time"));
                    }}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer font-mono text-left ${
                      invalidFields.includes("time")
                        ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)] focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-950/10"
                        : "border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500]"
                    }`}
                  />
                </motion.div>

                {/* Optional Food Item Selection */}
                <div className="sm:col-span-2 space-y-1">
                  <label htmlFor="booking-food-item" className="block opacity-40 uppercase text-[9px] font-bold mb-1 tracking-widest text-[#F5F5F5]">
                    Pre-Order Food Item (Optional)
                  </label>
                  <div className="relative">
                    <select
                      id="booking-food-item"
                      value={foodItem}
                      onChange={(e) => setFoodItem(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] rounded-xl px-4 pr-10 py-3 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="None (Reserve table only)" className="bg-[#121212]">None (Table Booking Only)</option>
                      {MENU_ITEMS.map((item) => (
                        <option key={item.id} value={`${item.name} (₹${item.price})`} className="bg-[#121212]">
                          {item.name} — ₹{item.price} ({item.veg ? "Veg" : "Non-veg"})
                        </option>
                      ))}
                    </select>
                    <Utensils className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Select a dish to add to this reservation. Our chefs will prepare it fresh when you arrive.
                  </p>
                </div>

                {/* Dining Preference Note */}
                <div className="sm:col-span-2 pt-1">
                  <div className="p-3.5 bg-white/2 border border-white/5 rounded-xl text-[11px] text-gray-400 flex items-start gap-2 leading-relaxed">
                    <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Slight variations like spice tolerance customizations or birthday layout can be requested at the entry desk. There is no booking premium!
                    </span>
                  </div>
                </div>

                {/* Optional VIP Table Guarantee Deposit Toggle */}
                <div className="sm:col-span-2 pt-2">
                  <div className="p-4 rounded-xl border border-[#FF4500]/20 bg-gradient-to-r from-[#FF4500]/5 to-transparent flex items-start gap-3.5 transition-all hover:bg-gradient-to-r hover:from-[#FF4500]/10 hover:border-[#FF4500]/40">
                    <input
                      id="opt-vip-seating"
                      type="checkbox"
                      checked={wantsVIPSeat}
                      onChange={(e) => setWantsVIPSeat(e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 text-[#FF4500] focus:ring-[#FF4500] bg-white/5 cursor-pointer mt-0.5 accent-[#FF4500]"
                    />
                    <div className="space-y-1">
                      <label htmlFor="opt-vip-seating" className="text-xs font-black text-white uppercase tracking-wider block cursor-pointer flex items-center gap-1.5 hover:text-[#FF4500] transition-colors">
                        <Flame className="w-3.5 h-3.5 text-[#FF4500] fill-current animate-pulse" />
                        Lock Premium VVIP Sofa Lounge Seating (₹500 refundable deposit)
                      </label>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                        Guarantees SGF Narela&apos;s best panoramic sofa tables near the fireplace. The ₹500 is fully adjusted in your final dining food bill! Safe card payments powered by Stripe.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* 6. Submit Button */}
              <button
                id="submit-confirm-booking"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-white text-black font-black hover:scale-[1.01] tracking-widest transition-all uppercase text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:bg-[#FF4500] hover:text-white hover:shadow-[0_0_20px_rgba(255,69,0,0.35)]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* 6. Location & Directions */}
      <section 
        id="find-us" 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-[#181818] border-t border-b border-white/5 relative z-10 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contacts & Address details (Col-left) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <span className="text-[#FF4500] text-xs font-bold uppercase tracking-widest block font-mono">
                  SGF PHYSICAL ROAD CONTACT POINT
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight uppercase">
                  FIND US IN NARELA
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Direct opposite the iconic Bhorgarh Hanuman Mandir milestone on the main Bawana Narela highway.
                </p>
              </div>

              {/* Information Cards Stack */}
              <div className="space-y-4">
                
                {/* Coordinates */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white/2 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF4500]/10 flex items-center justify-center text-[#FF4500] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide">Restaurant Address</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      UG Floor, Plot No - 2361,<br />
                      Bawana - Narela Road, Bhorgarh,<br />
                      Narela, Delhi, 110040 (Opposite Hanuman Mandir)
                    </p>
                  </div>
                </div>

                {/* Active Support Timing */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white/2 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide">Hours of Operation</h4>
                    <p className="text-xs text-gray-500 mt-1">Daily 7 days a week</p>
                    <p className="text-xs text-gray-400 font-semibold font-mono mt-0.5">11:00 AM to 12:00 AM Midnight</p>
                  </div>
                </div>

                {/* Store Phone Support */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white/2 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#D2143A]/10 flex items-center justify-center text-[#D2143A] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide">Instant Phone Assistance</h4>
                    <p className="text-xs text-gray-400 mt-1">Reach out for any special directions</p>
                    <p className="text-xs text-white font-bold tracking-wider font-mono mt-0.5">
                      +91 99999 56832 &nbsp;|&nbsp; +91 99999 56833
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Map Box Integration (Col-right) */}
            <div className="lg:col-span-7 h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center -z-10">
                <span className="text-xs text-gray-400 animate-pulse">Loading Map Coordinate...</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1746.0620803273117!2d77.098858229267!3d28.825227741364273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dac68971df731%3A0xe54d2e2553b3f2be!2sBawana%20Narela%20Rd%2C%20Bhorgarh%2C%20Narela%2C%20Delhi%2C%20110040!5e0!3m2!1sen!2sin!4v1780000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.8) invert(0.9) contrast(1.1) brightness(0.9)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="SGF Narela Bawana Highway Map Location"
                id="maps-iframe-widget"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <footer className="bg-[#0f0f0f] border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1 SGF Narela overview */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <img 
                src="/src/assets/images/sgf_logo_1780040236840.png" 
                alt="SGF Logo" 
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-bold text-white text-base">SGF Narela</span>
                <span className="text-[8px] uppercase tracking-widest block text-[#FF4500]">Spice Grill Flame</span>
              </div>
            </a>
            <p className="text-gray-400 mt-2 leading-relaxed">
              Serving Delhi’s most sought after charcoal soya chaaps, rich Punjabi curries, and hand-stretched tandoori breads since inception.
            </p>
          </div>

          {/* Col 2 Quick bookmarks */}
          <div className="space-y-3">
            <h5 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">Company Links</h5>
            <div className="flex flex-col gap-2.5">
              <a href="#home" className="hover:text-white transition-colors">Return Home</a>
              <a href="#experience" className="hover:text-white transition-colors">Our Story / Ambience</a>
              <a href="#menu" className="hover:text-white transition-colors">Explore Food Menu</a>
              <a href="#book-table" className="hover:text-white transition-colors">Reserve Seating Spot</a>
            </div>
          </div>

          {/* Col 3 Timings */}
          <div className="space-y-3">
            <h5 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">Operational Schedule</h5>
            <p className="text-gray-400 leading-relaxed font-mono">
              Monday - Sunday: <br />
              11:00 AM to 12:00 AM <br />
              (Opened seven days a week)
            </p>
            <p className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Accepting Sit-in Dining Reservations</span>
            </p>
          </div>

          {/* Col 4 Quick Contact */}
          <div className="space-y-3">
            <h5 className="text-white font-bold uppercase tracking-wider text-[11px] font-mono">SGF Desk Support</h5>
            <p className="text-gray-400 leading-relaxed leading-6">
              UG Floor, Plot No - 2361,<br />
              Opposite Hanuman Mandir,<br />
              Bawana - Narela Road, Delhi
            </p>
            <div className="flex flex-col text-[#FF4500] font-bold font-mono mt-2 gap-1 text-[13px]">
              <span>+91 99999 56832</span>
              <span>+91 99999 56833</span>
            </div>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <span>
            &copy; {new Date().getFullYear()} Spice Grill Flame (SGF) Narela. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Quality Assured</span>
            <span className="hover:text-white transition-colors cursor-pointer">Health Registry Standards</span>
          </div>
        </div>
      </footer>

      {/* Immediate visuals modal state on click "Confirm Reservation" */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            id="modal-success-screen"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-morphism shadow-2xl border border-white/10 space-y-5 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Ambient Radial Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[45px] pointer-events-none" />

              {selectedChannel === null ? (
                /* STEP 1: CHOOSE CONFIRMATION METHOD (Displaces ticket and congratulations at first) */
                <div className="space-y-6 relative z-10 py-2">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500/20 to-lime-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-pulse">
                      <MessageSquare className="w-6 h-6 text-[#FF4500]" />
                    </div>
                    
                    <h3 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
                      Confirm Dispatch
                    </h3>
                    <p className="text-[10px] text-[#A3E635] font-black tracking-widest uppercase font-mono bg-[#FF4500]/10 px-3 py-1 rounded-full border border-[#FF4500]/20">
                      Almost Done — Choose Channel
                    </p>
                    <p className="text-[11.5px] text-gray-300 max-w-xs leading-relaxed">
                      Secure and hold your selected dining slot at SGF Narela by choosing instant receipt dispatch via WhatsApp or SMS below:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {/* Option 1: Reserve through WhatsApp */}
                    <motion.button
                      whileHover={{ scale: 1.02, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedChannel("whatsapp");
                        const foodText = bookingDetails?.foodItem && bookingDetails.foodItem !== "None (Reserve table only)" ? `\nFood Item: ${bookingDetails.foodItem}` : "";
                        const waText = `Hi SGF, I have reserved a table\nName: ${bookingDetails?.name || ""}\nPhone no: +91${bookingDetails?.phone || ""}\nNo of people: ${bookingDetails?.guests || ""}\nDate: ${bookingDetails?.date || ""}\nTime: ${bookingDetails?.time || ""}${foodText}`;
                        const waUrl = `https://wa.me/918511438482?text=${encodeURIComponent(waText)}`;
                        window.open(waUrl, "_blank");
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl border border-emerald-500/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all text-left group cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_0_10px_rgba(37,211,102,0.3)] group-hover:scale-110 transition-transform">
                          <Smartphone className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-white uppercase tracking-wider block">
                            Reserve through WhatsApp
                          </span>
                          <span className="text-[9px] text-[#25D366] font-mono">
                            Send direct message draft
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.button>

                    {/* Option 2: Reserve through SMS */}
                    <motion.button
                      whileHover={{ scale: 1.02, translateY: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedChannel("sms");
                        const foodText = bookingDetails?.foodItem && bookingDetails.foodItem !== "None (Reserve table only)" ? `\nFood Item: ${bookingDetails.foodItem}` : "";
                        const smsText = `Hi SGF, I have reserved a table\nName: ${bookingDetails?.name || ""}\nPhone no: +91${bookingDetails?.phone || ""}\nNo of people: ${bookingDetails?.guests || ""}\nDate: ${bookingDetails?.date || ""}\nTime: ${bookingDetails?.time || ""}${foodText}`;
                        const smsUrl = `sms:+918511438482?body=${encodeURIComponent(smsText)}`;
                        window.open(smsUrl, "_blank");
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl border border-[#00acee]/30 bg-sky-500/10 hover:bg-sky-500/20 transition-all text-left group cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-[0_0_10px_rgba(14,165,233,0.3)] group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-white uppercase tracking-wider block">
                            Reserve through SMS
                          </span>
                          <span className="text-[9px] text-sky-400 font-mono">
                            Transmit via text message
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                /* STEP 2: TABLE IS RESERVED, TICKET RECEIPT & THANK YOU NOTE DISPLAYED */
                <div className="space-y-4 relative z-10 max-h-[70vh] overflow-y-auto pr-1">
                  {/* Success check circle/ring with spinning dashes */}
                  <div className="flex flex-col items-center text-center space-y-2.5 relative z-10">
                    <div className="relative flex justify-center items-center mb-1 animate-fadeIn">
                      {/* Outer breathing halo */}
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute w-16 h-16 rounded-full bg-emerald-500/20 blur-sm pointer-events-none"
                      />
                      
                      {/* Rotating dashed ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute w-14 h-14 rounded-full border border-dashed border-emerald-500/20 pointer-events-none"
                      />

                      {/* Main check circle */}
                      <motion.div 
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500/20 to-lime-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      >
                        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Visual Title */}
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase" id="booking-success-title">
                      Table is Reserved
                    </h3>
                    <p className="text-[9px] text-[#A3E635] font-black tracking-widest uppercase font-mono bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20">
                      Ready to serve you at SGF Narela
                    </p>
                  </div>

                  {/* Polished Thank You note */}
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center space-y-1 my-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FF4500] font-mono leading-none">
                      Thank You Note
                    </p>
                    <p className="text-[11px] text-gray-300 leading-normal font-sans">
                      Thank you for choosing SGF Narela! Your reservation is officially secured. We dispatched your ticket summary over <strong className="text-[#A3E635] uppercase">{selectedChannel}</strong>. Present this ticket pass at the reception for immediate dining.
                    </p>
                  </div>

                  {/* Interactive Tab Switcher for Booking Details */}
                  {bookingDetails && (
                    <div className="flex bg-[#1E1E22] border border-white/5 rounded-xl p-0.5 relative z-10 font-sans">
                      <button
                        onClick={() => setSuccessTab("pass")}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all focus:outline-none ${
                          successTab === "pass"
                            ? "bg-gradient-to-r from-[#FF4500] to-orange-500 text-white shadow-lg"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        Dining Pass
                      </button>
                      <button
                        onClick={() => setSuccessTab("receipt")}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all focus:outline-none ${
                          successTab === "receipt"
                            ? "bg-black/50 text-white border border-white/5"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        Receipt Details
                      </button>
                    </div>
                  )}

                  {/* TAB A: DIGITAL BOARDING PASS CARD */}
                  {successTab === "pass" && bookingDetails && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-tr from-[#161619] via-[#101012] to-[#0A0A0C] border-2 border-[#FF4500]/25 shadow-[0_15px_40px_rgba(255,69,0,0.12)] space-y-4 text-left overflow-hidden"
                    >
                      {/* Decorative Gloss Reflection Glow */}
                      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                      {/* Header with brand logo & Pass stamp */}
                      <div className="flex justify-between items-start border-b border-white/5 pb-3 relative z-10">
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-black tracking-widest text-[#FF4500] uppercase font-mono leading-none flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 animate-pulse text-[#FF4500]" />
                            EXPRESS DINING PASS
                          </p>
                          <h4 className="font-display font-black text-white text-base tracking-tight leading-none uppercase">
                            SGF Narela
                          </h4>
                          <p className="text-[7px] text-gray-400 font-mono tracking-wider">
                            SPICED GOURMET FARE GROUP
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`text-[8.5px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider border font-mono ${
                            bookingDetails?.wantsVIP || paymentSuccess
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.15)]"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                            {bookingDetails?.wantsVIP || paymentSuccess ? "★ VIP PREMIUM" : "STANDARD ELITE"}
                          </span>
                          <span className="text-[7px] text-gray-500 font-mono mt-1">
                            CODE: SGF-{Math.abs(bookingDetails.name?.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)) || "7829"}
                          </span>
                        </div>
                      </div>

                      {/* Passenger Details Boarding Grid */}
                      <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-b border-white/5 pb-4 font-mono relative z-10">
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none">DINER NAME</p>
                          <p className="text-[11.5px] font-bold text-white uppercase mt-1 tracking-wide leading-tight truncate">
                            {bookingDetails.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none">SEATING ACCESS</p>
                          <p className="text-[11.5px] font-bold text-amber-400 mt-1 uppercase leading-tight">
                            {bookingDetails?.wantsVIP || paymentSuccess ? "VVIP Sofa Lounge" : `${bookingDetails.guests} Guests (Table)`}
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none">RESERVATION DATE</p>
                          <p className="text-[11px] font-bold text-white mt-1">
                            {bookingDetails.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none">ARRIVING TIME</p>
                          <p className="text-[12.5px] font-black text-[#FF4500] mt-0.5">
                            {bookingDetails.time}
                          </p>
                        </div>
                      </div>

                      {/* Special food preordered or standard access banner */}
                      {bookingDetails.foodItem && bookingDetails.foodItem !== "None (Reserve table only)" ? (
                        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-between text-[10px] relative z-10 font-mono">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <div>
                              <p className="font-bold text-white text-[9px] leading-none">PRE-ORDERED DINING VOUCHER</p>
                              <p className="text-gray-400 text-[8.5px] mt-0.5 leading-tight">{bookingDetails.foodItem}</p>
                            </div>
                          </div>
                          <span className="text-[8.5px] text-amber-400 uppercase font-black tracking-widest bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/15 shrink-0">
                            VALID AT TABLE
                          </span>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-[#222]/40 border border-white/5 flex items-center gap-2 text-[9px] text-gray-400 relative z-10 leading-normal">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <p>Present pass at the SGF front desk for fast-track seating access and priority queue selection.</p>
                        </div>
                      )}

                      {/* Barcode and Verification Indicator */}
                      <div className="flex items-center justify-between pt-1 relative z-10">
                        <div className="space-y-0.5 max-w-[62%] font-sans">
                          <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Verified Reservation</span>
                          </div>
                          <p className="text-[8px] text-gray-400 leading-normal">
                            Issued instantly on {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}. Validity starts 15 mins prior to time slot.
                          </p>
                          <p className="text-[7px] text-gray-500 uppercase font-mono mt-1">
                            Sign: Executive Host, SGF
                          </p>
                        </div>
                        
                        {/* Custom SVG-rendered QR code graphic */}
                        <div className="w-[68px] h-[68px] bg-white rounded-xl p-1.5 flex items-center justify-center relative shadow-lg shrink-0 overflow-hidden select-none">
                          <div className="grid grid-cols-5 gap-[1.5px] w-full h-full opacity-90">
                            {/* QR corners layout */}
                            <div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-gray-400 rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" />
                            <div className="bg-black rounded-sm" /><div className="bg-white rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-white rounded-sm" /><div className="bg-black rounded-sm" />
                            <div className="bg-gray-400 rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-gray-300 rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-gray-400 rounded-sm" />
                            <div className="bg-black rounded-sm" /><div className="bg-white rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-white rounded-sm" /><div className="bg-black rounded-sm" />
                            <div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-gray-400 rounded-sm" /><div className="bg-black rounded-sm" /><div className="bg-black rounded-sm" />
                          </div>
                          {/* SGF signature label */}
                          <div className="absolute inset-0 m-auto w-5 h-5 bg-[#FF4500] text-white flex items-center justify-center text-[5.5px] font-black rounded-md border border-white shadow">
                            SGF
                          </div>
                        </div>
                      </div>

                      {/* Inner Utility Buttons associated with downloading the pass */}
                      <div className="pt-2.5 border-t border-white/5 space-y-2 relative z-10">
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase tracking-wider font-mono">
                          {/* Print card option */}
                          <button
                            onClick={handlePrintPass}
                            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-300 hover:text-white transition-all cursor-pointer focus:outline-none"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#FF4500]" />
                            Print Pass
                          </button>

                          {/* Download pass logic */}
                          <button
                            onClick={() => {
                              if (downloadingPass) return;
                              setDownloadingPass(true);
                              setTimeout(() => {
                                setDownloadingPass(false);
                                setDownloadFinished(true);
                                
                                const element = document.createElement("a");
                                const file = new Blob([
                                  `===================================\n`,
                                  `     SGF NARELA DINNING TICKET      \n`,
                                  `===================================\n`,
                                  `PASS NO   : SGF-PASS-${bookingDetails.phone?.slice(-4) || "8812"}\n`,
                                  `DINER     : ${bookingDetails.name.toUpperCase()}\n`,
                                  `CONTACT   : +91 ${bookingDetails.phone}\n`,
                                  `SEATING   : ${bookingDetails.guests} Guests\n`,
                                  `DATE      : ${bookingDetails.date}\n`,
                                  `TIME SLOT : ${bookingDetails.time}\n`,
                                  `DISP TIME : ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`,
                                  `SEAT PLAN : ${bookingDetails?.wantsVIP || paymentSuccess ? "VVIP PREMIUM SOFA SUITE (₹500 PAID)" : "STANDARD COZY SEAT"}\n`,
                                  `PRE-ORDER : ${bookingDetails.foodItem || "None"}\n`,
                                  `===================================\n`,
                                  `PRESENT THIS FILE UPON ARRIVAL AT RETREAT\n`,
                                  `FAST-TRACK ENTRY CODE DIRECTLY EMBEDDED\n`,
                                ] , {type: 'text/plain'});
                                element.href = URL.createObjectURL(file);
                                element.download = `SGF-DiningPass-${bookingDetails.name.replace(/\s+/g, "_")}.txt`;
                                document.body.appendChild(element);
                                element.click();
                                document.body.removeChild(element);
                              }, 1100);
                            }}
                            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer focus:outline-none relative"
                          >
                            {downloadingPass ? (
                              <span className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                            ) : downloadFinished ? (
                              <>
                                <span className="bg-emerald-500 text-black text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-sans">✓</span>
                                Auto-Saved
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5 text-amber-400" />
                                Save Pass File
                              </>
                            )}
                          </button>
                        </div>

                        {/* Simulated Google or Apple Wallet Integration */}
                        <button
                          onClick={() => {
                            if (walletAdded || walletLoading) return;
                            setWalletLoading(true);
                            setTimeout(() => {
                              setWalletLoading(false);
                              setWalletAdded(true);
                            }, 1200);
                          }}
                          className={`w-full py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer focus:outline-none ${
                            walletAdded 
                              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                              : "bg-[#111112] text-gray-400 hover:text-white border border-white/5 hover:border-[#FF4500]/30"
                          }`}
                        >
                          {walletLoading ? (
                            <>
                              <span className="w-3 h-3 border-2 border-[#FF4500] border-t-transparent rounded-full animate-spin" />
                              Syncing with Wallet Engine...
                            </>
                          ) : walletAdded ? (
                            <>
                              <span className="bg-emerald-500 text-black text-[7px] px-1 rounded-sm">✓</span>
                              ADDED TO APPLE & GOOGLE PASSBOOK
                            </>
                          ) : (
                            <>
                              <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                              ADD TO PHONE WALLET PASSES
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB B: ORIGINAL LUXURY RECEIPT DETAILS VIEW */}
                  {successTab === "receipt" && bookingDetails && (
                    <motion.div 
                      key="receipt-tab"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/5 space-y-3 font-mono text-[10.5px] overflow-hidden shadow-inner text-left"
                    >
                      {/* Left & Right Physical Tear-off Ticket Notches */}
                      <div className="absolute top-[52%] -left-3.5 w-7 h-7 rounded-full bg-[#121212] border-r border-white/5 z-20 pointer-events-none" />
                      <div className="absolute top-[52%] -right-3.5 w-7 h-7 rounded-full bg-[#121212] border-l border-white/5 z-20 pointer-events-none" />
                      
                      {/* Side Dotted Perforation Line between notches */}
                      <div className="absolute top-[52%] left-3.5 right-3.5 border-t border-dashed border-white/10 z-10 pointer-events-none" />

                      {/* Staggered Row details */}
                      <div className="space-y-2.5 pb-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[9.5px]">GUEST NAME:</span>
                          <span className="text-white font-bold uppercase tracking-wide">{bookingDetails.name}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[9.5px]">CONTACT PHONE:</span>
                          <span className="text-white font-bold font-mono">+91 {bookingDetails.phone || "Secure Payer"}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[9.5px]">SEATING VOLUME:</span>
                          <span className="text-white font-bold">{bookingDetails.guests} Guests</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[9.5px]">RESERVATION DATE:</span>
                          <span className="text-emerald-400 font-bold">{bookingDetails.date}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-[9.5px]">ARRIVING TIME:</span>
                          <span className="text-white font-extrabold text-[#FF4500] text-[11px] underline decoration-dotted decoration-[#FF4500]/50">{bookingDetails.time}</span>
                        </div>

                        {bookingDetails.foodItem && bookingDetails.foodItem !== "None (Reserve table only)" && (
                          <div className="flex justify-between items-start pt-0.5 gap-2">
                            <span className="text-gray-500 text-[9.5px] shrink-0">PRE-ORDERED DISH:</span>
                            <span className="text-emerald-400 font-bold text-right leading-tight max-w-[200px]">{bookingDetails.foodItem}</span>
                          </div>
                        )}
                      </div>

                      {/* Perforation segment footer */}
                      <div className="pt-3 space-y-1.5">
                        {/* VIP indicator if applied */}
                        {(bookingDetails?.wantsVIP || paymentSuccess) && (
                          <div className="flex justify-between items-center bg-[#FF4500]/10 p-2 rounded-xl border border-[#FF4500]/20">
                            <span className="text-[#FF4500] font-black text-[9px] flex items-center gap-1">
                              <Flame className="w-3 h-3 fill-current animate-pulse" />
                              SOFA LOUNGE:
                            </span>
                            <span className="text-emerald-400 font-extrabold text-[9.5px] uppercase">
                              VIP Reserved (₹500)
                            </span>
                          </div>
                        )}

                        {/* Highly stylized digital barcode representing the reservation */}
                        <div className="pt-2.5 flex flex-col items-center justify-center space-y-1.5">
                          <div className="flex items-center gap-[1.5px] h-6">
                            {[4, 1, 3, 1, 5, 2, 5, 4, 1, 3, 5, 2, 8, 4, 3, 5, 1, 4].map((val, idx) => (
                              <div 
                                key={idx} 
                                style={{ width: `${(val % 3) + 1}px` }} 
                                className={`h-full bg-white/70 ${idx % 4 === 0 ? 'opacity-40' : 'opacity-90'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[7px] text-gray-500 tracking-[0.25em] font-mono leading-none">
                            SGF-NAR-{bookingDetails.phone ? bookingDetails.phone.slice(-4) : "8511"}-{bookingDetails.time?.replace(":", "") || "1900"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Stripe Payment Success Receipt Token */}
                  {paymentSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/20 space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[10.5px] font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>STRIPE TRANSACT REPORT</span>
                      </div>
                      <span className="block text-[9px] font-mono text-gray-400">
                        ID: <code className="text-white font-bold bg-black/30 px-1 rounded">{paymentTrxId || "stripe_completed"}</code>
                      </span>
                      <span className="block text-[9px] text-gray-400">
                        Status: <code className="text-emerald-400 font-bold font-mono">FULLY_SETTLED_CREDIT</code>. Fully adjusted in final dining bill.
                      </span>
                    </motion.div>
                  )}

                  {/* Manual trigger / retry option */}
                  <div className="pt-2 flex justify-center items-center gap-3 border-t border-white/5 font-mono text-[9px]">
                    <button
                      onClick={() => {
                        const foodText = bookingDetails?.foodItem && bookingDetails.foodItem !== "None (Reserve table only)" ? `\nFood Item: ${bookingDetails.foodItem}` : "";
                        const msgText = `Hi SGF, I have reserved a table\nName: ${bookingDetails?.name || ""}\nPhone no: +91${bookingDetails?.phone || ""}\nNo of people: ${bookingDetails?.guests || ""}\nDate: ${bookingDetails?.date || ""}\nTime: ${bookingDetails?.time || ""}${foodText}`;
                        if (selectedChannel === "whatsapp") {
                          window.open(`https://wa.me/918511438482?text=${encodeURIComponent(msgText)}`, "_blank");
                        } else {
                          window.open(`sms:+918511438482?body=${encodeURIComponent(msgText)}`, "_blank");
                        }
                      }}
                      className="font-bold uppercase tracking-wider text-[#FF4500] hover:underline focus:outline-none"
                    >
                      Resend / Open manually ↺
                    </button>
                    <span className="text-gray-600 font-sans">•</span>
                    <button
                      onClick={() => setSelectedChannel(null)}
                      className="font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:underline focus:outline-none"
                    >
                      Change Method
                    </button>
                  </div>
                </div>
              )}

              {/* Success Action CTA */}
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setPaymentSuccess(false);
                }}
                className="w-full py-3 bg-white text-black font-extrabold uppercase rounded-xl hover:bg-[#FF4500] hover:text-white transition-all text-[11px] tracking-widest cursor-pointer font-display relative z-20"
                id="close-success-modal"
              >
                Return to Website
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stripe Seating Guarantee Payment Terminal dialog modal */}
      <AnimatePresence>
        {paymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            id="modal-stripe-billing-screen"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="max-w-md w-full p-8 rounded-2xl glass-morphism shadow-2xl border border-white/10 space-y-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header block */}
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 flex items-center justify-center text-[#FF4500] mb-2">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                  {paymentLoading ? "Connecting Gateway..." : "SGF Seating Lock"}
                </h3>
                <p className="text-[11px] text-gray-400 leading-normal">
                  SGF Narela Reservation Security Prepay: <strong className="text-[#FF4500]">₹500.00 INR</strong>
                </p>
              </div>

              {paymentLoading ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 border-2 border-[#FF4500] border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-gray-400 animate-pulse font-mono font-bold">CONTACTING SECURE STRIPE GATEWAY...</p>
                </div>
              ) : isSimulatedPayment ? (
                /* Beautiful interactive billing credit card terminal form */
                <div className="space-y-4 text-left">
                  <div className="p-3.5 bg-orange-950/25 border border-[#FF4500]/20 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#FF4500] tracking-wider block flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5 fill-current" />
                      Stripe Sandbox Active
                    </span>
                    <p className="text-[10px] text-gray-300 leading-normal font-light">
                      We initiated a sandbox billing interface because your Stripe keys are pending setup. Enter dummy data to test the workflow loop.
                    </p>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase font-bold text-white/50 tracking-wider">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={ccName}
                        onChange={(e) => setCCName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF4500] font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase font-bold text-white/50 tracking-wider">Credit Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4242 4242 4242 4242 (Stripe Test)"
                        value={ccNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                        onChange={(e) => setCCNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FF4500]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase font-bold text-white/50 tracking-wider">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="12/28"
                          value={ccExpiry}
                          onChange={(e) => setCCExpiry(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FF4500]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase font-bold text-white/50 tracking-wider">CVC Code</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="***"
                          value={ccCvv}
                          onChange={(e) => setCCCvv(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FF4500]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment checkout simulation triggers */}
                  <div className="pt-4 space-y-2">
                    <button
                      onClick={() => {
                        setPaymentLoading(true);
                        setTimeout(() => {
                          setPaymentLoading(false);
                          setPaymentModalOpen(false);
                          setPaymentSuccess(true);
                          setSubmitSuccess(true);
                        }, 1800);
                      }}
                      className="w-full py-3.5 rounded-xl bg-white text-black font-black uppercase text-xs tracking-widest cursor-pointer hover:bg-[#FF4500] hover:text-white hover:shadow-[0_0_15px_rgba(255,69,0,0.35)] transition-all"
                    >
                      Process Offline Sandbox Payment
                    </button>
                    <button
                      onClick={() => {
                        setPaymentModalOpen(false);
                        setSubmitSuccess(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 text-[10px] uppercase font-bold tracking-wider"
                    >
                      Bypass to Standard Free Seating
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <p className="text-xs text-gray-300">Stripe initialized. Bypassing simulation to redirect securely...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Quick Chat Floating Orb */}
      <a 
        href="https://wa.me/918511438482" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2 overflow-hidden max-w-[56px] hover:max-w-xs"
        title="Chat with SGF Desk Narela Admin"
        id="whatsapp-floater-fab"
      >
        <Smartphone className="w-6 h-6 shrink-0 fill-current text-white animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-2">
          Chat With Admin
        </span>
      </a>

    </div>
  );
}

// Inline Utensils Icon Fallback if loader hasn't registered
function UTestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v3c0 2.5 1.5 4.5 4 4.5Z" />
      <path d="M21 15v7" />
    </svg>
  );
}
