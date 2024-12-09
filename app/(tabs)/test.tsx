import { useUser } from '@/app/context/UserContext';
import { View, Text } from 'react-native';
import { UserProvider } from '@/app/context/UserContext'; 

export default function ProfileTest() {
  const { user } = useUser();
  // console.log('Usuario logueado:', user);
  return (
    
        <View>
            <Text>Usuario en contexto: {user ? JSON.stringify(user) : 'No hay usuario'}</Text>
            
        </View>
    
  );
}
