import clienteAxios from "../../util/clienteAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchContacts = async (page = 1, limit = 10) => {
    const { data } = await clienteAxios.get(`/v1/contact/all?offset=${(page - 1) * limit}&limit=${limit}`);
    return data;
}

const fetchContact = async (contactID) => {
    const { data } = await clienteAxios.get(`/v1/contact/get/${contactID}`);
    return data;
}


const deleteContact = async (contactID) => {
    const { data } = await clienteAxios.delete(`/v1/contact/delete/${contactID}`);
    return data;
}

const createContact = async (formData) => {
    const { data } = await clienteAxios.post(`/v1/contact/create`, formData);
    return data;
}

const updateContact = async (formData) => {
     const { data } = await clienteAxios.post(`/v1/contact/update`, formData);
    return data;
}

export const useContacts = (page, limit) => {
    return useQuery(['contacts', page, limit], () => fetchContacts(page, limit), {
        keepPreviousData: true,
    });
}

export const useContact = (contactID) => {
    return useQuery(['contact', contactID], () => fetchContact(contactID));
}


export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts')
        }
    })
}

export const useCreateContact = () => {
    const queryClient = useQueryClient();

    return useMutation(createContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts')
        }
    })
}


export const useUpdateContact = () => {
    const queryClient = useQueryClient();

    return useMutation(updateContact, {
        onSuccess: () => {
            queryClient.invalidateQueries('contacts')
        }
    })
}










