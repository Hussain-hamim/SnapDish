import { ActivityIndicator, FlatList, Text } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export default function MenuScreen() {
  const { error, data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

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
