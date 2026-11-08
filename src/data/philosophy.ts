import { images as heroImages } from '@/lib/image-assets';
import closing1 from '@/assets/philosophy-discussion-960.webp';
import closing2 from '@/assets/philosophy-discussion-1920.webp';
export type AdvisoryImage = { src: string; srcSet: string; width: number; height: number; alt: string; mobilePos?: string; desktopPos?: string };
export type Foundation = { id: string; title: string; icon: string; bullets: string[]; role: string; feedsInto: string; detail?: string; exampleLink?: { label: string; href: string } | undefined };
export type Stage = { number: string; title: string; descriptor: string; icon: string; detail?: string };
export const philosophy = {
 meta: {title:'Our Philosophy | The E-Plus Model | EhsanX', description:'The E-Plus Model: how meaning, character and entrepreneurial capability create purposeful value, from leadership to human flourishing.'},
 hero: {eyebrow:'PHILOSOPHY',title:'The EhsanX Philosophy'},
 heroLine:'A model for developing people who create value, strengthen institutions, and contribute beyond themselves.',
 intro: {eyebrow:'THE IDEA',title:'Purpose first. Value that outlasts any single project.',pullSentence:'E-Plus defines value creation more broadly than economic or shareholder value alone.', paragraphs:[
 "The E-Plus Model lies at the heart of the EhsanX philosophy. It begins with meaning and purpose in life, which provide direction and shape an individual's character and values. Together with an entrepreneurial mindset and capabilities, these foundations develop people who act with courage, resourcefulness, humility, and responsibility, seeing possibilities where others see constraints and creating value from the resources, relationships, knowledge, and capabilities already available to them.",
 'E-Plus, however, defines value creation more broadly than economic or shareholder value alone. It encourages leaders to move from a shareholder to a stakeholder perspective — developing people, strengthening institutions, creating economic and social value, acting responsibly toward society and the environment, and contributing beyond self. Ultimately, the model seeks human and societal flourishing, connecting entrepreneurial action with purpose, stewardship, service, and accountability that extends beyond this life to the Hereafter.',
 'In this way, E-Plus brings together Purpose, Character & Values, and Entrepreneurial Mindset & Capabilities as the foundations for Purposeful Value Creation, developing people who do not simply succeed, but use their capabilities to create meaningful and lasting good.'
 ]},
 model:{eyebrow:'THE MODEL',title:'Four Foundations, One Outcome',intro:'The E-Plus Model guides how EhsanX develops purpose-driven leaders, entrepreneurial teams, and institutions capable of creating meaningful value.',caption:'Select any element to see its role in the model.',roleLabel:'In the model',feedLabel:'Feeds into:',outcomeLabel:'Leads to:',closeLabel:'Close details',foundations:[
 {id:'meaning',title:'Meaning & Purpose',icon:'Compass',bullets:['Meaning and purpose in life','Awe and wonder','Honoring God and seeking His pleasure','Abundance mindset'],role:"Meaning and purpose in life provide direction and shape an individual's character and values.",feedsInto:'Character & Values',detail:'',exampleLink:undefined},
 {id:'people',title:'People-Centered Beliefs',icon:'Users',bullets:['People are a blessing','People as ends, not merely resources','Developing the whole person'],role:'People are not merely resources to be managed. They are sources of creativity, initiative, resilience, and innovation.',feedsInto:'Entrepreneurial Mindset & Capabilities',detail:'',exampleLink:undefined},
 {id:'character',title:'Character & Values',icon:'Diamond',bullets:['Self-awareness','Courage','Perseverance','Humility & gratitude'],role:'These foundations develop people who act with courage, resourcefulness, humility, and responsibility.',feedsInto:'Purposeful Value Creation',detail:'',exampleLink:undefined},
 {id:'entrepreneurial',title:'Entrepreneurial Mindset & Capabilities',icon:'BrainCog',bullets:['Innovativeness','Resourcefulness','Proactiveness','Collaboration','Creative experimentation','Intelligent use of AI & technology'],role:'Seeing possibilities where others see constraints, and creating value from the resources, relationships, knowledge, and capabilities already available.',feedsInto:'Purposeful Value Creation',detail:'',exampleLink:undefined},
 {id:'outcome',title:'Purposeful Value Creation',icon:'HandHeart',bullets:["In one's own life",'Business & organizations','Institutional development','Human & social flourishing','Nation building','Contribution to humanity'],role:'Value is defined more broadly than economic or shareholder value alone, moving from a shareholder to a stakeholder perspective.',feedsInto:'Human & societal flourishing',detail:'',exampleLink:undefined}
 ] as Foundation[]},
 journey:{eyebrow:'THE JOURNEY',title:'From Leadership to Human Flourishing'},
 stages:[
 {number:'01',title:'Leadership',descriptor:'Inspiring self and others to act with courage, humility, and integrity',icon:'UsersRound',detail:''},
 {number:'02',title:'Innovation',descriptor:'Turning ideas into solutions that create impact and advantage',icon:'Lightbulb',detail:''},
 {number:'03',title:'Value Creation',descriptor:'Creating economic, social, and environmental value for all stakeholders',icon:'ChartNoAxesCombined',detail:''},
 {number:'04',title:'Institutional Transformation',descriptor:'Strengthening institutions and systems for sustainable and scalable impact',icon:'Landmark',detail:''},
 {number:'05',title:'Human Flourishing',descriptor:'Enabling a better world and a meaningful legacy for this life, this world, and the Hereafter',icon:'Earth',detail:''}
 ] as Stage[],
 tagline:'For this life, this world, and the Hereafter.',
 beliefsHeader:{eyebrow:'WHAT WE BELIEVE',title:'Organizations achieve extraordinary results when people discover purpose and develop the courage to act.'},
 beliefs:[
 {title:'Purpose Before Performance',sentence:'We pursue meaningful impact before measurable outcomes.'},
 {title:'People Before Processes',sentence:'Great institutions are built by developing people.'},
 {title:'Entrepreneurial Action',sentence:'We encourage initiative, experimentation, and opportunity creation.'},
 {title:'Learning Always',sentence:'Curiosity and continuous learning drive transformation.'},
 {title:'Innovation with Responsibility',sentence:'Technology and AI should amplify human capability while preserving ethics and dignity.'},
 {title:'Collaboration Over Competition',sentence:'Transformation is created through partnerships and shared success.'},
 {title:'Excellence Through Service',sentence:'Leadership exists to develop others and create lasting value.'},
 {title:'Impact Beyond Organizations',sentence:'Success is measured by the positive difference we create in institutions, communities, and society.'}
 ],
 closing:{eyebrow:'AT EHSANX, WE BELIEVE THAT TRANSFORMATION BEGINS WITH A SIMPLE BUT POWERFUL IDEA',first:'People are not merely resources to be managed. They are sources of creativity, initiative, resilience, and innovation.',second:'When purpose, leadership, and entrepreneurial thinking come together, organizations can achieve extraordinary results.',attribution:'EhsanX'},
 images:{hero:{...heroImages.philosophy_hero,mobilePos:'72% 50%',desktopPos:'50% 50%',alt:'A sunlit terrace with curved glass arches facing a city sunset.'},closing:{src:closing2,srcSet:`${closing1} 1x, ${closing2} 2x`,width:1920,height:832,alt:'Pakistani professionals listening and exchanging ideas in a naturally lit modern office.'}} satisfies Record<string,AdvisoryImage>
};
