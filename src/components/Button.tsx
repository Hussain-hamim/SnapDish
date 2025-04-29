import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef, ReactNode } from 'react';

type ButtonProps = {
  text: string;
  icon?: ReactNode;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, icon, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        {icon && <View>{icon}</View>}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default Button;
