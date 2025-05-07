import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useOrdersInsertSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
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
      channel.unsubscribe();
    };
  }, [queryClient]);
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
