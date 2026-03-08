import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
  it('renders children content', () => {
    render(<GlassCard>Hello World</GlassCard>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies the glass-card class', () => {
    render(<GlassCard>Content</GlassCard>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('glass-card');
  });

  it('accepts and merges a custom className', () => {
    render(<GlassCard className="custom-class">Content</GlassCard>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('glass-card');
    expect(card).toHaveClass('custom-class');
  });

  it('renders without className prop', () => {
    render(<GlassCard>Content</GlassCard>);
    const card = screen.getByText('Content');
    expect(card.className).toBe('glass-card');
  });
});
