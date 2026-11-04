import { images as heroImages } from '@/lib/image-assets';
import listen1 from '@/assets/approach-listen-400.webp';
import listen2 from '@/assets/approach-listen-800.webp';
import diagnose1 from '@/assets/approach-diagnose-400.webp';
import diagnose2 from '@/assets/approach-diagnose-800.webp';
import design1 from '@/assets/approach-design-400.webp';
import design2 from '@/assets/approach-design-800.webp';
import implement1 from '@/assets/approach-implement-400.webp';
import implement2 from '@/assets/approach-implement-800.webp';
import reflect1 from '@/assets/approach-reflect-400.webp';
import reflect2 from '@/assets/approach-reflect-800.webp';
import type { AdvisoryImage } from './philosophy';
import type { SitePath } from '@/lib/site';
const photo=(src:string,small:string,alt:string):AdvisoryImage=>({src,srcSet:`${small} 1x, ${src} 2x`,width:800,height:800,alt});
const images={
 hero:{...heroImages.approach_hero,alt:'A consultant in conversation with four colleagues around a meeting table in a bright office.'},
 listen:photo(listen2,listen1,'Two Pakistani professionals listening attentively in a quiet office.'),
 diagnose:photo(diagnose2,diagnose1,'Three Pakistani managers discussing a whiteboard of blank sticky notes.'),
 design:photo(design2,design1,'A Pakistani team working together around a table with blank sketch sheets.'),
 implement:photo(implement2,implement1,'A Pakistani manufacturing manager coaching colleagues beside factory equipment.'),
 reflect:photo(reflect2,reflect1,'Pakistani professionals reviewing notebooks together beside a window in evening light.')
};
export const approach={
 interactive:true,
 meta:{title:'Our Approach | Listen, Diagnose, Design, Implement | EhsanX',description:'A practical, collaborative and reflective process that moves organizations from insight to action and builds lasting internal capability.'},
 hero:{eyebrow:'OUR APPROACH',title:'How We Work',line:'At EhsanX, transformation begins with understanding.'},
 introEyebrow:'THE APPROACH',
 intro:'At EhsanX, transformation begins with understanding. Our approach is designed to move organizations from insight to action through a practical, collaborative, and reflective process. Each step helps leaders and teams identify what matters most, design meaningful interventions, apply learning in real work settings, and build the internal capability needed for continuous improvement.',
 method:{eyebrow:'THE METHOD',title:'Listen. Diagnose. Design. Implement. Reflect & Improve.',groupLabel:'Approach steps',mark:'EX'},
 steps:[
 {number:'01',title:'Listen',description:"Understand the organization's context, challenges, aspiration, and opportunities.",photo:images.listen,alt:images.listen.alt},
 {number:'02',title:'Diagnose',description:'Identify critical areas where improvement can create value.',photo:images.diagnose,alt:images.diagnose.alt},
 {number:'03',title:'Design',description:'Develop customized interventions aligned with organizational priorities.',photo:images.design,alt:images.design.alt},
 {number:'04',title:'Implement',description:'Engage participants in practical learning linked to real responsibilities.',photo:images.implement,alt:images.implement.alt},
 {number:'05',title:'Reflect & Improve',description:'Review progress, capture lessons, and build continuous improvement capabilities.',photo:images.reflect,alt:images.reflect.alt}
 ],
 principle:{eyebrow:'WHY IT WORKS',title:'Grounded in your real context. Connected to practical outcomes.',copy:"This process ensures that every engagement is grounded in the organization's real context and connected to practical outcomes. By combining reflection, implementation, and capability building, EhsanX helps transformation continue beyond the program itself.",chips:['Practical','Collaborative','Reflective']},
 cta:{title:'Begin with a conversation.',primary:{label:'Talk About Your Context',to:'/contact' as SitePath},secondary:{label:'See Our Solutions',to:'/solutions' as SitePath}},
 images
};
