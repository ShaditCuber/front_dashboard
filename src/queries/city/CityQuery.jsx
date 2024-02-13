import clienteAxios from "../../util/clienteAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useCity = async () => {
    const { data } = await clienteAxios.get(`/v1/city/all`);
    return data;
}

export const useCitys = () => {
    return useQuery(['citys'], useCity, {
        keepPreviousData: true,
    });
}