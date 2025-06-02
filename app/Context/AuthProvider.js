
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { api_config } from '../config/api_config'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)






    // Load user from AsyncStorage on app start
    useEffect(() => {
        const loadUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setAuth(JSON.parse(userData));
            }
        };
        loadUser();
    }, []);


    const handle_login = async (identifier, password) => {
        try {
            const response = await axios.post(`${api_config.url}/api/auth/local`,
                {
                    identifier: identifier,
                    password: password
                },
                {
                    Headers: {
                        Authorization: `Bearer ${api_config.token}`,
                    }
                })
            const user = response.data
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user)
            return user;
        } catch (error) {
            console.log('Error logging in', error.response?.data || error.message);
        }
    }




    // handle register user
    const handle_register = async (username, email, password) => {
        try {
            const response = await axios.post(`${api_config.url}/api/auth/local/register`,
                {
                    username: username,
                    email: email,
                    password: password
                },
                {
                    Headers: {
                        Authorization: `Bearer ${api_config.token}`,
                    }
                })
            const user = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return user;
        } catch (error) {
            console.log('Error registering', error.response?.data || error.message);
        }
    }



    // logout user
    const handle_logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setAuth(null);
        } catch (error) {
            console.log('Error logging out', error.message);
        }
    };



    return (
        <AuthContext.Provider value={{ auth, handle_login, handle_register , handle_logout }}>
            {children}
        </AuthContext.Provider>


    )
}

export default AuthProvider