type Props = { bw: string; colour: string; alt: string; width: number; height: number; className?: string };

/**
 * Black-and-white by default on hover-capable devices; colour fades in on hover/focus.
 * Touch devices (hover: none) show colour by default. Only the colour image is announced.
 */
export function ImageHoverReveal({ bw, colour, alt, width, height, className = "" }: Props) {
  return (
    <figure className={`group relative overflow-hidden ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={bw} alt="" aria-hidden="true" width={width} height={height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={colour}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
      />
    </figure>
  );
}
