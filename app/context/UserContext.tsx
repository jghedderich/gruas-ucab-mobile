import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la estructura del usuario
interface User {
  id: string;
  name: string;
  email: string;
  user: string;
  password: string;
  company: string;
  truck: string;
  placa: string;
  dni: string;
  phone: string;
  status: string;
}

interface UserContextType {
  user: User | null; // El usuario autenticado o null si no hay sesión activa
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Función para actualizar el usuario
}

// Crea el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export default UserProvider;



// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Define la estructura del usuario
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   user: string;
//   password: string;
//   company: string;
//   truck: string;
//   placa: string;
//   dni: string;
//   phone: string;
//   status: string;
// }


// interface UserContextType {
//   user: User | null; // El usuario autenticado o null si no hay sesión activa
//   setUser: React.Dispatch<React.SetStateAction<User | null>>; // Función para actualizar el usuario
// }

// // Crea el contexto
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Proveedor del contexto
// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Hook para usar el contexto
// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser debe ser usado dentro de un UserProvider');
//   }
//   return context;
// };

// export default UserProvider;