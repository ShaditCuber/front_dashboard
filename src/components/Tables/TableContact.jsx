import React, { useState } from 'react';
import { IconView, IconDelete } from '../Icons/Icons';
import { Link } from 'react-router-dom';
import { useDeleteContact } from '../../queries/contact/ContactQuery';
import { toast } from 'sonner';
import { ModalConfirmDelete } from '../Modals/ModalConfirmDelete';



const TableContact = ({ contacts }) => {

    const [deleteContact, setDeleteContact] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const deleteContactMutation = useDeleteContact();

    const handleOpenModal = (contact) => {
        console.log(contact)
        setDeleteContact(contact);
        setModalOpen(!modalOpen);
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteContact?.contact_id);
        setModalOpen(!modalOpen);
    };

    const handleDelete = (deleteContact) => {
        try {
            deleteContactMutation.mutate(deleteContact, {
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

    const copyToClipboard = async (text) => {
        if ((text === '' || text === null) && text != 'Sin email registrado') return;
        try {
            await navigator.clipboard.writeText(text);
            toast.message('Elemento Copiado al portapapeles', { duration: 1500 });
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Nombre
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Télefono
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Cargo
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Ciudad
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Acciones
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {contact.contact_name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                                    <p className={`text-black dark:text-white ${contact.email != 'Sin email registrado' ? 'cursor-pointer' : ''}`} onClick={() => copyToClipboard(contact.email)}>
                                        {contact.email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {contact.phone}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${contact.role_contact === 'Dueño'
                                            ? 'bg-success text-success'
                                            : contact.role_contact === 'Encargado GPS'
                                                ? 'bg-danger text-danger'
                                                : 'bg-warning text-warning'
                                            }`}
                                    >
                                        {contact.role_contact}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`text-black dark:text-white ${contact.address_ != null ? 'cursor-pointer' : ''}`}
                                        onClick={() => copyToClipboard(contact.address_ + ', ' + contact.city_name)}
                                    >
                                        {contact.city_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <Link className="hover:text-primary" to={`/contactos/${contact.contact_name}`} state={{ contact_id: contact.contact_id }}>
                                            <IconView />
                                        </Link>
                                        <button className="hover:text-primary" onClick={() => handleOpenModal(contact)}>
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
                title={`Borrar Contacto ${deleteContact?.contact_name}`}
                description={`¿Estás seguro que deseas eliminar el contacto "${deleteContact?.contact_name}"?`}
                handleConfirmDelete={handleConfirmDelete}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />


        </div >
    );
};

export default TableContact;
