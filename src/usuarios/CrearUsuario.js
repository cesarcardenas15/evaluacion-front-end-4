import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearUsuario() {
    const [id_usuario, setIdCliente] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace("T", " ");
            await axios.post("http://144.126.210.74:8080/api/usuario", {
                id_usuario,
                dv,
                nombres,
                apellidos,
                email,
                celular,
                username,
                password,
                fecha_registro
            });
            navigate("/usuarios");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("Se ha producido un error: (" + error.response.statusText + ")")
            }
        }
    }

    return (
        < div className="container" >
            <h1 className="my-3">Agregar Usuario</h1>
            <hr></hr>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="form-group my-2">
                    <label>RUT</label>
                    <input type="number" min={0} max={2147483647} className="form-control my-2" value={id_usuario} onChange={(e) => setIdCliente(e.target.value)}></input>
                </div>
                <div className="form-group my-2">
                    <label>DV</label>
                    <input type="number" min={0} max={9} className="form-control my-2" value={dv} onChange={(e) => setDv(e.target.value)}></input>
                </div>
                <div className="form-group my-2">
                    <label>Nombres</label>
                    <input type="text" className="form-control my-2" maxLength={45} value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                </div>
                <div className="form-group my-2">
                    <label>Apellidos</label>
                    <input type="text" className="form-control my-2" maxLength={45} value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                </div>
                <div className="form-group my-2">
                    <label>Email</label>
                    <input type="email" className="form-control my-2" maxLength={100} value={email} onChange={(e) => setEmail(e.target.value)}></input>
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
                <button type="submit" className="my-3 btn btn-primary">Crear Usuario</button>
            </form>
        </div>
    );
}
export default CrearUsuario;