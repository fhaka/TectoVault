"use client";

import * as React from "react";

/**
 * True while the visitor scrolls down through the page, so floating buttons
 * can step out of the way of the text. They come back on any scroll up, near
 * the top, and at the bottom of the page.
 */
export function useHideOnScroll(threshold = 8) {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const nearTop = y < 160;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 120;
      if (nearTop || nearBottom) setHidden(false);
      else if (y > lastY + threshold) setHidden(true);
      else if (y < lastY - threshold) setHidden(false);
      if (Math.abs(y - lastY) > threshold) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return hidden;
}
