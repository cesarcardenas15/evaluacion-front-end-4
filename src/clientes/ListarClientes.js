import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarClientes() {
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/cliente?_size=500');
                setClientes(response.data);
            } catch (error) {
                console.log(error);
            };
        }; fetchClientes();
    }, []);

    return (
        <div className="container">
            <h1 className="my-3">Lista de Clientes</h1>
            <hr></hr>
            <div className="mb-3">
                <a href="/clientes/agregar" className="btn btn-primary">Agregar Cliente</a>
            </div>
            <div className="card">
                <div className="card-header my-3">Lista de clientes registrados</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>RUT</th>
                                <th>DV</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr>
                                    <td>{cliente.id_cliente}</td>
                                    <td>{cliente.dv}</td>
                                    <td>{cliente.nombres}</td>
                                    <td>{cliente.apellidos}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.celular}</td>
                                    <td>
                                        < Link to={`/clientes/eliminar/ ${cliente.id_cliente}`} className="btn btn-danger">Eliminar</Link>
                                        < Link to={`/clientes/actualizar/ ${cliente.id_cliente}`} className="btn btn-warning">Actualizar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListarClientes;