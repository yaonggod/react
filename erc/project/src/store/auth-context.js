import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logoutHandler = () => {
        setIsLoggedIn(false);
    }
    const loginHandler = () => {
        setIsLoggedIn(true);
    }

    useEffect(() => {
        const loginState = localStorage.getItem('isLoggedIn');
        if (loginState === '1') {
          setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;