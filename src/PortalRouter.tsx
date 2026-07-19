import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import CustomerPortal from './CustomerPortal';
import CustomerPortalV2 from './CustomerPortalV2';
import { supabase } from './lib/supabase';

const OWNER_ROLES = new Set(['owner', 'super_admin', 'superadmin']);

type PortalState = {
  loading: boolean;
  owner: boolean;
  userId: string | null;
};

export default function PortalRouter() {
  const [state, setState] = useState<PortalState>({ loading: true, owner: false, userId: null });

  useEffect(() => {
    let active = true;

    const resolvePortal = async (userId?: string | null) => {
      if (!supabase) {
        if (active) setState({ loading: false, owner: false, userId: null });
        return;
      }

      let resolvedUserId = userId ?? null;
      if (userId === undefined) {
        const { data: { session } } = await supabase.auth.getSession();
        resolvedUserId = session?.user.id ?? null;
      }

      if (!resolvedUserId) {
        if (active) setState({ loading: false, owner: false, userId: null });
        return;
      }

      if (active) setState(current => ({ ...current, loading: true, userId: resolvedUserId }));

      const { data, error } = await supabase
        .from('admins')
        .select('role')
        .eq('auth_user_id', resolvedUserId)
        .maybeSingle();

      if (!active) return;
      setState({
        loading: false,
        owner: !error && OWNER_ROLES.has(String(data?.role || '').toLowerCase()),
        userId: resolvedUserId,
      });
    };

    void resolvePortal();

    const { data: authListener } = supabase?.auth.onAuthStateChange((_event, session) => {
      void resolvePortal(session?.user.id ?? null);
    }) ?? { data: { subscription: null } };

    return () => {
      active = false;
      authListener.subscription?.unsubscribe();
    };
  }, []);

  if (state.loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={30}/></div>;
  }

  return state.owner
    ? <CustomerPortal key={`owner-${state.userId ?? 'signed-out'}`} />
    : <CustomerPortalV2 key={`customer-${state.userId ?? 'signed-out'}`} />;
}
