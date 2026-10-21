import { describe, expect, it } from 'vitest';
import { nextStepIndex, toggleSelection } from '@/lib/advisory-interactions';
describe('advisory interaction rules',()=>{
 it('selecting the active foundation closes its panel',()=>{expect(toggleSelection('meaning','meaning')).toBeNull();});
 it('selecting another foundation replaces the active panel',()=>{expect(toggleSelection('meaning','people')).toBe('people');});
 it('Right wraps from the fifth step to the first',()=>{expect(nextStepIndex(4,'ArrowRight',5)).toBe(0);});
 it('Down advances one step',()=>{expect(nextStepIndex(0,'ArrowDown',5)).toBe(1);});
 it('Left wraps from first step to fifth',()=>{expect(nextStepIndex(0,'ArrowLeft',5)).toBe(4);});
 it('Up moves backward one step',()=>{expect(nextStepIndex(3,'ArrowUp',5)).toBe(2);});
 it('Enter does not move between steps',()=>{expect(nextStepIndex(2,'Enter',5)).toBeNull();});
});
