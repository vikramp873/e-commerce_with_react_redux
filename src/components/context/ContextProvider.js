import React, { createContext, useState } from 'react';

export const newData = createContext()

const ContextProvider = ({ children }) => {

   const [feature, setFeature] = useState("")
   return (
      <>

         <newData.Provider value={{ feature, setFeature }} >
            {children}
         </newData.Provider>
      </>
   )
}

export default ContextProvider