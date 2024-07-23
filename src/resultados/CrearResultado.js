import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearResultado() {
    const [id_resultado, setIdResultado] = useState("");
    const [nombre_resultado, setNombre] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace("T", " ");
            await axios.post("http://144.126.210.74:8080/api/resultado", {
                id_resultado,
                nombre_resultado,
                fecha_registro
            });
            navigate("/resultados");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("Se ha producido un error: (" + error.response.statusText + ")")
            }
        }
    }

    return (
        < div className="container" >
            <h1 className="my-3">Agregar Resultado</h1>
            <hr></hr>
            {error &&(
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="form-group my-2">
                    <label>RUT</label>
                    <input type="number" min={0} max={2147483647} className="form-control my-2" value={id_resultado} onChange={(e) => setIdResultado(e.target.value)}></input>
                </div>
                <div className="form-group my-2">
                    <label>Nombre</label>
                    <input type="text" className="form-control my-2" maxLength={45} value={nombre_resultado} onChange={(e) => setNombre(e.target.value)}></input>
                <button type="submit" className="my-3 btn btn-primary">Crear Resultado</button>
                </div>
            </form>
        </div>
    );
}
export default CrearResultado;