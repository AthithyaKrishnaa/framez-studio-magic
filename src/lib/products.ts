import frame1 from "@/assets/product-frame-1.jpg";
import frame2 from "@/assets/product-frame-2.jpg";
import frame3 from "@/assets/product-frame-3.jpg";
import frame4 from "@/assets/product-frame-4.jpg";
import frame5 from "@/assets/product-frame-5.jpg";
import polaroid from "@/assets/product-polaroid.jpg";
import gift1 from "@/assets/product-gift.jpg";
import gift2 from "@/assets/product-gift-2.jpg";

export type CategoryKey =
  | "frames"
  | "polaroids"
  | "memory-books"
  | "mugs"
  | "bouquets"
  | "car-gifts"
  | "keychains"
  | "calendars"
  | "surprises"
  | "caricature"
  | "event-decor";

export interface Product {
  id: string;
  name: string;
  image: string;
  category: CategoryKey;
  categoryLabel: string;
  badge?: string;
}

export interface Category {
  key: CategoryKey;
  label: string;
  description: string;
  emoji: string;
  gradient: string;
}

export const categories: Category[] = [
  { key: "frames",       label: "Photo Frames",       description: "Custom frames for every memory",       emoji: "🖼️",  gradient: "from-rose-400/20 to-pink-600/20"    },
  { key: "polaroids",    label: "Polaroid Memories",  description: "Retro-style prints & LED walls",       emoji: "📷",  gradient: "from-purple-400/20 to-indigo-600/20" },
  { key: "memory-books", label: "Memory Books",        description: "Magazines & story books",             emoji: "📖",  gradient: "from-amber-400/20 to-orange-600/20" },
  { key: "mugs",         label: "Magic Mugs",          description: "Personalised photo mugs",              emoji: "☕",  gradient: "from-sky-400/20 to-blue-600/20"     },
  { key: "bouquets",     label: "Bouquets",            description: "Handcrafted photo bouquets",           emoji: "💐",  gradient: "from-emerald-400/20 to-teal-600/20" },
  { key: "car-gifts",    label: "Car Gifts",           description: "Custom Hot Wheels & diecast",         emoji: "🚗",  gradient: "from-red-400/20 to-rose-600/20"     },
  { key: "keychains",    label: "Keychains",           description: "Aesthetic & character keychains",     emoji: "🔑",  gradient: "from-yellow-400/20 to-amber-600/20" },
  { key: "calendars",    label: "Calendars",           description: "Wall & frame calendars",               emoji: "📅",  gradient: "from-cyan-400/20 to-sky-600/20"     },
  { key: "surprises",    label: "Surprise Packages",   description: "Curated gift surprises",              emoji: "🎁",  gradient: "from-fuchsia-400/20 to-purple-600/20"},
  { key: "caricature",   label: "Caricature Gifts",    description: "Custom caricature stands",            emoji: "🎨",  gradient: "from-lime-400/20 to-green-600/20"   },
  { key: "event-decor",  label: "Event Decor",         description: "Birthday & party setups",             emoji: "🎉",  gradient: "from-orange-400/20 to-red-600/20"   },
];

// Placeholder image rotation
const imgs = [frame1, frame2, frame3, frame4, frame5, polaroid, gift1, gift2];
const img = (n: number) => imgs[n % imgs.length];

