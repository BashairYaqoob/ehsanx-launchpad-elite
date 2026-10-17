import type { ComponentProps } from "react";
import type { ImageAsset } from "@/lib/image-assets";

export function ResponsiveImage({ asset, sizes = "100vw", ...props }: { asset: ImageAsset } & ComponentProps<"img">) {
  return <img {...props} src={asset.src} srcSet={asset.srcSet} sizes={sizes} width={asset.width} height={asset.height} />;
}