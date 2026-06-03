/**
 * scrollStage — shared scroll-driven stage utility.
 *
 * Both PortfolioProject and CasaEmpenoProject use near-identical logic:
 * a pinned element scrolls through three stages determined by progress
 * thresholds of 0.34 and 0.67. This utility extracts that logic so each
 * component only supplies its own DOM selectors.
 */

export interface ScrollStageConfig {
  /** The pinned container whose height drives the scroll progress. */
  pinEl: Element;

  /** Step elements — each gets `is-active` (current) and `is-done` (past). */
  stepEls: Element[];

  /**
   * Panel elements — each gets `is-active` (current only, no `is-done`).
   * Pass an empty array if the component has no panel elements.
   */
  panelEls?: Element[];

  /**
   * Optional stack element that receives a `data-stage` attribute with the
   * current stage index string. Used by CasaEmpenoProject.
   */
  stackEl?: HTMLElement | null;

  /**
   * Optional rail fill element. When provided, `--prog` is updated as a
   * CSS custom property with the scroll progress percentage. Used by
   * PortfolioProject.
   */
  railFillEl?: HTMLElement | null;

  /**
   * Lower threshold for stage 1 (default: 0.34).
   */
  threshold1?: number;

  /**
   * Upper threshold for stage 2 (default: 0.67).
   */
  threshold2?: number;

  /**
   * Mobile breakpoint in px. The scroll listener is not attached when the
   * viewport matches `(max-width: {mobileBreakpoint}px)`. Default: 860.
   */
  mobileBreakpoint?: number;
}

/**
 * Initialise scroll-stage behaviour for a project section.
 *
 * The function immediately runs one update pass to reflect the current scroll
 * position, then attaches a passive scroll listener. No teardown handle is
 * returned — the listener is intentionally kept alive for the page lifetime.
 *
 * The function is a no-op on viewports at or below `mobileBreakpoint`.
 */
export function initScrollStage(config: ScrollStageConfig): void {
  const {
    pinEl,
    stepEls,
    panelEls = [],
    stackEl = null,
    railFillEl = null,
    threshold1 = 0.34,
    threshold2 = 0.67,
    mobileBreakpoint = 860,
  } = config;

  if (window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches) {
    return;
  }

  function update(): void {
    const r = pinEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = r.height - vh;
    const passed = Math.min(Math.max(-r.top, 0), total);
    const p = total > 0 ? passed / total : 0;

    let stage = 0;
    if (p >= threshold2) stage = 2;
    else if (p >= threshold1) stage = 1;

    stepEls.forEach((el, idx) => {
      el.classList.toggle('is-active', idx === stage);
      el.classList.toggle('is-done', idx < stage);
    });

    panelEls.forEach((el, idx) => {
      el.classList.toggle('is-active', idx === stage);
    });

    if (stackEl) {
      stackEl.dataset.stage = String(stage);
    }

    if (railFillEl) {
      const fill = Math.min(100, Math.max(6, p * 100));
      railFillEl.style.setProperty('--prog', fill.toFixed(1) + '%');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}
