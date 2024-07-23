import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarResultado() {

    const navigate = useNavigate();
    const [resultado, setResultado] = useState([]);
    const [error, setError] = useState("");

    let { id } = useParams();

    useEffect(() => {
        cargarDatosResultado();
    }, []);

    const cargarDatosResultado = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/resultado/${id}`);
            setResultado(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://144.126.210.74:8080/api/resultado/${id}`);
            setResultado(response.data[0]);
            navigate("/resultado");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("No es posible eliminar, este resultado está siendo utilizado.");
            }

        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Eliminar Resultado</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="card-header">Confirme la elimación del Resultado</div>
                <div className="card-body">
                    <h1>¿Desea eliminar este Tipo de Gestión?</h1>
                    <h2>{resultado.nombre_resultado}</h2>
                    <button type="submit" className="btn btn-primary" onClick={onSubmit}>Eliminar Resultado</button>
                </div>
            </div>
        </div>
    )
}
export default EliminarResultado;