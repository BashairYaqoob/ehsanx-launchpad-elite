import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Users, Building2, Sprout } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GoldRule, Item, Reveal } from "@/components/ui-brand";
import { images } from "@/lib/image-assets";
import { refreshImages } from "@/lib/refresh-images";

const VISION =
  "To develop people of character and entrepreneurial mindset who strengthen institutions, create value, and contribute to a flourishing society through the pursuit of Ihsan.";
const PILLARS = [
  { label: "Develop entrepreneurial leaders", icon: Users },
  { label: "Strengthen institutions", icon: Building2 },
  { label: "Enable sustainable transformation", icon: Sprout },
];

export function WhyExists() {
  const reduce = useReducedMotion();
  return (
    <>
      <section className="eh-why section-y bg-paper">
        <div className="container-x">
          <Reveal className="eh-why-grid">
            <div>
              <Item>
                <GoldRule />
                <h2 className="h2-display mt-6 text-navy">Why EhsanX Exists</h2>
              </Item>
              <Item className="eh-purpose-copy">
                <p>
                  EhsanX partners with organizations to develop{" "}
                  <mark className="eh-highlight">entrepreneurial leaders</mark>,{" "}
                  <mark className="eh-highlight">strengthen institutions</mark>, and enable{" "}
                  <mark className="eh-highlight">sustainable transformation</mark>. Through
                  leadership development, capability-building, consulting, and organizational
                  transformation initiatives, we help organizations unlock growth by leveraging the
                  strengths, people, relationships, resources, and opportunities they already
                  possess.
                </p>
                <p className="text-ink">
                  We believe that extraordinary results emerge when people discover purpose,
                  cultivate an entrepreneurial mindset, and learn to create value from what they
                  already have.
                </p>
              </Item>
            </div>
            <Item className="eh-portrait-wrap">
              <div className="eh-portrait">
                <img
                  src={images.portrait.src}
                  srcSet={images.portrait.srcSet}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  alt="A bright waterfront walkway beside an EhsanX building"
                  width={928}
                  height={691}
                  loading="lazy"
                />
              </div>
              <span className="eh-portrait-corner" aria-hidden />
            </Item>
          </Reveal>
          <div className="eh-pillars" aria-label="Three pillars">
            {PILLARS.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="pillar-card-wrap"
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : index * 0.06 }}
              >
                <Link to="/philosophy" className="pillar-card" aria-label={`${label} — read our philosophy`}>
                  <div className="pillar-card-top">
                    <span className="pillar-number">0{index + 1}</span>
                    <span className="pillar-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
                  </div>
                  <div className="pillar-card-bottom">
                    <span className="pillar-rule" aria-hidden="true" />
                    <h3>{label}</h3>
                  </div>
                  <ArrowUpRight className="pillar-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="eh-vision section-y" aria-label="Our Vision">
        <div className="container-x eh-vision-grid">
          <Reveal className="eh-vision-copy">
            <Item>
              <GoldRule />
              <p className="eyebrow mt-6">Our Vision</p>
            </Item>
            <Item>
              <blockquote className="eh-vision-quote">{VISION}</blockquote>
            </Item>
          </Reveal>
          <Reveal className="eh-vision-media">
            <Item>
              <img
                src={refreshImages.vision_v2.src}
                srcSet={refreshImages.vision_v2.srcSet}
                sizes="(min-width: 1024px) 42vw, 100vw"
                alt="EhsanX vision across a calm horizon"
                width={1920}
                height={1080}
                loading="lazy"
              />
            </Item>
          </Reveal>
        </div>
      </section>
    </>
  );
}
