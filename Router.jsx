import { useUsuario } from "./src/context/AuthContext";
import { Routes, Route } from "react-router-dom";
import { Home } from "./src/pages/Home";
import Error from "./src/pages/Error";


// Contactos
import Contact from "./src/pages/Contact";
import EditContact from "./src/components/Edit/EditContact";
import AddContact from "./src/components/Add/AddContact";


// Cargos
import RoleContact from "./src/pages/RoleContact";
import EditRole from "./src/components/Edit/EditRole";
import AddRole from "./src/components/Add/AddRole";


// Clientes
import Client from "./src/pages/Client";
import AddClient from "./src/components/Add/AddClient";
import EditClient from "./src/components/Edit/EditClient";


// Ciclos de Vida
import LyfeCycle from "./src/pages/LyfeCycle";
import AddClientLifeCycle from "./src/components/Add/AddLifeCycle";
import EditClientLifeCycle from "./src/components/Edit/EditLifeCycle";

const RouterApp = () => {
    const { usuario } = useUsuario();
    return usuario ? <LogedInRoutes /> : <NotLogedRoutes />;
};

const NotLogedRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contactos" element={<Contact />} />
                <Route path="/contactos/:id" element={<EditContact />} />
                <Route path="/contactos/nuevo" element={<AddContact />} />
                <Route path="/cargos" element={<RoleContact />} />
                <Route path="/cargos/:id" element={<EditRole />} />
                <Route path="/cargos/nuevo" element={<AddRole />} />
                <Route path="/clientes" element={<Client />} />
                <Route path="/clientes/nuevo" element={<AddClient />} />
                <Route path="/clientes/:id" element={<EditClient />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
};

const LogedInRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contactos" element={<Contact />} />
                <Route path="/contactos/:id" element={<EditContact />} />
                <Route path="/contactos/nuevo" element={<AddContact />} />
                <Route path="/cargos" element={<RoleContact />} />
                <Route path="/cargos/:id" element={<EditRole />} />
                <Route path="/cargos/nuevo" element={<AddRole />} />
                <Route path="/clientes" element={<Client />} />
                <Route path="/clientes/nuevo" element={<AddClient />} />
                <Route path="/clientes/:id" element={<EditClient />} />
                <Route path="/ciclosVida" element={<LyfeCycle />} />
                <Route path="/ciclosVida/nuevo" element={<AddClientLifeCycle />} />
                <Route path="/ciclosVida/:id" element={<EditClientLifeCycle />} />
                <Route path="*" element={<Error />} />





            </Routes>
        </>
    );
}






export default RouterApp;