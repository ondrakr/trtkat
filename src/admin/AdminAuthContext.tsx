import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

type AdminAuthState = {
  loading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  configured: boolean;
  needsSetup: boolean | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  setupFirstAdmin: (login: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthState | null>(null);

/** Supabase Auth používá e-mail; „trtkat“ → trtkat@trtkat.cz */
export function normalizeAdminLogin(input: string): string {
  const value = input.trim().toLowerCase();
  if (!value) return value;
  return value.includes('@') ? value : `${value}@trtkat.cz`;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);

  const refreshAdminRole = useCallback(async (userId: string | undefined) => {
    if (!userId || !isSupabaseConfigured) {
      setIsAdmin(false);
      return;
    }
    const supabase = getSupabase();

    const { data: webAdmin } = await supabase
      .from('web_admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (webAdmin) {
      setIsAdmin(true);
      return;
    }

    const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle();
    setIsAdmin(!error && data?.role === 'admin');
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setNeedsSetup(null);
      return;
    }

    const supabase = getSupabase();

    supabase
      .from('web_admin_users')
      .select('*', { count: 'exact', head: true })
      .then(({ count, error }) => {
        if (error) {
          console.warn('[admin] cannot check web_admin_users', error.message);
          setNeedsSetup(null);
        } else {
          setNeedsSetup((count ?? 0) === 0);
        }
      });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      refreshAdminRole(data.session?.user.id).finally(() => setLoading(false));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      refreshAdminRole(nextSession?.user.id);
    });

    return () => sub.subscription.unsubscribe();
  }, [refreshAdminRole]);

  const setupFirstAdmin = useCallback(async (login: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase není nakonfigurováno.' };
    }

    const email = normalizeAdminLogin(login);
    const supabase = getSupabase();

    const { count } = await supabase.from('web_admin_users').select('*', { count: 'exact', head: true });
    if ((count ?? 0) > 0) {
      setNeedsSetup(false);
      return {};
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    let userId = signUpData.user?.id;

    if (signUpError) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        return { error: signInError.message };
      }
      userId = signInData.user?.id;
    }

    if (!userId) {
      return { error: 'Nepodařilo se vytvořit admin účet.' };
    }

    const { error: insertError } = await supabase.from('web_admin_users').insert({ user_id: userId });

    if (insertError && insertError.code !== '23505') {
      return { error: insertError.message };
    }

    if (!signUpData.session) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        return { error: signInError.message };
      }
    }

    setNeedsSetup(false);
    await refreshAdminRole(userId);
    return {};
  }, [refreshAdminRole]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase není nakonfigurováno.' };
    }
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizeAdminLogin(email),
      password,
    });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    await getSupabase().auth.signOut();
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      isAdmin,
      configured: isSupabaseConfigured,
      needsSetup,
      signIn,
      setupFirstAdmin,
      signOut,
    }),
    [loading, session, isAdmin, needsSetup, signIn, setupFirstAdmin, signOut],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
