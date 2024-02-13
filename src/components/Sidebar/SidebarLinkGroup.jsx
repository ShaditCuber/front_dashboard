import React, { useRef, useState, useEffect } from 'react';

const SidebarLinkGroup = ({ children, activeCondition }) => {
    const [open, setOpen] = useState(activeCondition);
    const ref = useRef(null); // Ref para el elemento del componente

    const handleClick = () => {
        setOpen(!open);
    };

    // Efecto para agregar y remover el escuchador de eventos
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false); // Cierra el dropdown si se hace clic fuera
            }
        };

        // Agrega el escuchador de eventos al documento
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Limpieza al desmontar
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]); // Dependencias del efecto

    // Se pasa la referencia 'ref' al elemento que quieres monitorear
    return (
        <li ref={ref}>
            {children(handleClick, open)}
        </li>
    );
};

export default SidebarLinkGroup;
