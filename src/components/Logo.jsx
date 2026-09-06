export default function Logo({ size = 36, className = '', glow = true }) {
  return (
    <span
      className={`group/logo relative inline-flex shrink-0 items-center justify-center rounded-[0.65em] transition-transform duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size,
        background: 'linear-gradient(135deg, #6ce8db 0%, #4ce0d2 42%, #7c5cfc 100%)',
        boxShadow: glow
          ? '0 0 0.6em rgba(76,224,210,0.35), 0 0.08em 0.3em rgba(0,0,0,0.35), inset 0 0.04em 0.06em rgba(255,255,255,0.4)'
          : 'inset 0 0.04em 0.06em rgba(255,255,255,0.4)',
      }}
    >
      {/* glass highlight */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[0.65em] opacity-70"
        style={{
          background: 'linear-gradient(155deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%)',
        }}
      />
      {/* hairline edge */}
      <span className="pointer-events-none absolute inset-0 rounded-[0.65em] ring-1 ring-inset ring-white/25" />

      <span
        className="relative font-display font-bold leading-none text-void"
        style={{ fontSize: '0.42em', letterSpacing: '-0.02em' }}
      >
        NX
      </span>
    </span>
  );
}
