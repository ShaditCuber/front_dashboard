import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner'
import { useCreateContact } from '../../queries/contact/ContactQuery';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { DownArrow } from '../Icons/Icons';
import { useCitys } from '../../queries/city/CityQuery';
import { useCargos } from '../../queries/admin/AdminQuerys';
import { HeaderNav } from '../Header/HeaderNav';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
    { to: '/contactos', name: 'Contactos' },
]



const AddContact = () => {

    const navigate = useNavigate();

    const { data: cargos, isLoading: cargosLoading, isError: cargosError } = useCargos();
    const { data: citysData, isLoading: citysLoading, isError: citysError } = useCitys();

    const createContactMutate = useCreateContact();

    const [formData, setFormData] = useState({
        contact_nickname: '',
        contact_name: '',
        role_contact_id: '0',
        relationship_category_id: '',
        contact_type_id: '',
        email: '',
        phone: '',
        address_: '',
        city_id: '0',
        phone: ''
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
        if (formData.contact_name === '') {
            toast.error('El nombre del contacto es requerido');
            return;
        }

        if (formData.email === '') {
            toast.error('El email del contacto es requerido');
            return;
        }

        if (formData.city_id === '0') {
            toast.error('La ciudad del contacto es requerida');
            return;
        }

        if (formData.role_contact_id === '0') {
            toast.error('El cargo del contacto es requerido');
            return;
        }



        try {
            let formDatatoSend = { ...formData };
            if (formDatatoSend.role_contact_id === '0') {
                delete formDatatoSend.role_contact_id;
            }

            createContactMutate.mutate(formDatatoSend, {
                onSuccess: (data) => {
                    toast.success(data.message);
                    navigate('/contactos');
                },
                onError: (error) => {
                    toast.error(error.response.data.message);
                }
            });
        } catch (error) {
            toast.error('Error al Añadir el contacto');
        }
    };

    if (cargosLoading || citysLoading) return <Loader />;



    return (
        <>
            <HeaderNav title='Añadir Contacto' links={links} link_actual='Nuevo' />
            <div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el nombre"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='contact_name'
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Apodo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el apodo"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='contact_nickname'
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Ingrese el email"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='email'
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Telefono
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el telefono"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='phone'
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese la dirección"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='address_'
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Ciudad
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='city_id'
                                            onChange={handleInputChange}
                                        >
                                            <option value='0'>Seleccionar</option>
                                            {
                                                citysData.map((city) => (
                                                    <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <DownArrow />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Cargo
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='role_contact_id'
                                        onChange={handleInputChange}
                                    >
                                        <option value='0'>Seleccionar</option>
                                        {
                                            cargos.map((cargo) => (
                                                <option key={cargo.role_contact_id} value={cargo.role_contact_id}>{cargo.role_contact_name}</option>
                                            ))
                                        }
                                    </select>
                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                        <DownArrow />
                                    </span>
                                </div>
                            </div>


                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" type='submit'>
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddContact;
