import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarResultados() {
    const [resultado, setResultado] = useState([]);
    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/resultado?_size=500');
                setResultado(response.data);
            } catch (error) {
                console.log(error);
            };
        }; fetchResultados();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Resultados</h1>
            <hr></hr>
            <div className="mb-3">
                <a href="/resultados/agregar" className="btn btn-primary">Agregar Resultado</a>
            </div>
            <div className="card">
                <div className="card-header">Lista de Resultados registrados</div>
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
                            {resultado.map((resultado) => (
                                <tr>
                                    <td>{resultado.id_resultado}</td>
                                    <td>{resultado.nombre_resultado}</td>
                                    <td>
                                        < Link to={`/resultados/eliminar/${resultado.id_resultado}`} className="btn btn-danger">Eliminar</Link>
                                        < Link to={`/resultados/actualizar/${resultado.id_resultado}`} className="btn btn-warning">Actualizar</Link>
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

export default ListarResultados;