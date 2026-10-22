import hero_2_640 from "@/assets/hero-2-640.webp";
import hero_2_1280 from "@/assets/hero-2-1280.webp";
import hero_2_1920 from "@/assets/hero-2-1920.webp";
import eplus_1_640 from "@/assets/eplus-1-640.webp";
import eplus_1_1280 from "@/assets/eplus-1-1280.webp";
import eplus_1_1920 from "@/assets/eplus-1-1920.webp";
import eplus_2_640 from "@/assets/eplus-2-640.webp";
import eplus_2_1280 from "@/assets/eplus-2-1280.webp";
import eplus_2_1920 from "@/assets/eplus-2-1920.webp";
import eplus_3_640 from "@/assets/eplus-3-640.webp";
import eplus_3_1280 from "@/assets/eplus-3-1280.webp";
import eplus_3_1920 from "@/assets/eplus-3-1920.webp";
import eplus_4_640 from "@/assets/eplus-4-640.webp";
import eplus_4_1280 from "@/assets/eplus-4-1280.webp";
import eplus_4_1920 from "@/assets/eplus-4-1920.webp";
import eplus_5_640 from "@/assets/eplus-5-640.webp";
import eplus_5_1280 from "@/assets/eplus-5-1280.webp";
import eplus_5_1920 from "@/assets/eplus-5-1920.webp";
import hero_blocks_640 from "@/assets/hero-blocks-640.webp";
import hero_blocks_1280 from "@/assets/hero-blocks-1280.webp";
import hero_blocks_1920 from "@/assets/hero-blocks-1920.webp";
import portrait_640 from "@/assets/portrait-640.webp.asset.json";
import portrait_928 from "@/assets/portrait-928.webp.asset.json";
export const images = {
hero_2: {src: hero_2_1920, width:1920, height:1088, srcSet: `${hero_2_640} 640w, ${hero_2_1280} 1280w, ${hero_2_1920} 1920w`},
eplus_1: {src: eplus_1_1920, width:1920, height:1088, srcSet: `${eplus_1_640} 640w, ${eplus_1_1280} 1280w, ${eplus_1_1920} 1920w`},
eplus_2: {src: eplus_2_1920, width:1920, height:1088, srcSet: `${eplus_2_640} 640w, ${eplus_2_1280} 1280w, ${eplus_2_1920} 1920w`},
eplus_3: {src: eplus_3_1920, width:1920, height:1088, srcSet: `${eplus_3_640} 640w, ${eplus_3_1280} 1280w, ${eplus_3_1920} 1920w`},
eplus_4: {src: eplus_4_1920, width:1920, height:1088, srcSet: `${eplus_4_640} 640w, ${eplus_4_1280} 1280w, ${eplus_4_1920} 1920w`},
eplus_5: {src: eplus_5_1920, width:1920, height:1088, srcSet: `${eplus_5_640} 640w, ${eplus_5_1280} 1280w, ${eplus_5_1920} 1920w`},
hero_blocks: {src: hero_blocks_1920, width:1920, height:1088, srcSet: `${hero_blocks_640} 640w, ${hero_blocks_1280} 1280w, ${hero_blocks_1920} 1920w`},
portrait: {src: portrait_928.url, width:928, height:691, srcSet: `${portrait_640.url} 640w, ${portrait_928.url} 928w`}
};
export type ImageAsset = {src:string;srcSet:string;width:number;height:number};
