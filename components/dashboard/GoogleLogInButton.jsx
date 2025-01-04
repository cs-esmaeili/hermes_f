'use client'

import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";

const GoogleLogInButton = ({ onSuccess, onError = null }) => {

    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({
        onNonOAuthError: () => {
            setLoading(false);
        },
        onSuccess: async (response) => {
            const token = response?.access_token || response?.credential; // تلاش برای دریافت access_token یا credential

            if (!token) {
                console.error("Token is missing");
                return;
            }

            try {
                const userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    params: { access_token: token },
                });
                setLoading(false);
                onSuccess(userData.data);
            } catch (error) {
                setLoading(false);
                if (onError) onError(error);
            }
        },
        onError: (error) => {
            setLoading(false);
            if (onError) onError(error);
        },
        scope: "email profile",
    });

    return (
        <button className='bg-primary p-2 w-full rounded flex justify-center items-center gap-3'
            onClick={() => {
                setLoading(true);
                login();
            }}>
            {loading ?
                <div className="relative  w-8 h-8">
                    <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                    <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                </div>
                :
                <>
                    <span>
                        ورود با گوگل
                    </span>
                    <FcGoogle className='text-3xl' />
                </>
            }
        </button>
    );
};

export default GoogleLogInButton;