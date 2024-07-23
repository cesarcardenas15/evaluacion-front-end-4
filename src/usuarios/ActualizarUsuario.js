import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function ActualizarUsuario() {
    const [id_usuario, setIdUsuario] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatosUsuario();
    },[]);

    const cargarDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id}`);
            const usuario = response.data[0];
            setIdUsuario(usuario.id_usuario);
            setDv(usuario.dv);
            setNombres(usuario.nombres);
            setApellidos(usuario.apellidos);
            setEmail(usuario.email);
            setCelular(usuario.celular);
            setUsername(usuario.username);
            setPassword(usuario.password);
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const usuario = {
                dv,
                nombres,
                apellidos,
                email,
                celular,
                username,
                password
            }
            await axios.patch(`http://144.126.210.74:8080/api/usuario/${id}`, usuario);
            navigate("/usuarios");
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="container">
            <h1 className="my-3">Actualizar Usuario</h1>
            <hr></hr>
            <div className="card-header my-3">Complete los datos a actualizar</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group my-2">
                        <label>RUT</label>
                        <input type="number" className="form-control my-2" value={id_usuario} disabled></input>
                    </div>
                    <div className="form-group my-2">
                        <label>DV</label>
                        <input type="number" className="form-control my-2" min={0} max={9} value={dv} onChange={(e) => setDv(e.target.value)}></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Nombres</label>
                        <input type="text" className="form-control my-2" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Apellidos</label>
                        <input type="text" className="form-control my-2" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Email</label>
                        <input type="email" className="form-control my-2" maxLength={45} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Celular</label>
                        <input type="number" className="form-control my-2" min={0} max={2147483647} value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Nombre de Usuario</label>
                        <input type="text" className="form-control my-2" maxLength={45} value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    <div className="form-group my-2">
                        <label>Contraseña</label>
                        <input type="password" className="form-control my-2" maxLength={200} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <button type="submit" className="my-3 btn btn-primary">Actualizar Usuario</button>
                </form>
            </div>
        </div>
    )
}

export default ActualizarUsuario;