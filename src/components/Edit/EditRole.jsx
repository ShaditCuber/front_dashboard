import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useCargo, useUpdateCargo } from '../../queries/admin/AdminQuerys';
import { HeaderNav } from '../Header/HeaderNav';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
    { to: '/cargos', name: 'Cargos' },
]


const EditRole = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;
    const { data: roleData, isLoading, isError } = useCargo(id);

    const updateRoleMutation = useUpdateCargo();
    const [formData, setFormData] = useState({
        role_contact_name: '',
        role_contact_id: id,
    });

    useEffect(() => {
        if (roleData) {
            console.log(roleData)
            setFormData({
                ...formData,
                role_contact_name: roleData.role_contact_name,
            });
        }
    }, [roleData]);

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
            updateRoleMutation.mutate(formDatatoSend, {
                onSuccess: (data) => {
                    toast.success(data.message);
                    navigate('/cargos');
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
    if (isError) return <div>Error al cargar el Cargo</div>;


    return (
        <>
            <HeaderNav title='Vista y Edición de Cargos' links={links} link_actual={`${roleData.role_contact_name}`} />
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
                                        placeholder="Nombre del Cargo"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='role_contact_name'
                                        onChange={handleInputChange}
                                        defaultValue={roleData.role_contact_name}
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

export default EditRole;
