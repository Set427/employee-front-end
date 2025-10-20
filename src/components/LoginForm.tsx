import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";




export default function LoginForm(){

    const {register, handleSubmit } = useForm();
    const navigate=useNavigate();
    


    
    const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/home")
    } catch (err) {
      alert("Login failed");
    }
  };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-sm mx-auto mt-10">
            <div className="grid gap-2">
                <Label>Email</Label>
                <Input {...register("username", { required: true })} placeholder="setbeleaua" />
            </div>
            <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" {...register("password", { required: true })} placeholder="••••••••" />
            </div>
            <Button type="submit" className="mt-4 w-full">Login</Button>
                </form>


    );

}

