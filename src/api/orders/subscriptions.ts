import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const ordersInsertSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);
};

export const ordersUpdateSubscription = (id: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['orders', id] });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
