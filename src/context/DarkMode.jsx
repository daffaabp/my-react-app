import React, { createContext, useState } from 'react'

const DarkModeContext = createContext();

const DarkModeContextProvider = ({children}) => {
   // UseContext digunakan untuk mengambil sebuah state yang di definisikan di paling luar, tapi kita bisa ambil secara langsung tanpa props
   const [isDarkMode, setIsDarkMode] = useState(false);

   return (
      <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
         {children}
      </DarkModeContext.Provider>
   );
};

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;


