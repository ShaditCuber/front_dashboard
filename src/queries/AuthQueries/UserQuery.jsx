import clienteAxios from "../../util/clienteAxios";


export const useIniciarSesion = async (form) => {
    const { data } = await clienteAxios.post('auth/login', form);
    return data;
}

export const useRegistro = async (form) => {
    const { data } = await clienteAxios.post('auth/registro', form);
    return data;
}
