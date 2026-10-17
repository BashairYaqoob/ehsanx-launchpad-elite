import { Journey } from "./Journey";
import { images } from "@/lib/image-assets";
const stages = [
{ name: 'Listen', image: images.approach_1, alt: 'Listen at EhsanX' },
{ name: 'Diagnose', image: images.approach_2, alt: 'Diagnose at EhsanX' },
{ name: 'Design', image: images.approach_3, alt: 'Design at EhsanX' },
{ name: 'Implement', image: images.approach_4, alt: 'Implement at EhsanX' },
{ name: 'Reflect & Improve', image: images.approach_5, alt: 'Reflect & Improve at EhsanX' }
];
export function Approach() { return <Journey kind="approach" stages={stages} paragraph='At EhsanX, transformation begins with understanding. Our approach moves organizations from insight to action through a practical, collaborative, and reflective process.' />; }
