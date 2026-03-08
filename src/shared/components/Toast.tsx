import { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

const TOAST_DURATION_MS = 3000;

export function Toast({ message, visible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [visible, onDismiss]);

  return (
    <div
      className={`toast ${visible ? 'toast--visible' : 'toast--hidden'}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
