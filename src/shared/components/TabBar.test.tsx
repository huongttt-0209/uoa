import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TabBar } from './TabBar';

describe('TabBar', () => {
  it('renders two tabs: TẠO and SOI', () => {
    render(<TabBar activeTab="tao" onTabChange={() => {}} />);
    expect(screen.getByText('TẠO')).toBeInTheDocument();
    expect(screen.getByText('SOI')).toBeInTheDocument();
  });

  it('has role tablist', () => {
    render(<TabBar activeTab="tao" onTabChange={() => {}} />);
    expect(screen.getByRole('tablist')).toBeTruthy();
  });

  it('marks active tab with aria-selected', () => {
    render(<TabBar activeTab="tao" onTabChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onTabChange when tab is clicked', () => {
    const onTabChange = vi.fn();
    render(<TabBar activeTab="tao" onTabChange={onTabChange} />);
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(onTabChange).toHaveBeenCalledWith('soi');
  });

  it('navigates right with ArrowRight key', () => {
    const onTabChange = vi.fn();
    render(<TabBar activeTab="tao" onTabChange={onTabChange} />);
    fireEvent.keyDown(screen.getAllByRole('tab')[0], { key: 'ArrowRight' });
    expect(onTabChange).toHaveBeenCalledWith('soi');
  });

  it('navigates left with ArrowLeft key (wraps)', () => {
    const onTabChange = vi.fn();
    render(<TabBar activeTab="tao" onTabChange={onTabChange} />);
    fireEvent.keyDown(screen.getAllByRole('tab')[0], { key: 'ArrowLeft' });
    expect(onTabChange).toHaveBeenCalledWith('soi');
  });

  it('shows neon indicator on active tab', () => {
    const { container } = render(
      <TabBar activeTab="soi" onTabChange={() => {}} />,
    );
    const indicator = container.querySelector('.tab-bar__indicator');
    expect(indicator).toBeTruthy();
    // Should be inside the SOI tab (index 1)
    const soiTab = container.querySelectorAll('.tab-bar__tab')[1];
    expect(soiTab.querySelector('.tab-bar__indicator')).toBeTruthy();
  });

  it('inactive tab has tabIndex -1 (roving tabindex)', () => {
    render(<TabBar activeTab="tao" onTabChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
  });

  it('renders tab icons', () => {
    render(<TabBar activeTab="tao" onTabChange={() => {}} />);
    expect(screen.getByText('✨')).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });
});
