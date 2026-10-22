import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { refreshImages } from "@/lib/refresh-images";
import { Footer } from "@/components/Footer";
import { Item, Reveal } from "@/components/ui-brand";

export function FinalCta() {
  return (
    <section className="closing-section text-paper">
      <img
        src={refreshImages.ship_final.src}
        srcSet={refreshImages.ship_final.srcSet}
        sizes="100vw"
        alt=""
        width={refreshImages.ship_final.width}
        height={refreshImages.ship_final.height}
        loading="lazy"
        className="closing-image"
      />
      <div className="closing-shade" />
      <Reveal className="container-x closing-cta relative flex flex-col items-center text-center">
        <Item>
          <h2 className="h2-display max-w-3xl">Let’s Build the Future Together</h2>
        </Item>
        <Item>
          <p className="mt-6 max-w-2xl text-lg text-paper/85 md:text-xl">
            The future will not be shaped by resources alone. It will be shaped by the ability of
            people and institutions to learn, adapt, innovate, and create value in a changing world.
          </p>
        </Item>
        <Item className="mt-10">
          <Link to="/contact" className="btn-base btn-gold !px-10 !py-5 text-lg">
            Start a Conversation
            <ArrowRight className="btn-arrow h-5 w-5" aria-hidden />
          </Link>
        </Item>
      </Reveal>
      <Footer embedded />
    </section>
  );
}
