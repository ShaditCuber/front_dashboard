import React from 'react';
import TableRole from '../components/Tables/TableRole';
import { useCargos } from '../queries/admin/AdminQuerys';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { HeaderNav } from '../components/Header/HeaderNav';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
]

const RoleContact = () => {

    const { data: roleContactData, isLoading, isError } = useCargos();

    if (isLoading) return (
        <Loader />
    )

    if (isError) return <div>Error al cargar los Cargos</div>;

    return (
        <>
            <HeaderNav title='Cargos de Contactos' links={links} link_actual='Cargos' />
            <div>
                <Link className='inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 my-4' to="/cargos/nuevo">Añadir</Link>

                {roleContactData ?
                    <>
                        <TableRole
                            rols={roleContactData}
                        />
                    </> : <div>No hay Cargos</div>
                }
            </div>
        </>
    );
};

export default RoleContact;

