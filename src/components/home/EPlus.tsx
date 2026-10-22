import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BrandButton, GoldRule, Item, Reveal } from "@/components/ui-brand";
import { images } from "@/lib/image-assets";

const STAGES = [
  {
    name: "Leadership",
    description: "Inspiring self and others to act with courage, humility, and integrity",
    image: images.eplus_1,
    alt: "Leadership at EhsanX",
  },
  {
    name: "Innovation",
    description: "Turning ideas into solutions that create impact and advantage",
    image: images.eplus_2,
    alt: "Innovation at EhsanX",
  },
  {
    name: "Value Creation",
    description: "Creating economic, social, and environmental value for all stakeholders",
    image: images.eplus_3,
    alt: "Value Creation at EhsanX",
  },
  {
    name: "Institutional Transformation",
    description: "Strengthening institutions and systems for sustainable and scalable impact",
    image: images.eplus_4,
    alt: "Institutional Transformation at EhsanX",
  },
  {
    name: "Human Flourishing",
    description:
      "Enabling a better world and a meaningful legacy for this life, this world, and the Hereafter",
    image: images.eplus_5,
    alt: "Human Flourishing at EhsanX",
  },
];

export function EPlus() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(false);
  const rowsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!wide) return;
    const rows = Array.from(rowsRef.current?.querySelectorAll("li") ?? []);
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = rows.indexOf(entry.target as HTMLLIElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [wide]);

  return (
    <section className="eplus section-y" aria-labelledby="eplus-title">
      <div className="container-x">
        <Reveal className="eplus-intro">
          <Item>
            <GoldRule />
            <p className="eyebrow mt-6">Our Philosophy</p>
            <h2 id="eplus-title" className="h2-display mt-4 text-navy">
              The E-Plus Model
            </h2>
          </Item>
          <Item>
            <p className="eplus-paragraph">
              Every engagement is built on EhsanX’s own philosophy: the E-Plus Model. Explore how
              purpose, character, and entrepreneurial capability come together to create value that
              outlasts any single project.
            </p>
          </Item>
          <Item>
            <BrandButton to="/philosophy" variant="outline-navy">
              Explore the Full Model
            </BrandButton>
          </Item>
        </Reveal>

        {!wide && (
          <div className="eplus-mobile-media">
            <img
              src={images.hero_2.src}
              srcSet={images.hero_2.srcSet}
              sizes="100vw"
              alt="Senior leaders in a strategy discussion"
              width={1920}
              height={1088}
              loading="lazy"
            />
          </div>
        )}

        <div className="eplus-grid">
          {wide && (
            <div className="eplus-frame-wrap">
              <div className="eplus-frame">
                {STAGES.map((stage, i) => (
                  <img
                    key={stage.name}
                    src={stage.image.src}
                    srcSet={stage.image.srcSet}
                    sizes="36vw"
                    alt={stage.alt}
                    width={1920}
                    height={1088}
                    loading={i === 0 ? "eager" : "lazy"}
                    data-active={i === active}
                    style={{ transitionDuration: reduce ? "0s" : undefined }}
                  />
                ))}
                <span className="eplus-pill" aria-hidden="true">
                  {String(active + 1).padStart(2, "0")} / 05
                </span>
              </div>
            </div>
          )}
          <ol className="eplus-rows" ref={rowsRef}>
            {STAGES.map((stage, i) => (
              <li
                key={stage.name}
                className="eplus-row"
                data-active={wide && i === active}
                tabIndex={wide ? 0 : undefined}
                onMouseEnter={wide ? () => setActive(i) : undefined}
                onFocus={wide ? () => setActive(i) : undefined}
              >
                <span className="eplus-row-number">
                  {String(i + 1).padStart(2, "0")}
                  {i === STAGES.length - 1 && <span className="eplus-row-dot" aria-hidden="true" />}
                </span>
                <div>
                  <h3>{stage.name}</h3>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
