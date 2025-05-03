import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageWrapper}>
          <RemoteImage
            path={product.image}
            fallback={defaultPizzaImage}
            style={styles.image}
            resizeMode='cover'
          />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>${product.price}</Text>
          </View>
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {product.name}
        </Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '48%',
    margin: '1%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  priceTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.light.tint,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
