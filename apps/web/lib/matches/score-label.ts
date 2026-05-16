export function getMatchScoreLabel(score: number): {
  label: string;
  className: string;
} {
  if (score >= 90) {
    return { label: "Excellent match", className: "text-secondary" };
  }
  if (score >= 75) {
    return { label: "Good match", className: "text-primary" };
  }
  return { label: "Fair match", className: "text-muted-foreground" };
}
