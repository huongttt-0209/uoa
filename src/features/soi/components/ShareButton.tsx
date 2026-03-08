import { useState, useCallback } from 'react';
import { Toast } from '../../../shared/components/Toast';
import { useTimeout } from '../../../shared/hooks/useTimeout';
import { trackBSShared } from '../../../shared/utils/analytics';
import type { BSResult } from '../hooks/useBSScorer';
import { formatShareText } from '../utils/formatShareText';
import './share-button.css';

interface ShareButtonProps {
  result: BSResult;
}

/**
 * ShareButton — copies pre-formatted BS result to clipboard (FR12).
 */
export function ShareButton({ result }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const timeout = useTimeout();

  const handleShare = useCallback(async () => {
    const text = formatShareText(result);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
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
      trackBSShared();
    } catch {
      // Silently fail per UX spec
    }
  }, [result, timeout]);

  return (
    <>
      <button
        className={`share-button${copied ? ' share-button--success' : ''}`}
        onClick={handleShare}
        type="button"
        aria-label="Chia sẻ kết quả"
      >
        {copied ? '✓ Đã copy' : '📤 Chia sẻ'}
      </button>
      <Toast
        message="Đã copy kết quả! 📋"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </>
  );
}
