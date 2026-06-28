import { Instagram, Facebook } from 'lucide-react';
import { SOCIAL_LINKS, SOCIAL_HANDLES } from '../config/social';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.8.11V9.01a6.27 6.27 0 0 0-.8-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
    </svg>
  );
}

const items = [
  { href: SOCIAL_LINKS.instagram, label: SOCIAL_HANDLES.instagram, Icon: Instagram },
  { href: SOCIAL_LINKS.facebook, label: SOCIAL_HANDLES.facebook, Icon: Facebook },
  { href: SOCIAL_LINKS.tiktok, label: SOCIAL_HANDLES.tiktok, Icon: TikTokIcon },
];

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
