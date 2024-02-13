import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { DownArrow, IconStar, IconStarEmpty } from '../Icons/Icons';
import { useCitys } from '../../queries/city/CityQuery';
import { HeaderNav } from '../Header/HeaderNav';
import { useClient, useClientCommunication, useTypeOfContracts, useUpdateClient } from '../../queries/client/ClientQuery';
import { formatRut, validateRut } from 'rutlib';
import { useLifeCycles } from '../../queries/admin/AdminQuerys';

// Links para el breadcrumb
const links = [
    { to: '/', name: 'Inicio' },
    { to: '/clientes', name: 'Clientes' },
]

const mapping_platform_usage_frequency = {
    "Sin uso": 1,
    "Casi sin uso": 2,
    "Poco Frecuente": 3,
    "Uso frecuente": 4,
    "Uso Moderado": 5,
    "Uso intensivo": 6
}

const mapping_usage_preference = {
    "No tiene": 0,
    "Versión Web": 1,
    "App": 2,
    "Ambas": 3
}

const platform_usage_frequency = [
    { key: 1, value: "Sin uso" },
    { key: 2, value: "Casi sin uso" },
    { key: 3, value: "Poco Frecuente" },
    { key: 4, value: "Uso frecuente" },
    { key: 5, value: "Uso Moderado" },
    { key: 6, value: "Uso intensivo" }
]


const usage_preference = [
    { key: 0, value: "No tiene" },
    { key: 1, value: "Versión Web" },
    { key: 2, value: "App" },
    { key: 3, value: "Ambas" }

]

