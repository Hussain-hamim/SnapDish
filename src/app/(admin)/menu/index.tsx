import { FlatList } from 'react-native';
// import products from '@assets/data/products';
import products from '../../../../assets/data/products';
import ProductListItem from '@/components/ProductListItem';

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
      columnWrapperStyle={{ gap: 5 }}
    />
  );
}
