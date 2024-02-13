import clienteAxios from "../../util/clienteAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const fetchCargos = async () => {
    const { data } = await clienteAxios.get(`/v1/role_contact/all`);
    return data;
}

const createCargo = async (formData) => {
    const { data } = await clienteAxios.post(`/v1/role_contact/create`, formData);
    return data;
}

const updateCargo = async (formData) => {
    const { data } = await clienteAxios.post(`/v1/role_contact/update`, formData);
    return data;
}

const deleteCargo = async (id) => {
    const { data } = await clienteAxios.delete(`/v1/role_contact/delete/${id}`);
    return data;
}


const fetchCargo = async (id) => {
    const { data } = await clienteAxios.get(`/v1/role_contact/get/${id}`);
    return data;
}

export const useCargo = (id) => {
    return useQuery(['cargo', id], () => fetchCargo(id), {
        keepPreviousData: true,
    });
}

export const useCargos = () => {
    return useQuery(['cargos'], () => fetchCargos(), {
        keepPreviousData: true,
    });
}

export const useCreateCargo = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => createCargo(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('cargos');
        }
    });
}

export const useUpdateCargo = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => updateCargo(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('cargos');
        }
    });
}

export const useDeleteCargo = () => {
    const queryClient = useQueryClient();
    return useMutation((id) => deleteCargo(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('cargos');
        }
    });
}