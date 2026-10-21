<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep homepage scroll scenes scoped and load GSAP/ScrollTrigger after hydration; this prevents server evaluation and cleans up pins on navigation.
- Store imported photo variants as asset pointers and never generate derivatives wider than the source; generated artwork can remain bundled WebP imports.
- Keep hero text separate from persistent CTAs and controls, with interaction rules in a browser-safe module so playback behavior is testable.
- Use the shared Journey for five-stage scroll presentations with reduced-motion static fallbacks; keeping pin lifecycles scoped prevents navigation leaks.
- Keep image sizes and srcsets in the browser-safe image-assets registry; this centralizes natural-size limits and responsive image selection.
- Mount Lenis after hydration and synchronize via GSAP ticker with route cleanup; this keeps scroll restoration and pin updates consistent.
- Keep client-impact content in src/data/clientImpact.ts; the presentation hides empty figures and details so client updates need only data edits.
- Compute Home impact totals from the client records, including deduplicated delivery cities, while retaining client detail off Home; future client updates must automatically propagate to the totals.
- Home owns its combined closing CTA/footer, while the root renders the standalone footer only outside Home; this avoids duplicate footer landmarks.
- Scroll scenes use opaque, isolated sections with explicit pin spacing and shared font/image/resize refresh cleanup; this preserves DOM-order pin geometry.
- Philosophy and Approach use a route-scoped advisory stylesheet and editable page data, not shared style edits; this preserves Home and brand tokens.
- Advisory pages reuse FinalCta unchanged and hide the redundant standalone footer through their scoped page marker; this avoids modifying the shared shell.
- Advisory interactions use browser-safe selection helpers, static diagrams and the existing Drawer; this keeps keyboard behavior testable without scroll effects.
