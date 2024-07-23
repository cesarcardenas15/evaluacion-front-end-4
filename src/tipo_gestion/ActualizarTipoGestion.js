import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function ActualizarTipoGestion() {
    const [id_tipo_gestion, setIdTipoGestion] = useState("");
    const [nombre_tipo_gestion, setNombre] = useState("");
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatosTipoGestion();
    },[]);

    const cargarDatosTipoGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            const tipo_gestion = response.data[0];
            setIdTipoGestion(tipo_gestion.id_tipo_gestion);
            setNombre(tipo_gestion.nombre_tipo_gestion);
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const tipo_gestion = {
                nombre_tipo_gestion
            }
            await axios.patch(`http://144.126.210.74:8080/api/tipo_gestion/${id}`, tipo_gestion);
            navigate("/tipo_gestion");
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="container">
            <h1 className="my-3">Actualizar Tipo de Gestion</h1>
            <hr></hr>
            <div className="card-header my-3">Complete los datos a actualizar</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group my-2">
                        <label>ID</label>
                        <input type="number" className="form-control my-2" value={id_tipo_gestion} disabled></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Nombre del Tipo de Gestión</label>
                        <input type="text" className="form-control my-2" value={nombre_tipo_gestion} onChange={(e) => setNombre(e.target.value)}></input>
                    </div>
                    <button type="submit" className="my-3 btn btn-primary">Actualizar Tipo de Gestion</button>
                </form>
            </div>
        </div>
    )
}

export default ActualizarTipoGestion;