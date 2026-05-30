import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Eye, ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "Dishes" | "Ambiance" | "Interiors";
  url: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Signature Soya Achari Chaap",
    category: "Dishes",
    url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
    description: "Tender soya chunks marinated in pickle spices and cooked over hot charcoal."
  },
  {
    id: "gal-2",
    title: "Stuffed Paneer Tikka Amritsari",
    category: "Dishes",
    url: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800",
    description: "Cottage cheese cubes loaded with green mint chutney, skewed with fresh bell pepper."
  },
  {
    id: "gal-3",
    title: "Crispy Garlic Naan & Dal Makhani",
    category: "Dishes",
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
    description: "Creamy black lentils simmered overnight, served with crisp, butter-laden hand-slapped naans."
  },
  {
    id: "gal-4",
    title: "Glowing Lantern Seating Area",
    category: "Ambiance",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    description: "Private booth seating illuminated by ambient glowing lamps, perfect for families."
  },
  {
    id: "gal-5",
    title: "Dimly Lit Romantic Dinette",
    category: "Ambiance",
    url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
    description: "A cozy evening layout designed to keep the focus purely on your companion and the aroma."
  },
  {
    id: "gal-6",
    title: "Modern Premium Dining Hall",
    category: "Interiors",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
    description: "Upscale rustic wooden furniture meets futuristic accent lighting setups."
  },
  {
    id: "gal-7",
    title: "The Fire-Hearth Clay Tandoor Desk",
    category: "Interiors",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    description: "Step witness to active culinary flame production by our highly certified head tandooris."
  }
];

export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Dishes" | "Ambiance" | "Interiors">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedFilter === "All" || item.category === selectedFilter
  );

  const openLightbox = (itemIndex: number) => {
    // Find index of the item inside filtered list
    setLightboxIndex(itemIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery-exploration" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121212] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#FF4500]/10 to-[#D2143A]/10 border border-[#FF4500]/20 rounded-full">
            <ImageIcon className="w-3.5 h-3.5 text-[#FF4500]" />
            <span className="text-[10px] text-gray-300 uppercase tracking-widest font-black font-mono">
              Sensory Visual Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase">
            SGF NARELA PHOTO GALLERY
          </h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
            Feast with your eyes first. Explore our masterfully-decorated dining layout, actual brick-tandoors, and sizzling pure vegetarian recipes.
          </p>
        </div>

        {/* Filter Sliders */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-6 no-scrollbar">
          {(["All", "Dishes", "Ambiance", "Interiors"] as const).map((filter) => (
            <button
              key={filter}
              id={`filter-gallery-${filter.toLowerCase()}`}
              onClick={() => {
                setSelectedFilter(filter);
                setLightboxIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                selectedFilter === filter
                  ? "bg-gradient-to-r from-[#FF4500] to-[#D2143A] border-transparent text-white shadow-[0_0_20px_rgba(255,69,0,0.25)]"
                  : "bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(index)}
                className="group relative h-72 rounded-2xl overflow-hidden bg-[#181818] border border-white/5 shadow-lg hover:shadow-[0_0_25px_rgba(255,69,0,0.15)] cursor-pointer transition-all duration-500"
              >
                {/* Photo Aspect */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-95 contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />

                {/* Fire Gradient Hover Overlay Sheet */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Bottom detail descriptors */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] font-black text-[#FF4500] uppercase tracking-widest font-mono">
                    {item.category}
                  </span>
                  <h4 className="text-white font-display font-bold text-sm tracking-wide uppercase transition-colors group-hover:text-amber-400">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Interactive Zoom/Eye indicator */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Eye className="w-4 h-4 text-[#FF4500]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal overlay layer */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              id="gallery-lightbox-overlay"
              onClick={closeLightbox}
            >
              {/* Close Button top-right */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 z-50"
                id="close-lightbox-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Image click trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 sm:left-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 z-40"
                id="prev-lightbox-btn"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Image click trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 sm:right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 z-40"
                id="next-lightbox-btn"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Content Box (Prevent click propagate to wrapper outer close) */}
              <div
                className="w-full max-w-4xl max-h-[85vh] flex flex-col items-center gap-4 outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Lightbox Primary Image Frame */}
                <motion.div
                  key={filteredItems[lightboxIndex].id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="relative rounded-2xl overflow-hidden max-h-[65vh] w-full border border-white/5 bg-[#121212] flex items-center justify-center select-none"
                >
                  <img
                    src={filteredItems[lightboxIndex].url}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-h-[65vh] max-w-full object-contain filter saturate-[1.1] brightness-[0.95]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle lower gradient strip */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4" />
                </motion.div>

                {/* Meta details footer description */}
                <div className="text-center max-w-2xl px-4 space-y-2 select-none">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-black tracking-widest text-[#FF4500] uppercase px-3 py-0.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/20 font-mono">
                      {filteredItems[lightboxIndex].category}
                    </span>
                    <span className="text-[11px] text-white/40 font-mono">
                      {lightboxIndex + 1} / {filteredItems.length}
                    </span>
                  </div>
                  <h3 className="text-white font-display font-extrabold text-xl sm:text-2xl tracking-wide uppercase">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
