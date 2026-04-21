/** Activate Tally iframes (lazy src from data-tally-src). */
export function loadTallyEmbeds(): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { Tally?: { loadEmbeds: () => void } };
  if (w.Tally) {
    w.Tally.loadEmbeds();
    return;
  }
  document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((el) => {
    const iframeEl = el as HTMLIFrameElement;
    const src = iframeEl.getAttribute("data-tally-src");
    if (src) iframeEl.setAttribute("src", src);
  });
}
