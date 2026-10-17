import { Journey } from "./Journey";
import { images } from "@/lib/image-assets";
const stages = [
{ name: 'Listen', description: "Understand your people, culture and context before proposing anything.", image: images.approach_1, alt: 'Listen at EhsanX' },
{ name: 'Diagnose', description: "Identify the gaps and strengths shaping performance today.", image: images.approach_2, alt: 'Diagnose at EhsanX' },
{ name: 'Design', description: "Shape programmes around your goals, not a template.", image: images.approach_3, alt: 'Design at EhsanX' },
{ name: 'Implement', description: "Deliver with your teams through practical, collaborative sessions.", image: images.approach_4, alt: 'Implement at EhsanX' },
{ name: 'Reflect & Improve', description: "Review what worked, learn, and refine for lasting impact.", image: images.approach_5, alt: 'Reflect & Improve at EhsanX' }
];
export function Approach() { return <Journey kind="approach" stages={stages} paragraph='At EhsanX, transformation begins with understanding. Our approach moves organizations from insight to action through a practical, collaborative, and reflective process.' />; }
