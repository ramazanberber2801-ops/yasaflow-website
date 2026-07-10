type LogoProps = {
  variant?: 'horizontal' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
};

export function Logo({ variant = 'horizontal', theme = 'light', className = '' }: LogoProps) {
  const wordmarkBase = 'text-[1.05rem] font-semibold uppercase tracking-[0.08em] leading-none';
  const firstPart = theme === 'dark' ? 'text-white' : 'text-[#071F52]';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Yasaflow">
      <img
        src="/branding/yasaflow-icon.png"
        alt=""
        aria-hidden="true"
        className="h-9 w-auto shrink-0 object-contain"
      />
      {variant === 'horizontal' && (
        <span className={wordmarkBase} aria-hidden="true">
          <span className={firstPart}>Yasa</span>
          <span className="bg-gradient-to-r from-[#0972ED] to-[#14B8A6] bg-clip-text text-transparent">flow</span>
        </span>
      )}
    </span>
  );
}
