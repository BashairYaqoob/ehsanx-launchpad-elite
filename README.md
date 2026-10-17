# Ehsanx Launchpad Elite

Build the HOME PAGE of a premium corporate website for EhsanX, a leadership development and organizational transformation firm. Use React + Vite + Tailwind + framer-motion + react-router + lucide-react. The site has 7 pages total. Only the Home page is fully built now; the other 6 are clean placeholder pages. The feel should be calm, confident, editorial, and premium: generous whitespace, large Montserrat headlines, soft shadows, slow and smooth motion. Think top-tier consulting firm meets modern design studio. No clutter, no emojis, no purple or neon gradients, no stock-template look.

=== 1. BRAND SYSTEM (STRICT) ===
Colors (define as CSS variables + Tailwind tokens):
- Primary Navy #344A6A
- Secondary Teal #116065
- Accent Gold #FAB74C
- Background #FFFFFF
- Text #0D0D0D
You may use tints/shades of these (e.g. navy darkened to ~#1F2E45 for overlays, navy at 4-8% opacity for subtle section backgrounds). Do NOT introduce any new hues.
Gold rules: gold is an accent only. Use it for primary buttons (navy text on gold), thin rules, active states, small highlights, and on dark backgrounds. Never use gold as text color on white.
Typography: Headings = Montserrat (600/700/800). Body = Inter (400/500/600). Load both from Google Fonts with display=swap.
Scale: H1 clamp(2.5rem, 6vw, 5rem), weight 700, line-height 1.05, tracking -0.02em. H2 clamp(2rem, 4vw, 3.5rem), weight 700. H3 1.5-1.75rem, weight 600. Body 1.0625-1.25rem, line-height 1.7. Small eyebrow labels: Montserrat 600, uppercase, 0.14em letter-spacing, 0.75rem, in teal (or gold on dark backgrounds).
Layout: max container 1280px, side padding 24px mobile / 48px desktop, section padding py-24 mobile / py-32 desktop, 8px spacing grid, rounded corners 16-24px on cards, pill buttons, soft navy-tinted shadows (e.g. 0 20px 60px -20px rgba(52,74,106,0.25)).
Buttons: Primary = gold fill, navy text, pill, on hover lifts 2px with a small arrow icon sliding right. Secondary = transparent with 1.5px outline (white on dark backgrounds, navy on light), same hover.
Use the EXACT copy I provide below. Do not rewrite, add, or invent extra marketing copy. Keep "Ehsan" capitalized, "E-Plus" hyphenated, and use curly quotes.

=== 2. LOGO, TAB, FAVICON ===
I will attach the EhsanX logo (white version and full-color version). Use the white logo on the transparent navbar over the hero, and the full-color logo once the navbar turns white on scroll. Use the logo as the browser tab favicon (public/favicon.png plus apple-touch-icon). Page titles: Home = "EhsanX | Building Leaders. Transforming Organizations." Other pages = "Philosophy | EhsanX", etc. Add a meta description and Open Graph tags.

=== 3. SITE STRUCTURE & ROUTING ===
Seven routes with a shared layout (navbar + footer):
/ Home | /philosophy | /solutions | /our-approach | /client-impact | /meet-the-team | /contact
Only Home is built now. The other 6 pages should each have a simple on-brand page header (navy background, eyebrow with the page name, H1 with the page name, a thin gold rule) and a centered, tasteful "This page is being crafted" note. No lorem ipsum. They must be fully navigable so I can build them later.
Purpose of each page (for later, do not build now): Philosophy = deep dive into the E-Plus Model and What We Believe. Solutions = the three offerings plus why organizations partner with EhsanX. Our Approach = the 5-step method. Client Impact = case-study index (KFC, PCI, Ahmad Jamal) plus individual case detail. Meet the Team = founder credibility and origin story. Contact = WhatsApp, email, optional form.
Every button and teaser on Home must link to the right page (links specified per section below).

=== 4. NAVIGATION BAR ===
- Floating, pill-shaped (rounded-full) bar, centered, max-width ~1200px, 16px from the top. Logo on the left (clicking it goes Home). Links: Philosophy, Solutions, Our Approach, Client Impact, Meet the Team. On the right, a gold pill button "Contact" linking to /contact.
- Scroll behavior: it "pops up" after the preloader finishes by sliding down from above with a soft spring. At the top of the page it is fully transparent with white text and the white logo. After ~40px of scroll it becomes frosted white (bg white/80, backdrop-blur-xl, 1px navy/10 border, soft shadow) with navy text and the full-color logo, and compresses slightly in height. When scrolling DOWN past ~120px it hides (slides up); when scrolling UP it reappears. Transitions ~400ms ease-out.
- Active link: animated gold underline. Hover: underline grows from the left.
- Mobile: hamburger opens a full-screen navy overlay with large Montserrat links staggering in, plus the gold Contact button at the bottom, and a close button.
- Add a 2px gold scroll-progress bar fixed at the very top of the viewport.

=== 5. PRELOADER (VIDEO) ===
We already have a video of the EhsanX logo forming. I will attach it later, so build the structure now:
- Fullscreen fixed preloader (z-index above everything) with a <video> element (muted, playsInline, autoPlay, preload="auto", object-fit: contain, centered). Source path is a single constant at src/config/preloader.ts, defaulting to /preloader.mp4. Background color is a CSS variable --preloader-bg (default #FFFFFF) so I can match it to the video's background.
- Until the video file exists, show a placeholder: the static logo centered with a thin gold progress line filling over 2.5s, so the site is still viewable.
- When the video ends (onEnded) OR after an 8-second safety timeout OR if the video errors, exit with a curtain transition: two panels (navy and teal) slide apart vertically over ~800ms revealing the page. Only after this ends do the navbar pop up and the hero begin its entrance animation and slider autoplay.
- Show the preloader once per session (sessionStorage, wrapped in try/catch). Skip it if prefers-reduced-motion is set. Lock body scroll while it plays.

=== 6. HERO SECTION (SLIDER) ===
Because the logo animation lives in the preloader, the hero is a full-viewport (100svh) autoplay slider of 4 slides. Each slide has a full-bleed background image, a navy gradient overlay (left to right, ~88% navy #1F2E45 on the left fading to ~15% on the right, plus a subtle bottom gradient) so white text is always readable, and a left-aligned text block (max-width ~680px, vertically centered, offset below the navbar).
Slide content (eyebrow can be the slide number like "01 / 04" in gold):
1. H1: "Building Leaders. Transforming Organizations." / Sub: "We help organizations develop leaders who can navigate complexity, strengthen teams, and create lasting impact." / Image: Attached image 1 (stacked EX blocks in a bright atrium). Keep the tower visible on the right half (object-position ~70% center).
2. Title: "Leadership That Creates Real Change." / Sub: "Equip your people with the clarity, capability, and confidence to turn leadership potential into measurable performance." / Image: Attached image 2 (origami boats climbing to the cliff edge).
3. Title: "From Individual Growth to Organizational Impact." / Sub: "Align leadership, strengthen organizational culture, and turn development initiatives into meaningful business outcomes." / Image: Attached image 3 (origami boats rippling out from the gold center boat).
4. Title: "Every Organization Has the Potential to Go Further." / Sub: "We partner with organizations to uncover potential, navigate challenges, and build the capabilities needed for what comes next." / Image: Attached image 4 (sailing ship at sunset with the EHSANX flag).
Only slide 1 uses a true <h1>; the others are styled identically but are <h2>.
Behavior: auto-advance every 6.5 seconds, crossfade 1.2s, with a slow Ken Burns zoom (scale 1.0 to 1.08) on the active image. Text animates in with a staggered mask-reveal (title lines slide up, then sub, then buttons). Controls: bottom-left numbered dot indicators where the active one shows a gold progress bar filling over the slide duration; small prev/next arrow buttons at bottom-right; pause on hover and when the tab is hidden; swipe on touch; keyboard arrows; loop forever. Add a visible pause/play button for accessibility. Respect prefers-reduced-motion (no autoplay zoom, simple fades).
Two CTAs on every slide: gold primary "Start a Conversation" (to /contact) and secondary outline "Explore Our Approach" (to /our-approach).
Bottom-center: a small "Scroll" indicator with an animated line. Parallax: as the user scrolls, the hero image translates slower than the page and the text fades up and out.
Preload the first slide image with high priority; lazy-load the rest.

=== 7. HOME PAGE SECTIONS (in this order) ===

7.1 WHY EHSANX EXISTS (white background)
Two-column on desktop (5/7 split). Left: eyebrow "Why EhsanX Exists" + H2 "Why EhsanX Exists" is redundant, so use the eyebrow style only for the title: render "Why EhsanX Exists" as the H2 with a short gold rule above it. Right: the two paragraphs, exactly:
"EhsanX partners with organizations to develop entrepreneurial leaders, strengthen institutions, and enable sustainable transformation. Through leadership development, capability-building, consulting, and organizational transformation initiatives, we help organizations unlock growth by leveraging the strengths, people, relationships, resources, and opportunities they already possess."
"We believe that extraordinary results emerge when people discover purpose, cultivate an entrepreneurial mindset, and learn to create value from what they already have."
Effect: paragraphs fade-up with stagger as they enter the viewport. First paragraph slightly larger (1.25rem) in navy, second in text color.
Directly below, a full-width VISION BAND on teal #116065 with a faint concentric-ripple SVG pattern (thin gold/white lines at 8% opacity) and a large gold opening quote mark. The quote in large Montserrat (clamp 1.75rem to 3rem), white: "To develop people of character and entrepreneurial mindset who strengthen institutions, create value, and contribute to a flourishing society through the pursuit of Ihsan." Small eyebrow above it: "Our Vision". Scroll effect: the quote reveals word by word, with words moving from 25% to 100% opacity as the user scrolls (scroll-linked), and a gold vertical rule draws down beside it.

7.2 WHY ORGANIZATIONS STRUGGLE: SCROLL-TRIGGERED STACKED CARD REVEAL (subtle navy 4% background)
Layout: on desktop, a two-column layout. Left column is sticky (position: sticky; top ~140px) with eyebrow "The Challenge", H2 "Why Organizations Struggle" and the line "Many organizations struggle with challenges such as:". Right column holds 4 large cards that STACK as the user scrolls: each card is position: sticky with an increasing top offset (e.g. 120px, 144px, 168px, 192px) so each new card slides up and over the previous one. As a card gets covered, the cards beneath scale down slightly (to ~0.94), dim a little, and gain a slight blur or lower opacity, driven by scroll progress (framer-motion useScroll/useTransform). Total scroll length of this section about 300-350vh so each card gets a clear moment.
Cards (min-height ~340px, rounded-3xl, large soft shadow, a big number "01" to "04" in Montserrat, and a lucide icon in a rounded square):
01 "Limited ownership, initiative, and entrepreneurial thinking" (navy card, white text, gold number)
02 "Short-term leadership and limited future readiness" (teal card, white text, gold number)
03 "Siloed teams and weak collaboration" (white card, navy text, 1px navy/10 border, teal number)
04 "Difficulty adapting to technological and AI-driven change" (gold #FAB74C card, navy text, navy number)
Do not add any extra copy to the cards. On mobile, keep the stacking but with smaller offsets (top 96px, then +16px each) and the heading above the cards instead of sticky.

7.3 THE E-PLUS MODEL (teaser), navy #344A6A background
Eyebrow "Our Philosophy", H2 "The E-Plus Model" in white. Visual: an ASCENDING STAIRCASE of 5 blocks rising left to right (stacked-block motif echoing the brand's blocks): "Leadership", "Innovation", "Value Creation", "Institutional Transformation", "Human Flourishing". Colors progress from navy-light to teal to gold at the final block. A thin line with a small glowing node connects the blocks and draws itself as the user scrolls; each block lifts and lights up in sequence (scroll-linked). On mobile it becomes a vertical stepped list with the same drawing line. Show the text line "Leadership → Innovation → Value Creation → Institutional Transformation → Human Flourishing." as a small caption under the staircase.
Copy below, white/80% text: "Every engagement is built on EhsanX's own philosophy: the E-Plus Model. Explore how purpose, character, and entrepreneurial capability come together to create value that outlasts any single project."
Button: gold primary "Explore the Full Model →" linking to /philosophy.

7.4 OUR APPROACH (teaser), white background
Eyebrow "How We Work", H2 "Our Approach". Visual: a horizontal 5-step timeline: Listen → Diagnose → Design → Implement → Reflect & Improve, with large numbered circles (01-05, teal outlined, filling teal as scroll progresses) and a connecting line that draws on scroll. After step 5, a curved gold arc loops back to step 1 to show that Reflect & Improve feeds back into Listen (a continuous cycle). Each step title in Montserrat 600. On mobile, make it a vertical timeline with the loop arrow on the side.
Copy: "At EhsanX, transformation begins with understanding. Our approach moves organizations from insight to action through a practical, collaborative, and reflective process."
Button: secondary outline navy "See Our Approach →" linking to /our-approach.

7.5 PROOF: FEATURED CASE, KFC PAKISTAN (soft navy 4% background)
Eyebrow "Client Impact". Layout: two columns. Left: attached image 5 (professionals in a workshop/meeting room) in a rounded-3xl frame that reveals with a clip-path wipe on scroll, plus a small floating gold-edged card overlapping its corner reading "KFC Pakistan". Right: a giant count-up number "~12,000" (Montserrat 800, teal, counts up on enter) with the label "employees influenced". Then the paragraph: "KFC Pakistan sought to strengthen the entrepreneurial mindset, leadership capability, and innovation capacity of its Restaurant General Managers. A national Entrepreneurial Leadership & Innovation programme reached 180 RGMs across three regional cohorts over a 4-month journey." Underneath, three small stat chips that count up: "180 RGMs", "3 regional cohorts", "4 months". Then a large pull-quote with a gold quote mark and a left gold rule: "Every Restaurant General Manager became more than an operational manager — they became a coach, an innovator, and a developer of people." Button: gold primary "See All Client Impact →" linking to /client-impact.

7.6 FOUNDER STRIP (white background)
A slim, elegant two-column section: a circular/rounded portrait placeholder on the left, and on the right eyebrow "Meet the Team", a placeholder name/title/one-line credibility statement in square brackets (e.g. [Founder name], [Title], [One-line credibility statement]) so I can replace them, and a secondary button "Meet the Team →" to /meet-the-team. Make it easy to delete this whole section.

7.7 FINAL CTA (navy overlay on a full-bleed background image)
Background: attached image 4 (sailing ship) reused full-bleed with a heavy navy (#1F2E45 at ~85%) overlay and a gentle parallax. Centered content: H2 (white) "Let's Build the Future Together", paragraph (white/85%): "The future will not be shaped by resources alone. It will be shaped by the ability of people and institutions to learn, adapt, innovate, and create value in a changing world." Large gold pill button "Start a Conversation" linking to /contact with a subtle magnetic hover effect (button follows the cursor slightly).

7.8 FOOTER (dark navy #1F2E45)
White logo, tagline "Developing People. Strengthening Institutions. Creating Meaningful Impact.", the 7 page links in columns, a contact column with bracketed placeholders [WhatsApp number] and [email address], a thin gold divider, and "© 2026 EhsanX. All rights reserved."
Also add a small floating circular WhatsApp button (bottom-right, teal) linking to a placeholder wa.me URL I'll update later.

=== 8. MOTION PRINCIPLES (APPLY SITE-WIDE) ===
- Every section animates in once (whileInView, once: true, margin -100px): fade + 24px rise, 0.7s, easing cubic-bezier(0.22, 1, 0.36, 1), children staggered at 0.08-0.12s.
- Scroll-linked effects (parallax, stacking cards, staircase, timeline line, word-reveal) use framer-motion useScroll/useTransform and must feel smooth, never janky.
- Hover states on all cards and links (slight lift, shadow growth, underline slides).
- Keep everything performant: transform and opacity only, will-change sparingly, lazy-load images below the fold, use WebP, and set width/height to avoid layout shift.
- Honor prefers-reduced-motion everywhere by replacing motion with simple fades.

=== 9. RESPONSIVE & ACCESSIBILITY ===
Fully responsive: 360px, 768px, 1024px, 1440px+. Touch targets at least 44px. Semantic HTML (header, nav, main, section, footer), one H1 per page, descriptive alt text on all images, visible focus rings (2px gold outline with offset), ARIA labels on slider controls and a live region for slide changes, WCAG AA contrast on all text over images (the overlay gradient is what guarantees this on the hero).

=== 10. DO NOT ===
Do not use lorem ipsum, fake testimonials, fake stats, fake client logos, or invented copy beyond what's given. Do not change the colors or fonts. Do not add emojis. Do not use gold as text on white. Do not make the hero a static image. Do not skip the stacked-card section effect. Do not build the 6 inner pages beyond the placeholder headers.

Attached assets, in order: (1) stacked EX blocks atrium, (2) origami boats climbing cliff, (3) origami boats ripple circle, (4) sailing ship with EHSANX flag, (5) professionals in meeting room, (6) logo white version, (7) logo full-color version. Save them in src/assets with clear names (hero-blocks, hero-cliff, hero-ripple, hero-ship, workshop-team, logo-white, logo-color).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ehsanx-launchpad-elite.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/047be10c-62d9-4f99-8186-5feafae4cef1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
