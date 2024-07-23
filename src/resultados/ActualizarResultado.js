import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function ActualizarResultado() {
    const [id_resultado, setIdResultado] = useState("");
    const [nombre_resultado, setNombre] = useState("");
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatosResultado();
    },[]);

    const cargarDatosResultado = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/resultado/${id}`);
            const resultado = response.data[0];
            setIdResultado(resultado.id_resultado);
            setNombre(resultado.nombre_resultado);
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultado = {
                nombre_resultado
            }
            await axios.patch(`http://144.126.210.74:8080/api/resultado/${id}`, resultado);
            navigate("/resultados");
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="container">
            <h1>Actualizar Resultado</h1>
            <hr></hr>
            <div className="card-header">Complete los datos a actualizar</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>ID</label>
                        <input type="number" className="form-control" value={id_resultado} disabled></input>
                    </div>
                    <div className="form-group">
                        <label>Nombre del Tipo de Gestión</label>
                        <input type="text" className="form-control" value={nombre_resultado} onChange={(e) => setNombre(e.target.value)}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar Resultado</button>
                </form>
            </div>
        </div>
    )
}

export default ActualizarResultado;