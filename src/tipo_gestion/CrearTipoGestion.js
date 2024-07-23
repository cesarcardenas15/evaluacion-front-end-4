import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearTipoGestion() {
    const [id_tipo_gestion, setIdTipoGestion] = useState("");
    const [nombre_tipo_gestion, setNombre] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace("T", " ");
            await axios.post("http://144.126.210.74:8080/api/tipo_gestion", {
                id_tipo_gestion,
                nombre_tipo_gestion,
                fecha_registro
            });
            navigate("/tipo_gestion");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("Se ha producido un error: (" + error.response.statusText + ")")
            }
        }
    }

    return (
        < div className="container" >
            <h1>Agregar Tipo Gestión</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>RUT</label>
                    <input type="number" min={0} max={2147483647} className="form-control" value={id_tipo_gestion} onChange={(e) => setIdTipoGestion(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" maxLength={45} value={nombre_tipo_gestion} onChange={(e) => setNombre(e.target.value)}></input>
                <button type="submit" className="btn btn-primary">Crear Tipo de Gestión</button>
                </div>
            </form>
        </div>
    );
}
export default CrearTipoGestion;