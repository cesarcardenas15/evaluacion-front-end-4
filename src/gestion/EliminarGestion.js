import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarGestion() {

    const navigate = useNavigate();
    const [gestion, setGestion] = useState([]);
    const [error, setError] = useState("");

    let { id } = useParams();

    useEffect(() => {
        cargarDatosGestion();
    }, []);

    const cargarDatosGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/gestion/${id}`);
            setGestion(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://144.126.210.74:8080/api/gestion/${id}`);
            setGestion(response.data[0]);
            navigate("/gestion");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("No es posible eliminar, este gestion está siendo utilizado.");
            }

        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Eliminar Gestión</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="card-header">Confirme la elimación del Gestión</div>
                <div className="card-body">
                    <h1>¿Desea eliminar este Tipo de Gestión?</h1>
                    <h2>ID: {gestion.id_gestion}</h2>
                    <h2>Comentarios: {gestion.comentarios}</h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit}>Eliminar Gestión</button>
                </div>
            </div>
        </div>
    )
}
export default EliminarGestion;