import LoginForm from "@/components/LoginForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate=useNavigate();
    

    useEffect(()=>{
        const token= localStorage.getItem("token");

        if(!token){

            return;
        }


        axios
            .get("http://localhost:8080/api/auth/validate", {
                headers: { Authorization : `Bearer ${token}`},
            })
            .then(()=>{
                navigate("/home");
            })
            .catch(()=>{
                localStorage.removeItem("token")
            });

    }, [navigate])


  return (
    <div className="flex h-screen items-center justify-center bg-muted/30">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
