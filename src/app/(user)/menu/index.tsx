import { useProductList } from '@/api/products';
import ProductListItem from '@components/ProductListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';

export default function MenuScreen() {
  const { error, data, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size='large' color={'orchid'} />;
  }
  if (error) {
    return <Text>Failed fetching products</Text>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
      columnWrapperStyle={{ gap: 5 }}
    />
  );
}
