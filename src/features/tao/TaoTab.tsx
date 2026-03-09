import { useState, useEffect, useRef, useCallback } from 'react';
import { usePersistedState } from '../../shared/hooks/usePersistedState';
import { SITUATIONS } from '../../data/situations';
import { RECIPIENTS } from '../../data/recipients';
import type { ToneLevel } from '../../data/types';
import { GlassCard } from '../../shared/components/GlassCard';
import { SituationPicker } from './components/SituationPicker';
import { RecipientPicker } from './components/RecipientPicker';
import { ToneSlider } from './components/ToneSlider';
import { ExcuseResult } from './components/ExcuseResult';
import { CopyButton } from './components/CopyButton';
import { RegenerateButton } from './components/RegenerateButton';
import { useExcuseGenerator } from './hooks/useExcuseGenerator';
import { useTimeout } from '../../shared/hooks/useTimeout';
import { trackExcuseGenerated } from '../../shared/utils/analytics';
import './tao-tab.css';

/**
 * TaoTab — complete TẠO (Excuse Generator) page.
 * Wires: SituationPicker + RecipientPicker + ToneSlider + Generate button
 *        → ExcuseResult + CopyButton + RegenerateButton
 */
export function TaoTab() {
  const [situationId, setSituationId] = usePersistedState(
    'uoa:situationId',
    SITUATIONS[0].id,
  );
  const [recipientId, setRecipientId] = usePersistedState(
    'uoa:recipientId',
    RECIPIENTS[0].id,
  );
  const [tone, setTone] = usePersistedState<ToneLevel>('uoa:tone', 3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useTimeout();

  const handleDropdownOpenChange = useCallback((open: boolean) => {
    setIsDropdownOpen(open);
  }, []);

  const { excuse, generate } = useExcuseGenerator({
    situationId,
    recipientId,
    tone,
  });

  // Auto-generate on first render
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGenerate() {
    generate();
    trackExcuseGenerated({
      situation: situationId,
      recipient: recipientId,
      tone,
    });
    // Auto-scroll to result
    scrollTimeout.set(() => {
      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 50);
  }

  return (
    <div
      className={`tao-tab${isDropdownOpen ? ' tao-tab--dropdown-open' : ''}`}
    >
      <GlassCard>
        <div className="tao-tab__pickers">
          <SituationPicker
            value={situationId}
            onChange={setSituationId}
            situations={[...SITUATIONS]}
            onOpenChange={handleDropdownOpenChange}
          />
          <RecipientPicker
            value={recipientId}
            onChange={setRecipientId}
            recipients={[...RECIPIENTS]}
          />
        </div>
        <hr className="tao-tab__divider" />
        <ToneSlider value={tone} onChange={setTone} />
      </GlassCard>

      <button
        className="tao-tab__generate-btn"
        onClick={handleGenerate}
        type="button"
      >
        <span className="tao-tab__generate-sparkle">✨</span> Tạo Excuse
      </button>

      <div ref={resultRef}>
        <GlassCard>
          <ExcuseResult excuse={excuse} />
          {excuse && (
            <div className="tao-tab__actions">
              <CopyButton text={excuse} />
              <RegenerateButton onRegenerate={handleGenerate} />
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
