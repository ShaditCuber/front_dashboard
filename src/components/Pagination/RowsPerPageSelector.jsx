import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DownArrow } from '../Icons/Icons';

const RowsPerPageSelector = ({ setRowsPerPage, options = [5, 10, 20, 100, 250, 500] }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className='mt-4 md:mt-0 p-4 sm:p-6 xl:p-10' onMouseLeave={() => setDropdownOpen(false)}>
            <div className="relative inline-block" >
                <button
                    onClick={toggleDropdown}
                    className="inline-flex items-center gap-2.5 rounded-md bg-primary py-3 px-5.5 font-medium text-white hover:bg-opacity-95"
                >
                    Filas por Página
                    <DownArrow className={`fill-current duration-200 ease-linear ${dropdownOpen && 'rotate-180'}`} />
                </button>
                {dropdownOpen && (

                    <div className={`absolute left-0 top-full z-40 mt-2 w-full rounded-md border border-stroke bg-white py-3 shadow-card dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
                        }`}>
                        <ul
                            className="flex flex-col"
                        >
                            {options.map(option => (
                                <li key={option}>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            setRowsPerPage(option);
                                            setDropdownOpen(false);
                                        }}
                                        className="flex py-2 px-5 font-medium hover:bg-whiter hover:text-primary dark:hover:bg-meta-4"
                                    >
                                        {option}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RowsPerPageSelector;
