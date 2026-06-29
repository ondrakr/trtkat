import type { MouseEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollToId } from '../lib/navigation';

type NavAnchorProps = {
  id: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

export function NavAnchor({ id, children, className, onNavigate }: NavAnchorProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (pathname === '/') {
      e.preventDefault();
      smoothScrollToId(id);
      window.history.pushState(null, '', `#${id}`);
      return;
    }

    e.preventDefault();
    navigate({ pathname: '/', hash: id });
  }

  return (
    <a href={`/#${id}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
