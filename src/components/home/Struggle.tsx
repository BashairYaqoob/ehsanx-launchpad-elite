import { GoldRule, Item, Reveal } from "@/components/ui-brand";

const CHALLENGES = [
  { n: "01", text: "Limited ownership, initiative, and entrepreneurial thinking" },
  { n: "02", text: "Short-term leadership and limited future readiness" },
  { n: "03", text: "Siloed teams and weak collaboration" },
  { n: "04", text: "Difficulty adapting to technological and AI-driven change" },
];

export function Struggle() {
  return (
    <section className="eh-challenge section-y bg-paper" aria-labelledby="challenge-title">
      <div className="container-x">
        <Reveal>
          <Item>
            <GoldRule />
            <p className="eyebrow mt-6">The Challenge</p>
            <h2 id="challenge-title" className="h2-display mt-4 text-navy">
              Why Organizations Struggle
            </h2>
            <p className="mt-6 text-lg text-ink/80">
              Many organizations struggle with challenges such as:
            </p>
          </Item>
          <Item>
            <ol className="challenge-grid">
              {CHALLENGES.map((card) => (
                <li key={card.n} className="challenge-cell">
                  <span className="challenge-numeral" aria-hidden="true">
                    {card.n}
                  </span>
                  <h3>{card.text}</h3>
                </li>
              ))}
            </ol>
          </Item>
          <Item>
            <p className="challenge-closing">
              At EhsanX, we believe that sustainable institutional transformation begins by
              developing people.
            </p>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
