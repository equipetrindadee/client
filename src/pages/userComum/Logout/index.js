// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../../config/configApi'; // API para limpar o token

// function LogoutButton({ onLogout }) {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // Usando sessionStorage
//         sessionStorage.removeItem('token');
//         sessionStorage.removeItem('UserCategoria');
//         sessionStorage.removeItem('UserColuna');
//         sessionStorage.removeItem('UserAcesso');
//         delete api.defaults.headers.Authorization;
//         singIn(false);
//         navigate('/');
//     };

//     return (
//         <button onClick={handleLogout} className="logoutButton">
//             Logout
//         </button>
//     );
// }

// export default LogoutButton;
