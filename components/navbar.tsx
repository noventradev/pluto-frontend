'use client';

import { LogOut, User } from 'lucide-react';
import { ModeToggle } from './ui/mode-toggle';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/sign-in');
  };

  return (
    <header className="border-border flex h-16 items-center justify-end border-b px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm">{user?.name || 'User'}</p>
          <User className="size-4" />
        </div>
        <button
          onClick={handleLogout}
          className="text-muted hover:text-foreground cursor-pointer transition-colors"
          title="Logout"
        >
          <LogOut className="size-4" />
        </button>
        <ModeToggle />
      </div>
    </header>
  );
};
