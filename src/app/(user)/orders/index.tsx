import { Text, FlatList, ActivityIndicator } from 'react-native';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/api/orders';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  console.log(orders);

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
