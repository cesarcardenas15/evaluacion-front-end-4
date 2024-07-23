import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarTipoGestion() {

    const navigate = useNavigate();
    const [tipo_gestion, setTipoGestion] = useState([]);
    const [error, setError] = useState("");

    let { id } = useParams();

    useEffect(() => {
        cargarDatosTipoGestion();
    }, []);

    const cargarDatosTipoGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            setTipoGestion(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            setTipoGestion(response.data[0]);
            navigate("/tipo_gestion");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("No es posible eliminar, este tipo de gestión está siendo utilizado.");
            }

        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Eliminar Tipo de Gestion</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="card-header">Confirme la elimación del Tipo de Gestion</div>
                <div className="card-body">
                    <h1>¿Desea eliminar este Tipo de Gestión?</h1>
                    <h2>{tipo_gestion.nombre_tipo_gestion}</h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit}>Eliminar Tipo de Gestion</button>
                </div>
            </div>
        </div>
    )
}
export default EliminarTipoGestion;