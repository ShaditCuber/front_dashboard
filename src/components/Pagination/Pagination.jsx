import React from 'react';
import { IconPaginationLeft, IconPaginationRight } from '../Icons/Icons';

const Pagination = ({ total_pages, current_page, onChangePage, pagesToShow = 5 }) => {

    const startPage = Math.floor((current_page - 1) / pagesToShow) * pagesToShow + 1;
    const endPage = Math.min(startPage + pagesToShow - 1, total_pages);

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center justify-center space-x-2 py-2 sm:space-x-0">
            <button onClick={() => onChangePage(1)} disabled={current_page === 1} className={`cursor-pointer rounded-md hover:bg-primary px-2 hover:text-white${startPage === 1 ? 'hidden' : ''}`}>
                Primera
            </button>
            <button onClick={() => onChangePage(Math.max(1, startPage - pagesToShow))} disabled={startPage === 1} className={`cursor-pointer hover:bg-white ${startPage === 1 ? 'hidden' : ''}`}>
                <IconPaginationLeft className='text-primary' />
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    className={`${current_page === page && 'bg-primary text-white'
                        } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-1 md:px-2 xl:px-3 lg:px-3 hover:bg-primary hover:text-white`}
                    onClick={() => onChangePage(page)}
                >
                    {page}
                </button>
            ))}
            <button onClick={() => onChangePage(Math.min(total_pages, endPage + 1))} disabled={endPage >= total_pages} className={`cursor-pointer hover:bg-white  ${endPage >= total_pages ? 'hidden' : ''}`}>
                <IconPaginationRight className='text-primary' />
            </button>
            <button onClick={() => onChangePage(total_pages)} disabled={current_page === total_pages} className={`cursor-pointer rounded-md hover:bg-primary hover:text-white px-2  ${endPage == total_pages ? 'hidden' : ''}`}>
                Última
            </button>
        </div>
    );
};


export default Pagination;
