import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="Home" 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen 
        name="CommentLevel" 
        options={{ title: 'Comment Level' }} 
      />
    </Stack>
  );
}
