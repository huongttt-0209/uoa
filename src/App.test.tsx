import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the brand name "Ú Òa"', () => {
    render(<App />);
    expect(screen.getByText('Ú Òa')).toBeInTheDocument();
  });

  it('renders the brand name as an h1 heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Ú Òa');
  });

  it('applies the app-title class for Space Grotesk styling', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('app-title');
  });

  it('renders a <main> element for semantic structure', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders with the app class for layout', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.app')).toBeTruthy();
  });
});
