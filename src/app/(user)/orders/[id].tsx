import { useOrderDetails } from '@/api/orders';
import { ordersUpdateSubscription } from '@/api/orders/subscriptions';
import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: order, isLoading, error } = useOrderDetails(id);

  ordersUpdateSubscription(id);

  if (isLoading) {
    return <ActivityIndicator size='large' color={'orchid'} />;
  }
  if (error || !order) {
    return <Text>Failed fetching order</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}
