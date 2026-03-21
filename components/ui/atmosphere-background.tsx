/**
 * Fixed two-layer atmosphere background.
 *
 * Layer 1 — A real photo, heavily darkened + blurred via CSS,
 *           so the colour temperature comes from actual photography
 *           rather than generic gradient blobs.
 *
 * Layer 2 — Animated film-grain texture at visible (but subtle) opacity.
 *           Slow step-based drift so it feels like film stock, not digital noise.
 *
 * Both layers are position:fixed → content scrolls over them.
 * No JS at runtime. Pure CSS composition.
 */

interface AtmosphereBackgroundProps {
  /** Source photo for the colour atmosphere. A small thumbnail works fine — blur hides detail. */
  photoUrl: string;
  /** How dark the overlay is (0–100). Higher = more readable, less visible photo. Default 82. */
  darkness?: number;
}

export function AtmosphereBackground({ photoUrl, darkness = 82 }: AtmosphereBackgroundProps) {
  // Encode spaces and special chars for CSS url()
  const encodedUrl = encodeURI(photoUrl);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      {/* Layer 1: photo atmosphere — the organic colour base */}
      <div
        className="absolute inset-0 scale-125 blur-[60px] saturate-50 will-change-transform"
        style={{
          backgroundImage: `url("${encodedUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Darkness overlay — keeps text readable */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(10, 10, 10, ${darkness / 100})` }}
      />

      {/* Layer 2: static film grain */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'g\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'512\' height=\'512\' filter=\'url(%23g)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
