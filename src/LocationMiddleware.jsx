import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import loginService from './services/login-service';

const LocationMiddleware = () => {
    // const { afterOauthLoginSuccess } = useLoginAPI()
    const navigate = useNavigate()
    const location = useLocation();

    
    useEffect(() => {
        // console.log(location.pathname)
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        if (location.pathname === '/code' && code != null) {
            console.log(code)
            loginService.getTokens(code).then(() => {
                navigate("../home", {replace: true})
            })
            // afterOauthLoginSuccess().then(() => {
            //     console.log("HOME")
            //     navigate('/home', {replace: true})
            // }).catch(error => console.error("Error in afterOauthLoginSuccess:", error));;
        } else {
            console.log("No code was provided")
            return
        }
    }, [location]);

    return null; // This component doesn't render anything
};

export default LocationMiddleware;