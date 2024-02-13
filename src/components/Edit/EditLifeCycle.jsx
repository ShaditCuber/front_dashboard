import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useLifeCycle,  useUpdateLifeCycle } from '../../queries/admin/AdminQuerys';
import { HeaderNav } from '../Header/HeaderNav';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
    { to: '/ciclosVida', name: 'CiclosVida' },
]


const EditClientLifeCycle = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { client_lifecycle_id } = location.state;
    const { data: clientLifeCycleData, isLoading, isError } = useLifeCycle(client_lifecycle_id);

    const updateClientLifeCycle = useUpdateLifeCycle();

    const [formData, setFormData] = useState({
        client_lifecycle_name: '',
        client_lifecycle_id: client_lifecycle_id,
    });

    useEffect(() => {
        if (clientLifeCycleData) {
            console.log(clientLifeCycleData)
            setFormData({
                ...formData,
                client_lifecycle_name: clientLifeCycleData.client_lifecycle_name,
            });
        }
    }, [clientLifeCycleData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formDatatoSend = { ...formData };
            updateClientLifeCycle.mutate(formDatatoSend, {
                onSuccess: (data) => {
                    toast.success(data.message);
                    navigate('/ciclosVida');
                },
                onError: (error) => {
                    toast.error(error.response.data.message);
                }
            });
        } catch (error) {
            console.log(error)
            toast.error('Error al actualizar el contacto');
        }
    };

    if (isLoading) return <Loader />;
    if (isError) return <div>Error al cargar el Ciclo de Vida</div>;


    return (
        <>
            <HeaderNav title='Vista y Edición de Ciclos de Vida' links={links} link_actual={`${clientLifeCycleData.client_lifecycle_name}`} />
            <div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del Ciclo de Vida"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='client_lifecycle_name'
                                        onChange={handleInputChange}
                                        defaultValue={clientLifeCycleData.client_lifecycle_name}
                                    />
                                </div>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" type='submit'>
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditClientLifeCycle;
