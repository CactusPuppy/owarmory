export type HealthType = "health" | "armor" | "shields";

// Config
export const CHUNK_SIZE = 25;

export type SegmentData = { types: HealthType[]; values: number[] };

export function buildSegments(health: number, armor: number, shields: number): SegmentData[] {
  const segments = [];
  const remaining: Record<HealthType, number> = { health, armor, shields };
  for (const type of ["health", "armor", "shields"] as HealthType[]) {
    let value = remaining[type];
    if (segments.length > 0 && segementTotalHealth(segments[segments.length - 1]) < CHUNK_SIZE) {
      const remainingHealthInSegment =
        CHUNK_SIZE - segementTotalHealth(segments[segments.length - 1]);
      const chunk = Math.min(remainingHealthInSegment, value);
      segments[segments.length - 1].types.push(type);
      segments[segments.length - 1].values.push(chunk);
      value -= chunk;
    }
    while (value > 0) {
      const chunk = Math.min(CHUNK_SIZE, value);
      segments.push({ types: [type], values: [chunk] });
      value -= chunk;
    }
  }
  return segments;
}

export function segmentToBackground(segment: SegmentData): string {
  if (segment.types.length <= 0) return "";
  if (segment.types.length == 1) {
    return `var(--${segment.types[0]}-color)`;
  }
  const backgroundBlocks: string[] = [];
  let percentageFilled = 0;
  for (const [i, type] of segment.types.entries()) {
    const typePercentOfSegment = (segment.values[i] / CHUNK_SIZE) * 100;
    if (typePercentOfSegment <= 0) continue;
    if (percentageFilled > 0) {
      backgroundBlocks.push(`var(--${type}-color) ${percentageFilled}%`);
    }
    percentageFilled += typePercentOfSegment;
    backgroundBlocks.push(`var(--${type}-color) ${percentageFilled}%`);
  }
  return `linear-gradient(to right, ${backgroundBlocks.join(", ")})`;
}

export function segementTotalHealth(segment: SegmentData): number {
  return segment.values.reduce((prev, curr) => prev + curr);
}
