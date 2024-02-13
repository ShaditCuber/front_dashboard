import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Grid, Card, Button, CardActions } from "@mui/material";
import CustomTextField from "./CustomComponents/CustomTextfield";
import { useIniciarSesion, useRegistro } from "../queries/AuthQueries/queryLogin";
import { toast } from 'sonner';
import SeleccionarPerro from "../components/SeleccionarPerro";
import { useUsuario } from "../../context/AuthContext";
import { setToken, getToken } from "../util/usuario";

const Registro = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });
    const [registerStep, setRegisterStep] = useState(1); // Estado para manejar los pasos de registro
    const { loginUsuario } = useUsuario();
    async function register(form) {
        const data = await useRegistro(form);
        toast.success(data['message']);
        window.location = "/"
        // if (data['message'] === "Usuario registrado!") {
        //     // En lugar de redirigir, cambiar al paso 2
        //     setRegisterStep(2);
        // }
    }

    const onSubmit = async  (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        await register(data);
    };

    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}
            >
                <Grid item xs={12} md={6}>
                    {registerStep === 1 && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Card>
                                <CustomTextField
                                    label="Nombre"
                                    name="name"
                                    type="text"
                                    control={control}
                                />
                                <CustomTextField
                                    label="Correo Electrónico"
                                    name="email"
                                    type="email"
                                    control={control}
                                />
                                <CustomTextField
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    control={control}
                                />
                                <CustomTextField
                                    label="Repetir Contraseña"
                                    name="confirmPassword"
                                    type="password"
                                    control={control}
                                />
                                <CardActions>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                    >
                                        Registrarse
                                    </Button>
                                </CardActions>
                            </Card>
                        </form>
                    )}
                    {registerStep === 2 && (
                        <SeleccionarPerro />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Registro;
