import { Journey } from "./Journey";
import { images } from "@/lib/image-assets";
const stages = [
{ name: 'Leadership', image: images.eplus_1, alt: 'Leadership at EhsanX' },
{ name: 'Innovation', image: images.eplus_2, alt: 'Innovation at EhsanX' },
{ name: 'Value Creation', image: images.eplus_3, alt: 'Value Creation at EhsanX' },
{ name: 'Institutional Transformation', image: images.eplus_4, alt: 'Institutional Transformation at EhsanX' },
{ name: 'Human Flourishing', image: images.eplus_5, alt: 'Human Flourishing at EhsanX' }
];
export function EPlus() { return <Journey kind="eplus" stages={stages} paragraph='Every engagement is built on EhsanX’s own philosophy: the E-Plus Model. Explore how purpose, character, and entrepreneurial capability come together to create value that outlasts any single project.' />; }