const EditClient = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { client_id } = location.state; // Asume que este es el ID pasado a través del estado de React Router
    const { data: typesOfContractsData, isLoading: typesOfContractsLoading, isError: typesOfContractsError } = useTypeOfContracts();
    const { data: LyfeCycleData, isLoading: LyfeCycleLoading, isError: LyfeCycleError } = useLifeCycles();
    const { data: clientCommunicationData, isLoading: clientCommunicationLoading, isError: clientCommunicationError } = useClientCommunication();
    const { data: citysData, isLoading: citysLoading, isError: citysError } = useCitys();
    const { data: clientData, isLoading, isError } = useClient(client_id);


    const updateClientMutation = useUpdateClient();

    const [rating, setRating] = useState(clientData?.classification || 0);
    const [rut, setRut] = useState('');


    const [formData, setFormData] = useState({
        client_id: client_id,
        client_name: '',
        rut: '',
        type_of_contract_id: '0',
        classification: rating,
        platform_usage_frequency: '',
        usage_preference: '',
        address_: '',
        city_id: '0',
        client_lifecycle_id: '',
        client_communication_id: '',
        last_contact_date: '',
        next_contact_date: '',
        seniority: '',
        integration: '',
        fantasy_name: '',
        id_platform_gps: '',
    });

    useEffect(() => {
        if (clientData) {
            setRut(formatRut(clientData.rut)); // Asegúrate de formatear el RUT para la visualización
            setRating(clientData.classification);
            setFormData({
                client_id: client_id,
                client_name: clientData.client_name,
                rut: clientData.rut,
                type_of_contract_id: clientData.type_of_contract,
                classification: clientData.classification,
                platform_usage_frequency: clientData.platform_usage_frequency,
                usage_preference: clientData.usage_preference,
                address_: clientData.address_,
                city_id: clientData.city_id,
                client_lifecycle_id: clientData.client_lifecycle,
                client_communication_id: clientData.client_communication,
                last_contact_date: clientData.last_contact_date,
                next_contact_date: clientData.next_contact_date,
                seniority: clientData.seniority,
                integration: clientData.integration,
                fantasy_name: clientData.fantasy_name,
                id_platform_gps: clientData.id_platform_gps,
            });
        }
    }, [clientData]);


    const handleRating = (newRating) => {
        setRating(newRating);
        setFormData((prevFormData) => ({
            ...prevFormData,
            classification: newRating,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rut') {
            if (value.length > 12) return;
            setRut(formatRut(value));
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const validarRut = (rut) => {
        if (rut.length > 0) {
            if (validateRut(rut)) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    rut: rut
                }));
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.rut === '' || formData.rut === null || formData.rut === undefined) {
            toast.error('El RUT del contacto es requerido');
            return;
        }
        if (formData.rut.length > 12 || formData.rut.length < 11) {
            toast.error('El RUT ingresado no es válido');
            return;
        }
        if (validarRut(formData.rut) === false) {
            toast.error('El RUT ingresado no es válido');
            return;
        }

        if (formData.client_name === '') {
            toast.error('El nombre del cliente es requerido');
            return;
        }

        if (formData.type_of_contract_id === '0') {
            toast.error('El tipo de contrato es requerido');
            return;
        }

        if (formData.client_lifecycle_id === '0') {
            toast.error('El ciclo de vida del cliente es requerido');
            return;
        }

        if (formData.client_communication_id === '0') {
            toast.error('El tipo de comunicación del cliente es requerido');
            return;
        }

        // if (formData.address_ === '') {
        //     toast.error('La dirección del cliente es requerida');
        //     return;
        // }

        if (formData.city_id === '0') {
            toast.error('La ciudad del contacto es requerida');
            return;
        }

        if (formData.role_contact_id === '0') {
            toast.error('El cargo del contacto es requerido');
            return;
        }

        if (formData.usage_preference === '0') {
            toast.error('La preferencia de uso es requerida');
            return;
        }

        if (formData.platform_usage_frequency === '0') {
            toast.error('La frecuencia de uso de la plataforma es requerida');
            return;
        }



        try {
            let formDatatoSend = { ...formData };
            if (formDatatoSend.role_contact_id === '0') {
                delete formDatatoSend.role_contact_id;
            }
            formDatatoSend.rut = formDatatoSend.rut.toLowerCase().replace(/-/g, '').replace(/\./g, '');
            formDatatoSend.usage_preference = parseInt(formDatatoSend.usage_preference);
            formDatatoSend.platform_usage_frequency = parseInt(formDatatoSend.platform_usage_frequency);

            formDatatoSend.classification = rating;

            formDatatoSend.last_contact_date = formDatatoSend.last_contact_date ? new Date(formDatatoSend.last_contact_date).toISOString() : null;
            formDatatoSend.next_contact_date = formDatatoSend.next_contact_date ? new Date(formDatatoSend.next_contact_date).toISOString() : null;
            formDatatoSend.seniority = formDatatoSend.seniority ? new Date(formDatatoSend.seniority).toISOString() : null;
            formDatatoSend.integration = false
            updateClientMutation.mutate(formDatatoSend, {
                onSuccess: (data) => {
                    navigate('/clientes')
                },
                onError: (error) => {
                    toast.error(error.response.data.message);
                }
            });
        } catch (error) {
            toast.error('Error al Añadir el Cliente');
        }
    };

    if (typesOfContractsError || LyfeCycleError || clientCommunicationError || citysError || isError) return <div>Error al cargar los datos</div>;
    if (isLoading || typesOfContractsLoading || LyfeCycleLoading || clientCommunicationLoading || citysLoading) return <Loader />;




    return (
        <>
            <HeaderNav title='Editar Cliente' links={links} link_actual={clientData.rut} />
            <div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Rut
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese el RUT"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='rut'
                                        value={rut}
                                        onChange={handleInputChange}
                                        onBlur={() => validarRut(rut)}
                                    />
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Razon Social
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese la razón social"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='client_name'
                                        onChange={handleInputChange}
                                        defaultValue={clientData.client_name}
                                    />
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre de Fantasia
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese la razón social"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='fantasy_name'
                                        onChange={handleInputChange}
                                        defaultValue={clientData.fantasy_name}
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
                                        defaultValue={clientData.address_}
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
                                            defaultValue={clientData.city_id}
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

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="mb-4.5 xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Tipo de Contrato
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='type_of_contract_id'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.type_of_contract}
                                        >
                                            <option value='0'>Seleccionar</option>
                                            {
                                                typesOfContractsData?.map((typeContract) => (
                                                    <option key={typeContract.type_of_contract_id} value={typeContract.type_of_contract_id}>{typeContract.type_of_contract_name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <DownArrow />
                                        </span>
                                    </div>

                                </div>
                                <div className="mb-4.5 xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Ciclo de Vida
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='client_lifecycle_id'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.client_lifecycle}
                                        >
                                            <option value='0'>Seleccionar</option>
                                            {
                                                LyfeCycleData?.map((lyfeCicle) => (
                                                    <option key={lyfeCicle.client_lifecycle_id} value={lyfeCicle.client_lifecycle_id}>{lyfeCicle.client_lifecycle_name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <DownArrow />
                                        </span>
                                    </div>

                                </div>
                                <div className="mb-4.5 xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Comunicación
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='client_communication_id'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.client_communication}
                                        >
                                            <option value='0'>Seleccionar</option>
                                            {
                                                clientCommunicationData?.map((communication) => (
                                                    <option key={communication.client_communication_id} value={communication.client_communication_id}>{communication.client_communication_name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <DownArrow />
                                        </span>
                                    </div>

                                </div>
                            </div>



                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="mb-4.5 xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Preferencia de Uso
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='usage_preference'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.usage_preference}
                                        >
                                            <option value='0'>Seleccionar</option>

                                            {
                                                usage_preference?.map((usage_pref) => (
                                                    <option key={usage_pref.key} value={usage_pref.key}>{usage_pref.value}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <DownArrow />
                                        </span>
                                    </div>

                                </div>
                                <div className="mb-4.5 xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Frecuencia de uso de la Plataforma
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='platform_usage_frequency'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.platform_usage_frequency}
                                        >
                                            <option value='0'>Seleccionar</option>

                                            {
                                                platform_usage_frequency?.map((usage) => (
                                                    <option key={usage.key} value={usage.key}>{usage.value}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                            <DownArrow />
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="mb-4.5 xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Ultimo Contacto
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <input
                                            type="date"
                                            placeholder="Ingrese la fecha del último contacto"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='last_contact_date'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.last_contact_date}
                                        />
                                    </div>

                                </div>
                                <div className="mb-4.5 xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Próximo Contacto
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <input
                                            type="date"
                                            placeholder="Ingrese la fecha del próximo contacto"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='next_contact_date'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.next_contact_date}
                                        />
                                    </div>

                                </div>
                                <div className="mb-4.5 xl:w-1/3">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Antiguedad
                                    </label>
                                    <div className="relative z-20 bg-transparent dark:bg-form-input">

                                        <input
                                            type="date"
                                            placeholder="Ingrese la fecha del próximo contacto"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='seniority'
                                            onChange={handleInputChange}
                                            defaultValue={clientData.seniority}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Calificación
                                    </label>
                                    <div className='flex'>
                                        {[...new Array(5)].map((_, index) => (
                                            <span
                                                className={`cursor-pointer ${index < 4 ? 'mr-2' : ''}`}
                                                key={index}
                                                onClick={() => handleRating(index + 1)}
                                            >
                                                {index < rating ? <IconStar width={40} height={40} /> : <IconStarEmpty width={40} height={40} />}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        ID Plataforma GPS
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingrese la ID de la plataforma GPS"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        name='id_platform_gps'
                                        onChange={handleInputChange}
                                        defaultValue={clientData.id_platform_gps}
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

export default EditClient;
