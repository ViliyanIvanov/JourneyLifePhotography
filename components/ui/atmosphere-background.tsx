/**
 * Fixed atmosphere background.
 *
 * Previously used a real photo + CSS blur-[60px] + scale-125, which caused
 * full-viewport GPU repaint on every scroll tick across all pages.
 *
 * Now uses CSS radial gradients to achieve the same warm tonal effect
 * at zero GPU filter cost. The darkness overlay keeps it faithful to
 * the original darkness prop contract.
 */

interface AtmosphereBackgroundProps {
  /** Kept for API compatibility — no longer used (gradient replaces the photo blur) */
  photoUrl?: string;
  /** How dark the overlay is (0–100). Higher = more readable. Default 82. */
  darkness?: number;
}

export function AtmosphereBackground({ darkness = 82 }: AtmosphereBackgroundProps) {
  const overlayAlpha = Math.min(1, darkness / 100);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      {/* Warm tonal base — CSS radial gradients, zero filter cost */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(10, 10, 10, ${overlayAlpha})` }}
      />
      {/* Subtle dusty-rose warmth at top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(196,137,138,0.06)_0%,transparent_70%)]" />
      {/* Warm accent corner accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_80%,rgba(196,137,138,0.03)_0%,transparent_60%)]" />

      {/* Static film grain — subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'g\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23g)\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
