import { Ear, PencilRuler, RefreshCw, Rocket, Search, type LucideIcon } from "lucide-react";

export type ApproachStep = { name: string; description: string; Icon: LucideIcon };

export const approachSteps: ApproachStep[] = [
  { name: "Listen", description: "Understand your people, culture and context before proposing anything.", Icon: Ear },
  { name: "Diagnose", description: "Identify the gaps and strengths shaping performance today.", Icon: Search },
  { name: "Design", description: "Shape programmes around your goals, not a template.", Icon: PencilRuler },
  { name: "Implement", description: "Deliver with your teams through practical, collaborative sessions.", Icon: Rocket },
  { name: "Reflect & Improve", description: "Review what worked, learn, and refine for lasting impact.", Icon: RefreshCw },
];
