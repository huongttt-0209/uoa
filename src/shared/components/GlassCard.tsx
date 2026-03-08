import './glass-card.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  const classes = className ? `glass-card ${className}` : 'glass-card';
  return <div className={classes}>{children}</div>;
}
