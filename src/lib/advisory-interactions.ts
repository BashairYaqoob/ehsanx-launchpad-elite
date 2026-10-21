export function toggleSelection(active: string | null, next: string): string | null { return active === next ? null : next; }
export function nextStepIndex(index: number, key: string, count: number): number | null {
 if (count < 1) return null;
 if (key === 'ArrowRight' || key === 'ArrowDown') return (index + 1) % count;
 if (key === 'ArrowLeft' || key === 'ArrowUp') return (index - 1 + count) % count;
 return null;
}
