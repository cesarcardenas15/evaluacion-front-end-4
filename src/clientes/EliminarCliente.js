import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EliminarCliente() {

    const navigate = useNavigate();
    const [cliente, setCliente] = useState([]);
    const [error,setError] = useState("");
    
    let { id } = useParams();

    useEffect(() => {
        cargarDatosCliente();
    }, []);

    const cargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/cliente/${id}`);
            setCliente(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://144.126.210.74:8080/api/cliente/${id}`);
            setCliente(response.data[0]);
            navigate("/clientes");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("No es posible eliminar, este cliente está siendo utilizado.");
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 className="my-3">Eliminar Cliente</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="card-header my-3">Confirme la elimación del cliente</div>
                <div className="card-body">
                    <h1 className="my-3">¿Desea eliminar este cliente?</h1>
                    <h2 className="my-3">{cliente && cliente.nombres} {cliente.apellidos}</h2>
                    <button type="submit" className="my-3 btn btn-primary" onClick={onSubmit}>Eliminar Cliente</button>
                </div>
            </div>
        </div>
    )
}
export default EliminarCliente;