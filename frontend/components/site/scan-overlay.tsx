export function ScanOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan-line" />
    </div>
  );
}
