import React from 'react';
import { useLifeCycles } from '../queries/admin/AdminQuerys';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { HeaderNav } from '../components/Header/HeaderNav';
import TableLifeCycle from '../components/Tables/TableLifeCycle';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
]

const LyfeCycle = () => {

    const { data: LyfeCycleData, isLoading, isError } = useLifeCycles();

    if (isLoading) return (
        <Loader />
    )

    if (isError) return <div>Error al cargar los Cargos</div>;

    return (
        <>
            <HeaderNav title='Ciclos de Vida' links={links} link_actual='CiclosVida' />
            <div>
                <Link className='inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 my-4' to="/ciclosVida/nuevo">Añadir</Link>

                {LyfeCycleData ?
                    <>
                        <TableLifeCycle
                            client_cycle={LyfeCycleData}
                        />
                    </> : <div>No hay Ciclo de Vida</div>
                }
            </div>
        </>
    );
};

export default LyfeCycle;

