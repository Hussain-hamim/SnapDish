import { useAdminOrderList } from '@/api/orders';
import { ordersInsertSubscription } from '@/api/orders/subscriptions';
import OrderListItem from '@/components/OrderListItem';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Text } from 'react-native';

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  ordersInsertSubscription();

  if (isLoading) {
    return <ActivityIndicator size='large' color={'orchid'} />;
  }
  if (error) {
    return <Text>Failed fetching products</Text>;
  }

  return (
    <>
      <StatusBar style='dark' />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  );
}
