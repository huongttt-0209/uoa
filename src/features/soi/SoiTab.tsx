import { useEffect, useRef } from 'react';
import { usePersistedState } from '../../shared/hooks/usePersistedState';
import { GlassCard } from '../../shared/components/GlassCard';
import { TextInput } from './components/TextInput';
import { BSGauge } from './components/BSGauge';
import { VerdictBadge } from './components/VerdictBadge';
import { BSBreakdown } from './components/BSBreakdown';
import { ShareButton } from './components/ShareButton';
import { useBSScorer } from './hooks/useBSScorer';
import { useTimeout } from '../../shared/hooks/useTimeout';
import { trackBSDetected } from '../../shared/utils/analytics';
import './soi-tab.css';

const MIN_LENGTH = 10;

/**
 * SoiTab — complete SOI (BS Detector) page.
 * Wires: TextInput → useBSScorer (auto) → BSGauge + VerdictBadge + BSBreakdown + ShareButton
 */
export function SoiTab() {
  const [text, setText] = usePersistedState('uoa:soiText', '');
  const result = useBSScorer(text);
  const lastTrackedRef = useRef<string | null>(null);
  const analyticsDebounce = useTimeout();

  const isValid = text.trim().length >= MIN_LENGTH;

  // Track analytics when result changes (debounced 500ms to avoid per-keystroke spam)
  useEffect(() => {
    if (result && isValid && lastTrackedRef.current !== text) {
      analyticsDebounce.set(() => {
        trackBSDetected({ score: result.score, verdict: result.verdict.label });
        lastTrackedRef.current = text;
      }, 500);
    }
  }, [result, text, isValid, analyticsDebounce]);

  return (
    <div className="soi-tab">
      <GlassCard>
        <TextInput value={text} onChange={setText} />
      </GlassCard>

      {isValid && result ? (
        <>
          <GlassCard>
            <div className="soi-tab__result">
              <BSGauge score={result.score} />
              <VerdictBadge verdict={result.verdict} />
            </div>
          </GlassCard>

          <GlassCard>
            <BSBreakdown factors={result.factors} />
          </GlassCard>

          <div className="soi-tab__share">
            <ShareButton result={result} />
          </div>
        </>
      ) : (
        <div className="soi-tab__empty">
          <div className="soi-tab__empty-icon">🔍</div>
          <p className="soi-tab__empty-text">
            Nhập lý do vào ô trên để phân tích mức độ BS
          </p>
        </div>
      )}
    </div>
  );
}
