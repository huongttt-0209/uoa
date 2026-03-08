import { useState, useCallback } from 'react';
import { Toast } from '../../../shared/components/Toast';
import { useTimeout } from '../../../shared/hooks/useTimeout';
import { trackExcuseCopied } from '../../../shared/utils/analytics';
import './copy-button.css';

interface CopyButtonProps {
  text: string;
}

/**
 * CopyButton — copies excuse text to clipboard with fallback (FR5).
 * States: Default → Active → Success (✓ swap 1s).
 * Shows Toast "Đã copy! 📋" on success.
 */
export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const timeout = useTimeout();

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: document.execCommand('copy')
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setToastVisible(true);

      timeout.set(() => setCopied(false), 1000);
      trackExcuseCopied();
    } catch {
      // Silently fail — no error modals per UX spec
    }
  }, [text, timeout]);

  return (
    <>
      <button
        className={`copy-button${copied ? ' copy-button--success' : ''}`}
        onClick={handleCopy}
        type="button"
        aria-label="Copy lý do"
        disabled={!text}
      >
        {copied ? '✓ Đã copy' : '📋 Copy'}
      </button>
      <Toast
        message="Đã copy! 📋"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </>
  );
}
