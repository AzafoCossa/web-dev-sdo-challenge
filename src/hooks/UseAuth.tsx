import React, { useState, useEffect, useRef } from 'react';
import keycloak from "keycloak-js";

const env = import.meta.env;

const UseAuth = () => {
    const isRun = useRef(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (isRun.current) return;

    isRun.current = true;
    
    useEffect(() => {
        const kc = new keycloak({
            url: env.VITE_KEYCLOAK_URL,
            clientId: env.VITE_KEYCLOAK_CLIENT_ID,
            realm: env.VITE_KEYCLOAK_REALM,
        });


        kc.init({
            onLoad: "login-required",
            checkLoginIframe: true,
            pkceMethod: "S256",
        }).then((authenticated) => setIsAuthenticated(authenticated));
    }, [])

    return isAuthenticated;
}

export default UseAuth;