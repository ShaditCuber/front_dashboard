import { useState, useEffect, useRef } from 'react'
import { IconWarning } from '../Icons/Icons'

export const ModalConfirmDelete = ({ modalOpen, setModalOpen, description, title, handleConfirmDelete }) => {

    const trigger = useRef(null);
    const modal = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modal.current) return;
            if (
                !modalOpen ||
                modal.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setModalOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setModalOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div>
            <div
                className={`fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${modalOpen ? 'block' : 'hidden'
                    }`}
            >
                <div
                    ref={modal}
                    onFocus={() => setModalOpen(true)}
                    onBlur={() => setModalOpen(false)}
                    className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5"
                >
                    <span className="mx-auto inline-block">
                        <IconWarning/>
                    </span>
                    <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                        {title}
                    </h3>
                    <p className="mb-10">
                        {description}
                    </p>
                    <div className="-mx-3 flex flex-wrap gap-y-4">
                        <div className="w-full px-3 2xsm:w-1/2">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="w-full px-3 2xsm:w-1/2">
                            <button className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90" onClick={handleConfirmDelete}>
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
