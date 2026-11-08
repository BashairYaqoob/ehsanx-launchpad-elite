import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, BrainCog, ChartNoAxesCombined, Compass, Diamond, Earth, HandHeart, Landmark, Lightbulb, Users, UsersRound, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AdvisoryImage } from '@/data/philosophy';
import type { SitePath } from '@/lib/site';
export const iconMap:Record<string,LucideIcon>={BrainCog,ChartNoAxesCombined,Compass,Diamond,Earth,HandHeart,Landmark,Lightbulb,Users,UsersRound};
export function PageReveal({children,className}:{children:ReactNode;className?:string}) {
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:reduced?0:.45,ease:'easeOut'}}>{children}</motion.div>;
}
export function PageImage({image,hero=false,className}:{image:AdvisoryImage;hero?:boolean;className?:string}) {return <img src={image.src} srcSet={image.srcSet} alt={image.alt} width={image.width} height={image.height} loading={hero?'eager':'lazy'} fetchPriority={hero?'high':undefined} className={className}/>;}
export function Eyebrow({children}:{children:ReactNode}){return <p className="ad-eyebrow [.advisory-page_&]:[display:flex] [.advisory-page_&]:[align-items:center] [.advisory-page_&]:[gap:14px] [.advisory-page_&]:[font-family:var(--font-sans)] [.advisory-page_&]:[font-weight:600] [.advisory-page_&]:[color:var(--teal)]! [.advisory-page_&]:[font-size:12px] [.advisory-page_&]:[letter-spacing:.18em] [.advisory-page_&]:[line-height:1.6] [.advisory-page_&]:[margin-bottom:24px] [.advisory-page_&]:[text-transform:uppercase] [.advisory-page_&::before]:[content:''] [.advisory-page_&::before]:[height:2px] [.advisory-page_&::before]:[width:32px] [.advisory-page_&::before]:[flex-shrink:0] [.advisory-page_&::before]:[background:var(--gold)] [.advisory-page_.ad-dark_&]:[color:var(--ad-eyebrow-color-17)]! [.advisory-page_.ad-quote_&]:[justify-content:center] [.advisory-page_.ad-quote_&]:[max-width:68ch] [.advisory-page_.ad-quote_&]:[margin:0_auto_32px] [.advisory-page_.ad-hero-copy_&]:[font-size:12px] [.advisory-page_.ad-hero-copy_&]:[line-height:1.6] [.advisory-page_.ad-hero-copy_&]:[color:var(--ad-eyebrow-color-17)]! [@media(max-width:767.98px)]:[.advisory-page_.ad-hero-copy>p:not(&)]:[padding-right:52px]">{children}</p>;}
// Same responsive hero treatment as Solutions and Client Impact: full-bleed photo with a left gradient from 900px, image-then-text below.
export function PageHero({eyebrow,title,line,image}:{eyebrow:string;title:string;line:string;image:AdvisoryImage}){return <section className="relative bg-navy-deep text-paper min-[900px]:flex min-[900px]:min-h-[max(85vh,600px)] min-[900px]:items-center">
 <div className="pt-[calc(5rem+8px)] min-[900px]:absolute min-[900px]:inset-0 min-[900px]:pt-0">
  <img src={image.src} srcSet={image.srcSet} sizes="100vw" alt={image.alt} width={image.width} height={image.height} fetchPriority="high" style={{['--hp-m' as string]:image.mobilePos??'50% 50%',['--hp-d' as string]:image.desktopPos??'50% 50%'}} className="aspect-[4/3] w-full object-cover [object-position:var(--hp-m)] min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:[object-position:var(--hp-d)]"/>
  <div aria-hidden="true" className="absolute inset-0 hidden min-[900px]:block" style={{background:"linear-gradient(90deg, rgba(8,22,40,0.88) 0%, rgba(8,22,40,0.6) 40%, rgba(8,22,40,0) 70%)"}}/>
 </div>
 <div className="relative mx-auto w-full max-w-[1280px] px-6 py-12 md:px-10 min-[900px]:pb-20 min-[900px]:pt-[calc(5rem+48px)]">
  <PageReveal className="max-w-[620px]">
   <p className="ad-eyebrow font-[Inter] text-[13px] font-semibold uppercase tracking-[0.14em] text-gold">{eyebrow}</p>
   <h1 className="mt-5 font-[Montserrat] text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.1] text-paper">{title}</h1>
   <span className="mt-7 block h-[2px] w-14 bg-gold" aria-hidden="true"/>
   <p className="mt-7 max-w-[52ch] font-[Inter] text-[17px] leading-[1.7] text-paper/90">{line}</p>
  </PageReveal>
 </div>
</section>;}
export function SectionHeader({eyebrow,title,intro}:{eyebrow:string;title:string;intro?:string}){return <header className="ad-header [.advisory-page_&]:[margin-bottom:48px] [.advisory-page_&]:[max-width:900px] [.advisory-page_&_p]:[margin-top:24px] [.advisory-page_&_p]:[max-width:68ch]"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{intro&&<p>{intro}</p>}</header>;}
// Contextual next step shown just before the shared FinalCta. A quiet text link rather than a second
// button block, so the two closing sections do not compete for the same action.
type NextStepData={lead?:string;label:string;to:SitePath};
export function NextStep({data}:{data:NextStepData}){return <nav aria-label="Next page" className="ad-next border-t border-navy/10 bg-paper py-14 md:py-16">
<PageReveal className="container-x [width:100%] [max-width:1280px] [margin-inline:auto] [padding-inline:24px] [@media(min-width:_768px)]:[padding-inline:48px] max-xl:!px-4 sm:max-xl:!px-6 lg:max-xl:!px-8">
{data.lead&&<p className="mb-5 max-w-[46ch] font-[Inter] text-[17px] leading-[1.6] text-ink/75">{data.lead}</p>}
<Link to={data.to} aria-label={`Next: ${data.label}`} className="group inline-flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
<span className="font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-teal md:text-[13px]">Next</span>
<span className="inline-flex items-center gap-3 font-display text-[28px] font-semibold leading-[1.2] text-navy decoration-gold decoration-2 underline-offset-[6px] group-hover:underline md:text-[36px]">{data.label}<ArrowRight className="h-6 w-6 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none md:h-7 md:w-7" aria-hidden="true"/></span>
</Link>
</PageReveal>
</nav>;}
