import './regenerate-button.css';

interface RegenerateButtonProps {
  onRegenerate: () => void;
  disabled?: boolean;
}

/**
 * RegenerateButton — triggers new excuse with same params (FR6, FR19).
 */
export function RegenerateButton({
  onRegenerate,
  disabled = false,
}: RegenerateButtonProps) {
  return (
    <button
      className="regenerate-button"
      onClick={onRegenerate}
      type="button"
      aria-label="Tạo lại excuse"
      disabled={disabled}
    >
      🔄 Tạo lại
    </button>
  );
}
