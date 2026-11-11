export const PlayIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
);
export const PauseIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z" />
  </svg>
);
export const SoundOnIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" stroke="none" />
    <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" strokeLinecap="round" />
  </svg>
);
export const SoundOffIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" stroke="none" />
    <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" strokeLinecap="round" />
  </svg>
);
export const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M6 18L18 6M8 6h10v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
  </svg>
);
