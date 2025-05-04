import { ActivityIndicator, FlatList } from 'react-native';
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/api/products';
import { Text } from 'react-native';
import Button from '@/components/Button';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen() {
  const { error, data: products, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator size='large' color={'lightblue'} />;
  }
  if (error) {
    return <Text>Failed fetching products</Text>;
  }

  return (
    <>
      <Link href='/(admin)/menu/create' asChild>
        <Button
          text='Add New Dish'
          icon={<Ionicons name='add' size={24} color={'white'} />}
        />
      </Link>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 12 }}
        columnWrapperStyle={{ gap: 5 }}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}
