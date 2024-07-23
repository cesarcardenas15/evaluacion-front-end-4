import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarTipoGestion() {
    const [tipo_gestion, setTipoGestion] = useState([]);
    useEffect(() => {
        const fetchTipoGestion = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/tipo_gestion?_size=500');
                setTipoGestion(response.data);
            } catch (error) {
                console.log(error);
            };
        }; fetchTipoGestion();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Tipos de Gestión</h1>
            <hr></hr>
            <div className="mb-3">
                <a href="/tipo_gestion/agregar" className="btn btn-primary">Agregar Tipo de Gestión</a>
            </div>
            <div className="card">
                <div className="card-header">Lista de Tipos de Gestión registrados</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipo_gestion.map((tipo_gestion) => (
                                <tr>
                                    <td>{tipo_gestion.id_tipo_gestion}</td>
                                    <td>{tipo_gestion.nombre_tipo_gestion}</td>
                                    <td>
                                        < Link to={`/tipo_gestion/eliminar/ ${tipo_gestion.id_tipo_gestion}`} className="btn btn-danger">Eliminar</Link>
                                        < Link to={`/tipo_gestion/actualizar/ ${tipo_gestion.id_tipo_gestion}`} className="btn btn-warning">Actualizar</Link>
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

export default ListarTipoGestion;