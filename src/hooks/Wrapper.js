import React, { createContext, useState } from 'react';

// Create a new context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
    // Define your global state variables here
    const [balance, setbalance] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Define any functions or methods to update the state here
    const AddBalance = (newData) => {
        setbalance(balance + newData);
    };
    const decreaseBalance = (newData) => {
        console.log(newData)
        setbalance(balance- newData);
    }
    



    // Provide the state and functions to the children components
    return (
        <GlobalContext.Provider value={{ balance, AddBalance,decreaseBalance,loggedInUser,setLoggedInUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };