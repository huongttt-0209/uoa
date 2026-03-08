import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BSGauge } from './BSGauge';

describe('BSGauge', () => {
  it('renders score percentage', () => {
    render(<BSGauge score={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('has meter role with aria attributes', () => {
    render(<BSGauge score={42} />);
    const gauge = screen.getByRole('meter');
    expect(gauge).toHaveAttribute('aria-valuenow', '42');
    expect(gauge).toHaveAttribute('aria-valuemin', '0');
    expect(gauge).toHaveAttribute('aria-valuemax', '100');
  });

  it('has aria-label with score', () => {
    render(<BSGauge score={88} />);
    const gauge = screen.getByRole('meter');
    expect(gauge).toHaveAttribute('aria-label', 'BS Score: 88%');
  });

  it('clamps score below 0', () => {
    render(<BSGauge score={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('clamps score above 100', () => {
    render(<BSGauge score={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders SVG elements', () => {
    const { container } = render(<BSGauge score={50} />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('.bs-gauge__needle')).toBeTruthy();
    expect(container.querySelector('.bs-gauge__arc')).toBeTruthy();
  });

  it('renders score 0', () => {
    render(<BSGauge score={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders score 100', () => {
    render(<BSGauge score={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
