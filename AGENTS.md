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
