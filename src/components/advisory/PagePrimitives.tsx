import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, BrainCog, ChartNoAxesCombined, Compass, Diamond, Earth, HandHeart, Landmark, Lightbulb, Users, UsersRound, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import type { AdvisoryImage } from '@/data/philosophy';
import type { SitePath } from '@/lib/site';
export const iconMap:Record<string,LucideIcon>={BrainCog,ChartNoAxesCombined,Compass,Diamond,Earth,HandHeart,Landmark,Lightbulb,Users,UsersRound};
export function PageReveal({children,className}:{children:ReactNode;className?:string}) {
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:reduced?0:.45,ease:'easeOut'}}>{children}</motion.div>;
}
export function PageImage({image,hero=false,className}:{image:AdvisoryImage;hero?:boolean;className?:string}) {return <img src={image.src} srcSet={image.srcSet} alt={image.alt} width={image.width} height={image.height} loading={hero?'eager':'lazy'} fetchPriority={hero?'high':undefined} className={className}/>;}
export function Eyebrow({children}:{children:ReactNode}){return <p className="ad-eyebrow">{children}</p>;}
export function PageHero({eyebrow,title,line,image}:{eyebrow:string;title:string;line:string;image:AdvisoryImage}){return <section className="ad-hero ad-dark"><PageReveal className="container-x ad-hero-grid"><div className="ad-hero-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><span className="ad-hero-rule" aria-hidden="true"/><p>{line}</p></div><div className="ad-hero-image"><PageImage image={image} hero/></div></PageReveal></section>;}
export function SectionHeader({eyebrow,title,intro}:{eyebrow:string;title:string;intro?:string}){return <header className="ad-header"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{intro&&<p>{intro}</p>}</header>;}
type PageCTAData={title:string;primary:{label:string;to:SitePath};secondary:{label:string;to:SitePath}};
export function PageCTA({data}:{data:PageCTAData}){return <section className="ad-section ad-light ad-cta"><PageReveal className="container-x"><h2>{data.title}</h2><div className="ad-cta-buttons">{[data.primary,data.secondary].map((item,index)=><Button asChild key={item.to} variant="ghost" className={`btn-base ${index===0?'btn-gold':'btn-outline-navy'} ad-link`}><Link to={item.to}>{item.label}<ArrowRight className="btn-arrow" aria-hidden="true"/></Link></Button>)}</div></PageReveal></section>;}
