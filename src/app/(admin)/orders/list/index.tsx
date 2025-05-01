import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload);
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
      )
      .subscribe();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size='large' color={'orchid'} />;
  }
  if (error) {
    return <Text>Failed fetching products</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
