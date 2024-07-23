import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function ActualizarCliente() {
    const [id_cliente, setIdCliente] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatosCliente();
    },[]);

    const cargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/cliente/${id}`);
            const cliente = response.data[0];
            setIdCliente(cliente.id_cliente);
            setDv(cliente.dv);
            setNombres(cliente.nombres);
            setApellidos(cliente.apellidos);
            setEmail(cliente.email);
            setCelular(cliente.celular);
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const cliente = {
                dv,
                nombres,
                apellidos,
                email,
                celular
            }
            await axios.patch(`http://144.126.210.74:8080/api/cliente/${id}`, cliente);
            navigate("/clientes");
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="container">
            <h1>Actualizar Cliente</h1>
            <hr></hr>
            <div className="card-header">Complete los datos a actualizar</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>RUT</label>
                        <input type="number" className="form-control" value={id_cliente} disabled></input>
                    </div>
                    <div className="form-group">
                        <label>DV</label>
                        <input type="number" className="form-control" min={0} max={9} value={dv} onChange={(e) => setDv(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Nombres</label>
                        <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" maxLength={100} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input type="number" className="form-control" min={0} max={2147483647} value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar Cliente</button>
                </form>
            </div>
        </div>
    )
}

export default ActualizarCliente;