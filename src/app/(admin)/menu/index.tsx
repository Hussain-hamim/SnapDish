import { ActivityIndicator, FlatList } from 'react-native';
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/api/products';
import { Text } from 'react-native';

export default function MenuScreen() {
  const { error, data: products, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size='large' color={'orchid'} />;
  }
  if (error) {
    return <Text>Failed fetching products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
      columnWrapperStyle={{ gap: 5 }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
