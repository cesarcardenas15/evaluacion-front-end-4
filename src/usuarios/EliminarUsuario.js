import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarUsuario() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const [error,setError] = useState("");
    
    let { id } = useParams();

    useEffect(() => {
        cargarDatosUsuario();
    }, []);

    const cargarDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id}`);
            setUsuario(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://144.126.210.74:8080/api/usuario/${id}`);
            navigate("/usuarios");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("No es posible eliminar, este usuario está siendo utilizado.");
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 className="my-3">Eliminar Usuario</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="card-header my-3">Confirme la elimación del usuario</div>
                <div className="card-body">
                    <h1 className="my-3">¿Desea eliminar este usuario?</h1>
                    <h2 className="my-3">{usuario && usuario.nombres} {usuario.apellidos}</h2>
                    <button type="submit" className="my-3 btn btn-primary" onClick={onSubmit}>Eliminar Usuario</button>
                </div>
            </div>
        </div>
    )
}
export default EliminarUsuario;