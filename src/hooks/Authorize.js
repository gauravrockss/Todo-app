import React, { createContext, useContext, useEffect, useState } from 'react';
import Loading from './../pages/unauthorized/Loading';
import Login from './../pages/unauthorized/Login';
import { getCookie } from '../utilities/cookies';
import axios from 'axios';

const authorizeContext = createContext();

const AuthorizationProvider = ({ children }) => {
    const [content, setContent] = useState(<Loading />);
    const [user, setUser] = useState({});

    const authorize = (loggedIn, cb) => {
        if (loggedIn) {
            setContent(children);
        } else {
            setContent(<Login />);
        }
        if (typeof cb === 'function') cb(setUser);
    };

    useEffect(() => {
        (async () => {
            try {
                const role = getCookie('role');
                if (!role) throw new Error('role not found');
                const response = await axios.get(`${role}/profile`);
                const user = response.data.user;

                authorize(true, setUser => setUser(user));
            } catch (err) {
                authorize(false);
            }
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <authorizeContext.Provider value={{ authorize, setUser, user }}>
            {content}
        </authorizeContext.Provider>
    );
};

const useAuthorize = () => useContext(authorizeContext).authorize;
const useUser = () => useContext(authorizeContext).user;
const useSetUser = () => useContext(authorizeContext).setUser;

export default AuthorizationProvider;
export { useAuthorize, useUser, useSetUser };
