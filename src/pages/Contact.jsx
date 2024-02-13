import React, { useEffect, useState, useRef } from 'react';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import TableContact from '../components/Tables/TableContact';
import { useContacts } from '../queries/contact/ContactQuery';
import { Link } from 'react-router-dom';
import { HeaderNav } from '../components/Header/HeaderNav';
import RowsPerPageSelector from '../components/Pagination/RowsPerPageSelector';

// Links para BreadCrumbs
const links = [
    { to: '/', name: 'Inicio' },
]

const Contact = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pagesRange, setPagesRange] = useState({ start: 1, end: 5 });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { data: contactData, isLoading, isError } = useContacts(currentPage, rowsPerPage);


    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
        if (newPage < pagesRange.start || newPage > pagesRange.end) {
            const newStart = Math.floor((newPage - 1) / 10) * 10 + 1;
            setPagesRange({ start: newStart, end: newStart + 4 });
        }
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [rowsPerPage])

    if (isLoading) return (
        <Loader />
    )

    if (isError) return <div>Error al cargar los Contactos</div>;


    return (
        <>
            <HeaderNav title='Contactos' links={links} link_actual='Contactos' />
            <div>
                <Link className='inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 my-4' to="/contactos/nuevo">Añadir</Link>

                {contactData?.pagination?.total_count > 0 ?
                    <>

                        <TableContact
                            contacts={contactData.data}
                        />

                    </> : <div>No hay Empresas</div>
                }

                <div className="flex flex-col md:flex-row items-center justify-between">
                    <Pagination
                        total_pages={contactData.pagination.total_pages}
                        current_page={currentPage}
                        onChangePage={handleChangePage}
                    // pagesToShow={contactData.pagination.limit / rowsPerPage}
                    />
                    <RowsPerPageSelector
                        setRowsPerPage={setRowsPerPage}
                    />
                </div>
            </div>

        </>
    );
};

export default Contact;
