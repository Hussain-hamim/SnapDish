import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const showImage = async () => {
      try {
        supabase.storage
          .from('product-images')
          .download(path!)
          .then(({ data }) => {
            const fr = new FileReader();
            fr.readAsDataURL(data!);
            fr.onload = () => {
              setImage(fr.result as string);
            };
          });
      } catch (error) {
        console.log(error);
      }
    };

    showImage();
  }, [path]);

  if (!image) {
  }

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
