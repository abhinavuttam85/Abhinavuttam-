import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquare, Quote, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, User } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  created_at: string;
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Carousel Navigation state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Form Submission feedback states
  const [formName, setFormName] = useState("");
  const [formReview, setFormReview] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState("");

  // Fetch reviews from our Node server (which proxies to Supabase with in-memory fallback)
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const payload = await res.json();
        if (payload.success && payload.data) {
          setReviews(payload.data);
        }
      }
    } catch (err) {
      console.warn("[Fetch Testimonials Error]:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Set carousel cycle loop
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // changes slides every 6 seconds
    return () => clearInterval(interval);
  }, [reviews]);

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  // Submit new review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubError("");
    setSubSuccess(false);

    if (!formName.trim()) {
      setSubError("Please write your name.");
      setSubmitting(false);
      return;
    }

    if (formReview.trim().length < 20) {
      setSubError("Feedback must be at least 20 characters long to ensure quality feedback. (Currently " + formReview.trim().length + " characters)");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          text: formReview,
          rating: formRating,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubSuccess(true);
        setFormName("");
        setFormReview("");
        setFormRating(5);
        // Instantly reload and append
        fetchTestimonials();
        // Point carousel to index 0 (newest item)
        setCurrentIndex(0);
      } else {
        setSubError(data.error || "Failed to submit testimonial.");
      }
    } catch (err) {
      console.error(err);
      setSubError("Network error. Could not sync with database.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guest-feedback-testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#181818] border-t border-b border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Testimonials Display - Carousel Section */}
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-between h-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#FF4500]/10 to-[#D2143A]/10 border border-[#FF4500]/20 rounded-full mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#FF4500]" />
              <span className="text-[10px] text-gray-300 uppercase tracking-widest font-black font-mono">
                Actual Customer Experiences
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase leading-none">
              WORDS OF APPRECIATION
            </h2>
            <p className="text-xs text-white/40 uppercase tracking-wider font-bold mt-2">
              SGF Narela verified food reviews from our customers
            </p>
          </div>

          {/* Carousel Frame */}
          <div className="relative min-h-[220px] bg-white/[0.02] border border-white/5 rounded-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden group">
            {/* Quote watermark */}
            <Quote className="absolute right-6 top-6 w-24 h-24 text-white/[0.01] pointer-events-none transform rotate-180" />

            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-2 py-10">
                <div className="w-10 h-10 border-2 border-[#FF4500] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-gray-400">Fetching reviews...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No gourmet reviews submitted yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                {/* Stars Indicator */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < reviews[currentIndex].rating
                          ? "text-[#FF4500] fill-current"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Quote Text */}
                <blockquote className="text-base sm:text-lg text-white/90 leading-relaxed font-light italic">
                  &ldquo;{reviews[currentIndex].text}&rdquo;
                </blockquote>

                {/* Author Segment */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF4500] to-[#D2143A] flex items-center justify-center text-white font-black text-xs uppercase font-mono shadow-md">
                    {reviews[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-xs text-white font-bold block uppercase tracking-wider">
                      {reviews[currentIndex].name}
                    </cite>
                    <span className="text-[10px] text-white/40 block">
                      Verified Diner • {new Date(reviews[currentIndex].created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Slider Dots indicators */}
            {reviews.length > 1 && (
              <div className="flex items-center gap-1.5 mt-8 z-20">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-6 bg-[#FF4500]" : "w-1.5 bg-white/10 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Carousel Left/Right clickers */}
          {reviews.length > 1 && (
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF4500]/30 hover:bg-white/[0.05] text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                id="testimonial-prev-slide-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#FF4500]/30 hover:bg-white/[0.05] text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                id="testimonial-next-slide-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Submit Review Terminal */}
        <div id="add-review-form-container" className="lg:col-span-5 bg-white/[0.01] border border-white/5 rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-display font-black text-white uppercase tracking-wide">
              SHARE YOUR SGF EXPERIENCE
            </h3>
            <p className="text-[11px] text-gray-500 max-w-xs leading-normal">
              Had our soya malai chaap or crisped tandoori rotis? Leave a transparent review below!
            </p>
          </div>

          {subSuccess && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-start gap-2.5 text-emerald-200 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-emerald-300 mb-0.5">Testimonial Published!</span>
                Thank you so much! Your review has been saved securely to our Supabase database and instantly synced.
              </div>
            </div>
          )}

          {subError && (
            <div className="p-4 bg-red-950/45 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p>{subError}</p>
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            {/* Customer Name */}
            <div className="space-y-1">
              <label htmlFor="review-author" className="block text-[10px] uppercase font-bold tracking-widest text-[#F5F5F5] opacity-50">
                Your Full Name <span className="text-[#FF4500]">*</span>
              </label>
              <input
                id="review-author"
                type="text"
                required
                placeholder="e.g. Rahul Chawla"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-600"
              />
            </div>

            {/* Optional Star Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-bold tracking-widest text-[#F5F5F5] opacity-50">
                Star Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-1 text-gray-500 transition-colors duration-200 group focus:outline-none"
                    id={`rating-star-btn-${star}`}
                  >
                    <Star
                      className={`w-6 h-6 transform active:scale-95 transition-all ${
                        star <= formRating
                          ? "text-[#FF4500] fill-current drop-shadow-[0_0_8px_rgba(255,69,0,0.5)]"
                          : "text-white/20 hover:text-[#FF4500]/50"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-gray-400 font-bold ml-2">
                  ({formRating} out of 5 stars)
                </span>
              </div>
            </div>

            {/* Review feedback text */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="review-text-area" className="block text-[10px] uppercase font-bold tracking-widest text-[#F5F5F5] opacity-50">
                  Detailed Feedback <span className="text-[#FF4500]">*</span>
                </label>
                <span className={`text-[10px] font-mono font-bold transition-all duration-300 ${formReview.trim().length >= 20 ? 'text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded' : 'text-gray-500'}`}>
                  {formReview.length} / 20 min
                </span>
              </div>
              <textarea
                id="review-text-area"
                required
                rows={3}
                placeholder="Tell us what you ordered and how the spice level, seating, or service felt to you..."
                value={formReview}
                onChange={(e) => setFormReview(e.target.value)}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-600 no-scrollbar block"
              />
              {formReview.length > 0 && formReview.trim().length < 20 && (
                <p className="text-[10px] font-mono text-red-400/90 tracking-wide mt-1 animate-pulse">
                  * Needs {20 - formReview.trim().length} more characters to submit.
                </p>
              )}
            </div>

            {/* Submit review action */}
            <button
              id="submit-customer-testimonial"
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-white text-black font-black hover:scale-[1.01] tracking-widest transition-all uppercase text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:bg-[#FF4500] hover:text-white hover:shadow-[0_0_20px_rgba(255,69,0,0.35)]"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Configuring Seeding...</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 fill-current" />
                  <span>Submit Live Opinion</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
