import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { DownArrow } from '../Icons/Icons';
import { useCitys } from '../../queries/city/CityQuery';
import { useCargos } from '../../queries/admin/AdminQuerys';
import { useContact, useUpdateContact } from '../../queries/contact/ContactQuery';
import { HeaderNav } from '../Header/HeaderNav';

// Links para el breadcrumb
const links = [
    {
        name: 'Inicio',
        to: '/'
    },
    {
        name: 'Contactos',
        to: '/contactos'
    }
];

const EditContact = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { contact_id } = location.state; // Asume que este es el ID pasado a través del estado de React Router
    const { data: cargos, isLoading: cargosLoading, isError: cargosError } = useCargos();
    const { data: citysData, isLoading: citysLoading, isError: citysError } = useCitys();
    const { data: contactData, isLoading, isError } = useContact(contact_id);


    const updateContactMutation = useUpdateContact();

    const [formData, setFormData] = useState({
        contact_id: contact_id,
        contact_nickname: '',
        contact_name: '',
        role_contact_id: '',
        relationship_category_id: '',
        contact_type_id: '',
        email: '',
        phone: '',
        address_: '',
        city_id: '',
        phone: ''
    });

    useEffect(() => {
        if (contactData) {
            console.log(contactData)
            setFormData({
                ...formData,
                contact_nickname: contactData.contact_nickname,
                contact_name: contactData.contact_name,
                role_contact_id: contactData.role_contact_id == null ? '0' : contactData.role_contact_id,
                email: contactData.email,
                phone: contactData.phone,
                address_: contactData.address_,
                city_id: contactData.city_id,
                phone: contactData.phone
            });
        }
    }, [contactData]);

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
            if (formDatatoSend.role_contact_id === '0') {
                delete formDatatoSend.role_contact_id;
            }


            updateContactMutation.mutate(formDatatoSend, {
                onSuccess: (data) => {
                    toast.success(data.message);
                    navigate('/contactos');
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

    if (isError || cargosError || citysError) return <div>Error al cargar los datos</div>;
    if (isLoading || cargosLoading || citysLoading) return <Loader />;




    return (
        <>
            <HeaderNav title='Vista y Edición de Contacto' links={links} link_actual={contactData.contact_name} />
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
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='contact_name'
                                        onChange={handleInputChange}
                                        defaultValue={contactData.contact_name}
                                    // value={contactData.contact_name}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Apodo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='contact_nickname'
                                        onChange={handleInputChange}
                                        defaultValue={contactData.contact_nickname}
                                    // value={contactData.contact_nickname}
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
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='email'
                                        onChange={handleInputChange}
                                        defaultValue={contactData.email}
                                    // value={contactData.contact_name}
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Telefono
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='phone'
                                        onChange={handleInputChange}
                                        defaultValue={contactData.phone}
                                    // value={contactData.contact_nickname}
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
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='address_'
                                        onChange={handleInputChange}
                                        defaultValue={contactData.address_}
                                    // value={contactData.address_}
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
                                            defaultValue={contactData.city_id}
                                        // value={contactData.role_contact_id == null ? '0' : contactData.role_contact_id}
                                        >
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
                                        defaultValue={contactData.role_contact_id == null ? '0' : contactData.role_contact_id}
                                    // value={contactData.role_contact_id == null ? '0' : contactData.role_contact_id}
                                    >
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
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditContact;
