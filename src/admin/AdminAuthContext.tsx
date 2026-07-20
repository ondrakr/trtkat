import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { bootstrapAdminAccount } from '../lib/bootstrapAdmin';

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

    // App profiles na Hetzneru nemají sloupec role — fallback přes is_moderator.
    const { data, error } = await supabase
      .from('profiles')
      .select('is_moderator')
      .eq('id', userId)
      .maybeSingle();
    setIsAdmin(!error && data?.is_moderator === true);
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

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      const alreadyExists =
        signUpError.message.toLowerCase().includes('already') ||
        signUpError.message.toLowerCase().includes('registered');
      if (!alreadyExists) {
        return { error: signUpError.message };
      }
    }

    let session = signUpData.session;
    if (!session) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        const bootstrap = await bootstrapAdminAccount();
        if (bootstrap.ok === false) {
          return { error: signInError.message };
        }
        const retry = await supabase.auth.signInWithPassword({ email, password });
        if (retry.error) {
          return { error: retry.error.message };
        }
        session = retry.data.session;
      } else {
        session = signInData.session;
      }
    }

    if (!session) {
      return { error: 'Nepodařilo se vytvořit přihlášení. Zkus to znovu.' };
    }

    const { error: insertError } = await supabase
      .from('web_admin_users')
      .insert({ user_id: session.user.id });

    if (insertError && insertError.code !== '23505') {
      const bootstrap = await bootstrapAdminAccount();
      if (bootstrap.ok === false) {
        return { error: insertError.message || bootstrap.error };
      }
    }

    setNeedsSetup(false);
    return {};
  }, []);

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
