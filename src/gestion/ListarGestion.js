import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarGestion() {
    const [gestion, setGestion] = useState([]);
    useEffect(() => {
        const fetchGestion = async () => {
            try {
                const response = await axios.post('http://144.126.210.74:8080/dynamic', {
                    "query": `
                    select 
                        ges.id_gestion as id_gestion,
                        ges.comentarios as comentarios,
                        CONCAT(cli.nombres, ' ', cli.apellidos) as nombre_cliente,
                        CONCAT(usu.nombres, ' ', usu.apellidos) as nombre_usuario,
                        tge.nombre_tipo_gestion as nombre_tipo_gestion,
                        res.nombre_resultado as nombre_resultado,
                        ges.fecha_registro as fecha_registro
                    from gestion ges,
                        usuario usu,
                        cliente cli,
                        tipo_gestion tge,
                        resultado res
                    where ges.id_usuario = usu.id_usuario
                        and ges.id_cliente = cli.id_cliente
                        and ges.id_tipo_gestion = tge.id_tipo_gestion
                        and ges.id_resultado = res.id_resultado`
                });
                setGestion(response.data);
            } catch (error) {
                console.log(error);
            };
        }; fetchGestion();
    }, []);
    return (
        <div className="container">
            <h1 className="my-3">Lista de Gestion</h1>
            <hr></hr>
            <div className="mb-3">
                <a href="/gestion/agregar" className="btn btn-primary">Agregar Gestión</a>
            </div>
            <div className="card">
                <div className="card-header my-3">Lista de Gestiones registradas</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Usuario</th>
                                <th>Nombre Cliente</th>
                                <th>Nombre Tipo Gestión</th>
                                <th>Nombre Resultado</th>
                                <th>Comentarios</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gestion.map((gestion) => (
                                <tr>
                                    <td>{gestion.id_gestion}</td>
                                    <td>{gestion.nombre_usuario}</td>
                                    <td>{gestion.nombre_cliente}</td>
                                    <td>{gestion.nombre_tipo_gestion}</td>
                                    <td>{gestion.nombre_resultado}</td>
                                    <td>{gestion.comentarios}</td>
                                    <td>
                                        < Link to={`/gestion/eliminar/ ${gestion.id_gestion}`} className="btn btn-danger">Eliminar</Link>
                                        < Link to={`/gestion/actualizar/ ${gestion.id_gestion}`} className="btn btn-warning">Actualizar</Link>
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

export default ListarGestion;