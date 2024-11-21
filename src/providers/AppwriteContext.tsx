// // AppwriteContext.tsx
// import React, {createContext, ReactNode, useContext, useState} from 'react';
// import {Client, Account, Models, ID} from 'react-native-appwrite';

// // Define the type for the Appwrite client
// type AppwriteContextType = {
//   client: Client;
//   register: (email: string, password: string, name: string) => Promise<void>;
//   login: (email: string, password: string) => Promise<void>;
//   loggedInUser: Models.User<Models.Preferences> | null;
// } | null;

// // Create the Appwrite context
// const AppwriteContext = createContext<AppwriteContextType>(null);

// // Define the provider props
// interface AppwriteProviderProps {
//   children: ReactNode;
// }
// let client: Client;
// let account: Account;
// // AppwriteProvider component
// client = new Client();
// client
//   .setEndpoint('https://cloud.appwrite.io/v1')
//   .setProject('672fe839003472d0fc2c') // Your Project ID
//   .setPlatform('org.reactjs.native.example.HelpForHomeless'); // Your package name / bundle identifier

// account = new Account(client);
// export const AppwriteProvider: React.FC<AppwriteProviderProps> = ({
//   children,
// }) => {
//   const [loggedInUser, setLoggedInUser] =
//     useState<Models.User<Models.Preferences> | null>(null);

//   async function login(email: string, password: string) {
//     await account.createEmailPasswordSession(email, password);
//     setLoggedInUser(await account.get());
//   }

//   async function register(email: string, password: string, name: string) {
//     await account.create(ID.unique(), email, password, name);
//     await login(email, password);
//     setLoggedInUser(await account.get());
//   }
//   return (
//     <AppwriteContext.Provider value={{client, register, login, loggedInUser}}>
//       {children}
//     </AppwriteContext.Provider>
//   );
// };

// // Custom hook to use the Appwrite client
// export const useAppwriteContext = (): AppwriteContextType => {
//   const context = useContext(AppwriteContext);
//   if (!context) {
//     throw new Error('useAppwrite must be used within an AppwriteProvider');
//   }
//   return context;
// };
