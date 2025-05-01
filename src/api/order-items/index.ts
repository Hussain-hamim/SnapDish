import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { InsertTables } from '@/types';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { data: newOrderItems, error } = await supabase
        .from('order_items')
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrderItems;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['order_items'] });
    },
  });
};
