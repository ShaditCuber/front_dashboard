import React, { useState } from 'react';
import { ModalConfirmDelete } from '../Modals/ModalConfirmDelete';
import { IconView, IconDelete } from '../Icons/Icons';
import { Link } from 'react-router-dom';
import { useDeleteLifeCycle } from '../../queries/admin/AdminQuerys';
import { toast } from 'sonner';



const TableClientLifeCycle = ({ client_cycle }) => {

    const [deleteCycleLife, setDeleteCycleLife] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const deleteMutation = useDeleteLifeCycle();


    const handleOpenModal = (role) => {
        setDeleteCycleLife(role);
        setModalOpen(!modalOpen);
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteCycleLife?.client_lifecycle_id);
        setModalOpen(!modalOpen);
    };

    const handleDelete = (deleteCycleLife) => {
        try {
            deleteMutation.mutate(deleteCycleLife, {
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
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Ciclo de Vida
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Acciones
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {client_cycle?.map((lifeCycle, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {lifeCycle.client_lifecycle_name}
                                    </h5>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <Link className="hover:text-primary" to={`/ciclosVida/${lifeCycle.client_lifecycle_name}`} state={{ client_lifecycle_id: lifeCycle.client_lifecycle_id }}>
                                            <IconView />
                                        </Link>
                                        <button className="hover:text-primary" onClick={() => handleOpenModal(lifeCycle)}>
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
                title={`Borrar Ciclo de Vida ${deleteCycleLife?.client_lifecycle_name}`}
                description={`¿Estás seguro que deseas eliminar el ciclo de vida "${deleteCycleLife?.client_lifecycle_name}"?`}
                handleConfirmDelete={handleConfirmDelete}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />

        </div >
    );
};

export default TableClientLifeCycle;
