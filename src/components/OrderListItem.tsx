import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Tables } from '../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link, useSegments } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<'orders'>;
};

const statusMap = {
  new: {
    icon: 'fiber-new',
    color: '#1E90FF',
    bg: 'rgba(30, 144, 255, 0.1)',
    label: 'New',
  },
  cooking: {
    icon: 'local-fire-department',
    color: '#FFA500',
    bg: 'rgba(255, 165, 0, 0.1)',
    label: 'Cooking',
  },
  delivering: {
    icon: 'delivery-dining',
    color: '#00BFFF',
    bg: 'rgba(0, 191, 255, 0.1)',
    label: 'Delivering',
  },
  delivered: {
    icon: 'check-circle',
    color: '#32CD32',
    bg: 'rgba(50, 205, 50, 0.1)',
    label: 'Delivered',
  },
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  // Normalize status string to lowercase and trim
  const rawStatus = order.status?.toLowerCase().trim();
  const statusInfo = statusMap[rawStatus as keyof typeof statusMap];

  // If not found, fallback to generic badge
  const icon = statusInfo?.icon ?? 'help-outline';
  const color = statusInfo?.color ?? '#999';
  const bg = statusInfo?.bg ?? 'rgba(200, 200, 200, 0.15)';
  const label = statusInfo?.label ?? rawStatus ?? 'Unknown';

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: bg }]}>
          <MaterialIcons
            name={icon}
            size={16}
            color={color}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.badgeText, { color }]}>{label}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: '#777',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default OrderListItem;
