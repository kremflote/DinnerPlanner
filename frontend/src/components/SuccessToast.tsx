import { useEffect } from "react";
import { toastStyles, type SiteTheme } from "../styles/appStyles";

type SuccessToastProps = {
  closeLabel: string;
  message: string;
  theme: SiteTheme;
  durationMs?: number;
  onClose: () => void;
};

function SuccessToast({
  durationMs = 2600,
  closeLabel,
  message,
  theme,
  onClose,
}: SuccessToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timeoutId);
  }, [durationMs, onClose]);

  return (
    <div className={toastStyles.viewport} role="status" aria-live="polite">
      <div className={toastStyles.success(theme)}>
        <span>{message}</span>
        <button
          aria-label={closeLabel}
          className={toastStyles.closeButton(theme)}
          type="button"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default SuccessToast;
