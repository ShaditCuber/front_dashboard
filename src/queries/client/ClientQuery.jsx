import clienteAxios from "../../util/clienteAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchClients = async (page = 1, limit = 10) => {
    const { data } = await clienteAxios.get(`/v1/client/all?offset=${(page - 1) * limit}&limit=${limit}`);
    return data;
}

const fetchClient = async (clientID) => {
    const { data } = await clienteAxios.get(`/v1/client/get/${clientID}`);
    return data;
}

const createClient = async (client) => {
    const { data } = await clienteAxios.post('/v1/client/create', client);
    return data;
}

const updateClient = async (client) => {
    const { data } = await clienteAxios.post(`/v1/client/update`, client);
    return data;
}

const deleteClient = async (clientID) => {
    const { data } = await clienteAxios.delete(`/v1/client/delete/${clientID}`);
    return data;
}

const fetchTypeOfContracts = async () => {
    const { data } = await clienteAxios.get('/v1/client/type_of_contract');
    return data;
}


const fetchClientCommunication = async () => {
    const { data } = await clienteAxios.get('/v1/client/client_communication');
    return data;
}


export const useClients = (page, limit) => {
    return useQuery(['clients', page, limit], () => fetchClients(page, limit), {
        keepPreviousData: true,
    });
}

export const useClient = (clientID) => {
    return useQuery(['client', clientID], () => fetchClient(clientID));
}

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    return useMutation(createClient, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients');
        }
    });
}

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    return useMutation(updateClient, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients');
        }
    });
}

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteClient, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients');
        }
    });
}

export const useTypeOfContracts = () => {
    return useQuery(['type_of_contracts'], fetchTypeOfContracts);
}


export const useClientCommunication = () => {
    return useQuery(['client_communication'], fetchClientCommunication);
}



