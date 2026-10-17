import vision_v2_640 from "@/assets/vision_v2-640.webp.asset.json";
import vision_v2_1280 from "@/assets/vision_v2-1280.webp.asset.json";
import vision_v2_1920 from "@/assets/vision_v2-1920.webp.asset.json";
import impact_640 from "@/assets/impact-640.webp.asset.json";
import impact_1280 from "@/assets/impact-1280.webp.asset.json";
import impact_1920 from "@/assets/impact-1920.webp.asset.json";
import ship_final_640 from "@/assets/ship_final-640.webp.asset.json";
import ship_final_1280 from "@/assets/ship_final-1280.webp.asset.json";
import ship_final_1920 from "@/assets/ship_final-1920.webp.asset.json";
export const refreshImages = {
vision_v2: {src: vision_v2_1920.url, width: 1920, height: 1080, srcSet: `${vision_v2_640.url} 640w, ${vision_v2_1280.url} 1280w, ${vision_v2_1920.url} 1920w`},
impact: {src: impact_1920.url, width: 1920, height: 1080, srcSet: `${impact_640.url} 640w, ${impact_1280.url} 1280w, ${impact_1920.url} 1920w`},
ship_final: {src: ship_final_1920.url, width: 1920, height: 1080, srcSet: `${ship_final_640.url} 640w, ${ship_final_1280.url} 1280w, ${ship_final_1920.url} 1920w`},
};
