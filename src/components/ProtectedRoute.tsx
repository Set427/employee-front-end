import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProtectedRouteProps{
    children:React.ReactNode;
}



export default function ProtectedRoute({children}:ProtectedRouteProps){

    const [isValid, setIsValid]= useState<boolean | null>(null);
    useEffect(()=>{

        const validateToken = async () =>{
            const token=localStorage.getItem("token");
            if (!token){
                setIsValid(false);
                return;
            }

            try{

                const res=await axios.get("http://localhost:8080/api/auth/validate", {
                    headers:{
                        Authorization: `Bearer ${token}`,

                    },

                });

                if(res.status == 200){
                    setIsValid(true);
                } else{
                    setIsValid(false);
                }
            }catch(err){
                setIsValid(false);
            }
        };

        validateToken();
    },[]);

    if(isValid===null){

        return <div className="flex h-screen items-center justify-center">Verificare autentificare ... </div>;

    }

    if(!isValid){
        return <Navigate to="/login" replace />

    }

    return <>{children}</>



}