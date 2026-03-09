import { useEffect } from 'react';
import { useTimeout } from '../hooks/useTimeout';
import './Toast.css';

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

const TOAST_DURATION_MS = 3000;

export function Toast({ message, visible, onDismiss }: ToastProps) {
  const timer = useTimeout();

  useEffect(() => {
    if (!visible) return;

    timer.set(onDismiss, TOAST_DURATION_MS);

    return () => timer.clear();
  }, [visible, onDismiss, timer]);

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