export const products: Product[] = [
  // PHOTO FRAMES
  { id: "f1",  name: "12×8 Frame",           image: img(0), category: "frames",       categoryLabel: "Photo Frames",      badge: "Popular"  },
  { id: "f2",  name: "12×10 Frame",          image: img(1), category: "frames",       categoryLabel: "Photo Frames"                          },
  { id: "f3",  name: "12×15 Frame",          image: img(2), category: "frames",       categoryLabel: "Photo Frames"                          },
  { id: "f4",  name: "12×18 Frame",          image: img(3), category: "frames",       categoryLabel: "Photo Frames"                          },
  { id: "f5",  name: "20×16 Frame",          image: img(4), category: "frames",       categoryLabel: "Photo Frames"                          },
  { id: "f6",  name: "24×16 Frame",          image: img(0), category: "frames",       categoryLabel: "Photo Frames"                          },
  { id: "f7",  name: "24×20 Frame",          image: img(1), category: "frames",       categoryLabel: "Photo Frames"                          },
  { id: "f8",  name: "36×24 Frame",          image: img(2), category: "frames",       categoryLabel: "Photo Frames",      badge: "Best Seller"},
  { id: "f9",  name: "Heart Theme Frame",    image: img(3), category: "frames",       categoryLabel: "Photo Frames",      badge: "Trending"  },
  { id: "f10", name: "Custom Photo Frame",   image: img(4), category: "frames",       categoryLabel: "Photo Frames",      badge: "Customize" },

  // POLAROID MEMORIES
  { id: "p1",  name: "Mini Polaroid",        image: img(5), category: "polaroids",    categoryLabel: "Polaroid Memories", badge: "Popular"   },
  { id: "p2",  name: "Polaroid Box",         image: img(6), category: "polaroids",    categoryLabel: "Polaroid Memories"                     },
  { id: "p3",  name: "Polaroid Album",       image: img(7), category: "polaroids",    categoryLabel: "Polaroid Memories"                     },
  { id: "p4",  name: "Fujifilm Style",       image: img(5), category: "polaroids",    categoryLabel: "Polaroid Memories"                     },
  { id: "p5",  name: "Polaroid Magnet",      image: img(6), category: "polaroids",    categoryLabel: "Polaroid Memories"                     },
  { id: "p6",  name: "Spotify Code Polaroid",image: img(7), category: "polaroids",    categoryLabel: "Polaroid Memories", badge: "Trending"  },
  { id: "p7",  name: "Custom Message Polaroid",image:img(5),category: "polaroids",    categoryLabel: "Polaroid Memories"                     },
  { id: "p8",  name: "Photo Strip",          image: img(6), category: "polaroids",    categoryLabel: "Polaroid Memories"                     },
  { id: "p9",  name: "LED Memory Wall",      image: img(7), category: "polaroids",    categoryLabel: "Polaroid Memories", badge: "Premium"   },

  // MEMORY BOOKS
  { id: "m1",  name: "A4 Magazine",          image: img(0), category: "memory-books", categoryLabel: "Memory Books"                          },
  { id: "m2",  name: "A5 Magazine",          image: img(1), category: "memory-books", categoryLabel: "Memory Books"                          },
  { id: "m3",  name: "Travel Magazine",      image: img(2), category: "memory-books", categoryLabel: "Memory Books"                          },
  { id: "m4",  name: "Birthday Magazine",    image: img(3), category: "memory-books", categoryLabel: "Memory Books",      badge: "Popular"   },
  { id: "m5",  name: "Memory Book",          image: img(4), category: "memory-books", categoryLabel: "Memory Books",      badge: "Best Seller"},
  { id: "m6",  name: "Friendship Magazine",  image: img(0), category: "memory-books", categoryLabel: "Memory Books"                          },
  { id: "m7",  name: "Story Magazine",       image: img(1), category: "memory-books", categoryLabel: "Memory Books"                          },
  { id: "m8",  name: "Anniversary Magazine", image: img(2), category: "memory-books", categoryLabel: "Memory Books",      badge: "Trending"  },

  // MUGS
  { id: "mu1", name: "Photo Mug (White)",    image: img(6), category: "mugs",         categoryLabel: "Magic Mugs",        badge: "Popular"   },
  { id: "mu2", name: "Magic Mug (Black)",    image: img(7), category: "mugs",         categoryLabel: "Magic Mugs",        badge: "Best Seller"},

  // BOUQUETS
  { id: "b1",  name: "Photo Bouquet",        image: img(3), category: "bouquets",     categoryLabel: "Bouquets",          badge: "Popular"   },
  { id: "b2",  name: "Chocolate Bouquet",    image: img(4), category: "bouquets",     categoryLabel: "Bouquets"                              },
  { id: "b3",  name: "Hot Wheels Bouquet",   image: img(5), category: "bouquets",     categoryLabel: "Bouquets"                              },
  { id: "b4",  name: "Custom Hot Wheels Bouquet",image:img(6),category:"bouquets",    categoryLabel: "Bouquets",          badge: "Customize" },
  { id: "b5",  name: "Handmade Photo Bouquet",image:img(7), category: "bouquets",     categoryLabel: "Bouquets",          badge: "Trending"  },

  // CAR GIFTS
  { id: "c1",  name: "Custom Hot Wheels",    image: img(5), category: "car-gifts",    categoryLabel: "Car Gifts",         badge: "Trending"  },
  { id: "c2",  name: "Hot Wheels Cars",      image: img(6), category: "car-gifts",    categoryLabel: "Car Gifts"                             },

  // KEYCHAINS
  { id: "k1",  name: "Car Keychain",         image: img(0), category: "keychains",    categoryLabel: "Keychains"                             },
  { id: "k2",  name: "Aesthetic Keychain",   image: img(1), category: "keychains",    categoryLabel: "Keychains",         badge: "Popular"   },
  { id: "k3",  name: "Camera Keychain",      image: img(2), category: "keychains",    categoryLabel: "Keychains"                             },
  { id: "k4",  name: "Shinchan Keychain",    image: img(3), category: "keychains",    categoryLabel: "Keychains"                             },
  { id: "k5",  name: "Doraemon Keychain",    image: img(4), category: "keychains",    categoryLabel: "Keychains"                             },
  { id: "k6",  name: "Mood Keychain",        image: img(5), category: "keychains",    categoryLabel: "Keychains",         badge: "Trending"  },

  // CALENDARS
  { id: "cal1",name: "Wall Calendar",        image: img(2), category: "calendars",    categoryLabel: "Calendars",         badge: "Popular"   },
  { id: "cal2",name: "Frame Calendar",       image: img(3), category: "calendars",    categoryLabel: "Calendars"                             },

  // SURPRISES
  { id: "s1",  name: "20 Gifts for 20 Years",image: img(4), category: "surprises",    categoryLabel: "Surprise Packages", badge: "Premium"   },
  { id: "s2",  name: "Car Surprise",         image: img(5), category: "surprises",    categoryLabel: "Surprise Packages"                     },
  { id: "s3",  name: "Beach Surprise",       image: img(6), category: "surprises",    categoryLabel: "Surprise Packages"                     },

  // CARICATURE
  { id: "car1",name: "Custom Caricature Stand",image:img(7),category: "caricature",   categoryLabel: "Caricature Gifts",  badge: "Customize" },

  // EVENT DECOR
  { id: "e1",  name: "Birthday Decoration",  image: img(0), category: "event-decor",  categoryLabel: "Event Decor",       badge: "Popular"   },
  { id: "e2",  name: "Room Setup",           image: img(1), category: "event-decor",  categoryLabel: "Event Decor"                           },
  { id: "e3",  name: "Party Decoration",     image: img(2), category: "event-decor",  categoryLabel: "Event Decor",       badge: "Trending"  },
];

/** Featured / best-sellers shown on homepage */
export const featuredProducts = [
  "f9",   // Heart Theme Frame
  "p6",   // Spotify Code Polaroid
  "p9",   // LED Memory Wall
  "m5",   // Memory Book
  "b1",   // Photo Bouquet
  "mu2",  // Magic Mug (Black)
  "s1",   // 20 Gifts for 20 Years
  "car1", // Custom Caricature Stand
].map((id) => products.find((p) => p.id === id)!).filter(Boolean);
