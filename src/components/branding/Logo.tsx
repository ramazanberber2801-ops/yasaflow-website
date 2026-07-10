type LogoProps = {
  variant?: 'horizontal' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
};

export function Logo({ variant = 'horizontal', theme = 'light', className = '' }: LogoProps) {
  const foreground = theme === 'dark' ? 'text-white' : 'text-slate-950';
  return (
    <span className={`inline-flex items-center gap-2.5 ${foreground} ${className}`} aria-label="Yasaflow">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2185DC] text-sm font-bold text-white shadow-[0_8px_24px_rgba(33,133,220,0.28)]">Y</span>
      {variant === 'horizontal' && <span className="text-lg font-semibold tracking-[-0.03em]">Yasaflow</span>}
    </span>
  );
}
