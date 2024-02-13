import clienteAxios from "../../util/clienteAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Llamados API de role_contact
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

// Llamados API de client_lyfeclycle
const fetchLifeCycles = async () => {
    const { data } = await clienteAxios.get(`/v1/client_lifecycle/all`);
    return data;
}

const fetchLifeCycle = async (id) => {
    const { data } = await clienteAxios.get(`/v1/client_lifecycle/get/${id}`);
    return data;
}

const createLifeCycle = async (formData) => {
    const { data } = await clienteAxios.post(`/v1/client_lifecycle/create`, formData);
    return data;
}

const updateLifeCycle = async (formData) => {
    const { data } = await clienteAxios.post(`/v1/client_lifecycle/update`, formData);
    return data;
}

const deleteLifeCycle = async (id) => {
    const { data } = await clienteAxios.delete(`/v1/client_lifecycle/delete/${id}`);
    return data;
}

// React Query Client Lifecycle
export const useLifeCycles = () => {
    return useQuery(['clientLifecycles'], () => fetchLifeCycles(), {
        keepPreviousData: true,
    });
}

export const useLifeCycle = (id) => {
    return useQuery(['clientLifecycle', id], () => fetchLifeCycle(id), {
        keepPreviousData: true,
    });
}

export const useCreateLifeCycle = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => createLifeCycle(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('clientLifecycles');
        }
    });
}

export const useUpdateLifeCycle = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => updateLifeCycle(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('clientLifecycles');
        }
    });
}

export const useDeleteLifeCycle = () => {
    const queryClient = useQueryClient();
    return useMutation((id) => deleteLifeCycle(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('clientLifecycles');
        }
    });
}



// React Query Cargo
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