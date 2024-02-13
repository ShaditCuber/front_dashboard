import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUsuario } from "@context/AuthContext";
import { toast } from 'sonner';
import "../App.css";
import { useRegistro } from "@queries/AuthQueries/queryLogin";

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);

    const { handleSubmit, register, reset } = useForm();

    const { loginUsuario } = useUsuario();

    useEffect(() => {
        reset(isLogin ? { emailL: "", passwordL: "" } : { name: "", email: "", password: "", confirmPassword: "" });
    }, [isLogin, reset]);

   
    const onSubmit = async (data) => {
        console.log(data)
        if (isLogin) {
            const result = {
                email: data.emailL,
                password: data.passwordL
            }
            loginUsuario(result);
            toast.success('Bienvenido!');
        } else {
            // Lógica de registro
            if (data.password !== data.confirmPassword) {
                toast.error('Las contraseñas no coinciden');
                return;
            }
            // Aquí reemplazarías `useRegistro` con tu función de registro
            const result = await useRegistro(data);
            console.log(result)
            if (result.message=='Usuario registrado!') {
                toast.success(result.message);
                setIsLogin(true);
            } else {
                toast.error(result.message);
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };


    return (
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input className="toggle" type="checkbox" onClick={toggleForm} checked={!isLogin} />
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                            <div className="title">Login</div>
                            <form className="flip-card__form" onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("emailL")} type="email" placeholder="Correo" className="flip-card__input" />
                                <input {...register("passwordL")} type="password" placeholder="Contraseña" className="flip-card__input" />
                                <button className="flip-card__btn">Vamos!</button>
                            </form>
                        </div>
                        <div className="flip-card__back">
                            <div className="title">Registro</div>
                            <form className="flip-card__form" onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("name")} type="text" placeholder="Nombre" className="flip-card__input" />
                                <input {...register("email")} type="email" placeholder="Correo" className="flip-card__input" />
                                <input {...register("password")} type="password" placeholder="Contraseña" className="flip-card__input" />
                                <input {...register("confirmPassword")} type="password" placeholder="Confirmar contraseña" className="flip-card__input" />
                                <button className="flip-card__btn">Confirmar</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};
export default Login;