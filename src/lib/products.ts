import frame1 from "@/assets/product-frame-1.jpg";
import frame2 from "@/assets/product-frame-2.jpg";
import frame3 from "@/assets/product-frame-3.jpg";
import frame4 from "@/assets/product-frame-4.jpg";
import frame5 from "@/assets/product-frame-5.jpg";
import polaroid from "@/assets/product-polaroid.jpg";
import gift1 from "@/assets/product-gift.jpg";
import gift2 from "@/assets/product-gift-2.jpg";

export interface Product {
  id: string;
  name: string;
  image: string;
  category: "frames" | "gifts" | "polaroids";
  categoryLabel: string;
}

export const products: Product[] = [
  { id: "1", name: "Classic Wooden Frame", image: frame1, category: "frames", categoryLabel: "Photo Frames" },
  { id: "2", name: "Gold Accent Frame", image: frame2, category: "frames", categoryLabel: "Photo Frames" },
  { id: "3", name: "Collage Wall Frame", image: frame3, category: "frames", categoryLabel: "Photo Frames" },
  { id: "4", name: "Heart Photo Frame", image: frame4, category: "frames", categoryLabel: "Photo Frames" },
  { id: "5", name: "LED Acrylic Frame", image: frame5, category: "frames", categoryLabel: "Photo Frames" },
  { id: "6", name: "Polaroid Print Set", image: polaroid, category: "polaroids", categoryLabel: "Polaroids" },
  { id: "7", name: "Premium Gift Box", image: gift1, category: "gifts", categoryLabel: "Gifts" },
  { id: "8", name: "Photo Album Gift Set", image: gift2, category: "gifts", categoryLabel: "Gifts" },
];

export const categories = [
  { key: "frames" as const, label: "Photo Frames", description: "Custom frames for every memory" },
  { key: "gifts" as const, label: "Gifts", description: "Personalized gift sets" },
  { key: "polaroids" as const, label: "Polaroids", description: "Retro-style photo prints" },
];
