import React, { useState } from 'react';
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { useCreateLifeCycle } from '../../queries/admin/AdminQuerys';
import { HeaderNav } from '../Header/HeaderNav';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
    { to: '/ciclosVida', name: 'CiclosVida' },
]


const AddClientLifeCycle = () => {

    const navigate = useNavigate();
    const createLifeCycleMutation = useCreateLifeCycle();

    const [formData, setFormData] = useState({
        client_lifecycle_name: '',
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formDatatoSend = { ...formData };

        if (formDatatoSend.client_lifecycle_name === '') {
            toast.warning('El nombre del ciclo de vida es requerido');
            return;
        }

        try {
            createLifeCycleMutation.mutate(formDatatoSend, {
                onSuccess: (data) => {
                    console.log(data)

                    if (data.status === 200) {
                        toast.success(data.message, { duration: 1500 });
                        navigate('/ciclosVida');
                    } else if (data.status === 201) {
                        toast.warning(data.message, { duration: 1500 });
                    }
                },
                onError: (error) => {
                    console.log(error)
                    toast.error(data.message);
                }
            });
        } catch (error) {
            toast.error('Error al añadir el Ciclo de Vida');
        }
    };




    return (
        <>
            <HeaderNav title='Añadir Ciclo de Vida' links={links} link_actual='Nuevo' />
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
                                        placeholder="Ingrese el nombre del Ciclo de Vida"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='client_lifecycle_name'
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" type='submit'>
                                Añadir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddClientLifeCycle;
