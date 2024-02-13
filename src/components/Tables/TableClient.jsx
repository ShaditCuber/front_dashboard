import React, { useState } from 'react';
import { IconView, IconDelete, IconStar, IconStarEmpty } from '../Icons/Icons';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ModalConfirmDelete } from '../Modals/ModalConfirmDelete';
import { useDeleteClient } from '../../queries/client/ClientQuery';



const TableClient = ({ clients }) => {

    const [deleteClient, setDeleteClient] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const deleteClientMutation = useDeleteClient();

    const handleOpenModal = (client) => {
        setDeleteClient(client);
        setModalOpen(!modalOpen);
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteClient?.client_id);
        setModalOpen(!modalOpen);
    };

    const handleDelete = (deleteClient) => {
        try {
            deleteClientMutation.mutate(deleteClient, {
                onSuccess: () => {
                    toast.success('Eliminado con éxito', { duration: 1500 });
                },
                onError: () => {
                    toast.warning('Error durante la eliminación', { duration: 1500 });
                }
            });
        } catch (error) {
            toast.warning('Error durante la eliminación', { duration: 1500 });
        }
    };


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Rut
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Razón Social
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Tipo Contrato
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Nota
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Cantidad de GPS
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Integraciones
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Acciones
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {client.rut}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="font-medium text-black dark:text-white">
                                        {client.client_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${client.type_of_contract === 'ARRENDAMIENTO'
                                            ? 'bg-success text-success'
                                            : client.type_of_contract === 'PERSONA'
                                                ? 'bg-danger text-danger'
                                                : 'bg-warning text-warning'
                                            }`}
                                    >
                                        {client.type_of_contract}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className='flex'>
                                        {[...new Array(5)].map((_, index) => {
                                            return (
                                                <span className={index < 4 ? 'mr-2' : ''} key={index}>
                                                    {index < client.classification ? <IconStar /> : <IconStarEmpty />}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="font-medium text-black dark:text-white">
                                        0
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="font-medium text-black dark:text-white">
                                        {client.integration ? 'Si' : 'No'}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <Link className="hover:text-primary" to={`/clientes/${client.rut.toLowerCase().replace(/-/g, '').replace(/\./g, '') }`} state={{ client_id: client.client_id }}>
                                            <IconView />
                                        </Link>
                                        <button className="hover:text-primary" onClick={() => handleOpenModal(client)}>
                                            <IconDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalConfirmDelete
                title={`Borrar Client ${deleteClient?.client_name}`}
                description={`¿Estás seguro que deseas eliminar el Cliente "${deleteClient?.client_name}"?`}
                handleConfirmDelete={handleConfirmDelete}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />

        </div >
    );
};

export default TableClient;
