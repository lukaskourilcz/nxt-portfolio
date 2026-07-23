"use client";

import { useEffect, useRef } from "react";

/**
 * Animated scroll preview of a deployed project. Renders a muted, looping
 * `<video>` that only plays while it is on screen, so a page full of previews
 * never decodes more than the visible ones. The first frame is baked into the
 * `poster`, so the server-rendered markup shows a still image immediately and
 * there is no layout shift or download until the clip actually plays.
 *
 * Respects `prefers-reduced-motion`: reduced-motion visitors keep the still
 * poster and the clip never autoplays.
 */
export function ProjectPreview({
  slug,
  alt,
  className,
}: {
  slug: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;

    const bind = () => {
      observer?.disconnect();
      observer = null;
      if (reduceMotion.matches) {
        video.pause();
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.3 },
      );
      observer.observe(video);
    };

    bind();
    reduceMotion.addEventListener("change", bind);
    return () => {
      observer?.disconnect();
      reduceMotion.removeEventListener("change", bind);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={`/previews/${slug}/preview-poster.png`}
      aria-label={alt}
      className={className}
    >
      <source src={`/previews/${slug}/preview.webm`} type="video/webm" />
      <source src={`/previews/${slug}/preview.mp4`} type="video/mp4" />
    </video>
  );
}
