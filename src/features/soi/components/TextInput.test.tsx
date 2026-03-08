import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders textarea with placeholder', () => {
    render(<TextInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/Paste hoặc gõ/)).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<TextInput value="" onChange={() => {}} />);
    expect(screen.getByText(/Dán lý do/)).toBeInTheDocument();
  });

  it('shows character count', () => {
    render(<TextInput value="Hello" onChange={() => {}} />);
    expect(screen.getByText('5/1000')).toBeInTheDocument();
  });

  it('shows hint when text is too short (>0 and <10)', () => {
    render(<TextInput value="abc" onChange={() => {}} />);
    expect(screen.getByText(/Cần ít nhất 10 ký tự/)).toBeInTheDocument();
  });

  it('does not show hint when text is empty', () => {
    render(<TextInput value="" onChange={() => {}} />);
    expect(screen.queryByText(/Cần ít nhất/)).toBeNull();
  });

  it('does not show hint when text is long enough', () => {
    render(
      <TextInput value="Đây là câu dài hơn 10 ký tự." onChange={() => {}} />,
    );
    expect(screen.queryByText(/Cần ít nhất/)).toBeNull();
  });

  it('calls onChange when user types', () => {
    const onChange = vi.fn();
    render(<TextInput value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New text' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('has associated label via htmlFor', () => {
    render(<TextInput value="" onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id');
    const label = screen.getByText(/Dán lý do/);
    expect(label).toHaveAttribute('for', textarea.getAttribute('id'));
  });

  it('has aria-describedby for hint and count', () => {
    render(<TextInput value="" onChange={() => {}} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby');
  });
});
