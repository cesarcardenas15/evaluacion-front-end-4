import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CrearGestion() {
    const [usuario, setUsuario] = useState([]);
    const [tipo_gestion, setTipoGestion] = useState([]);
    const [resultado, setResultado] = useState([]);
    const [cliente, setCliente] = useState([]);

    const [id_gestion, setIdGestion] = useState("");

    const [id_usuario, setIdUsuario] = useState("");
    const [id_tipo_gestion, setIdTipoGestion] = useState("");
    const [id_resultado, setIdResultado] = useState("");
    const [id_cliente, setIdCliente] = useState("");

    const [comentarios, setComentarios] = useState("");

    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatosGestion();
    }, []);

    const cargarDatosGestion = async () => {
        try {
            const response_usuario = await axios.get('http://144.126.210.74:8080/api/usuario?_size=500');
            const response_tge = await axios.get('http://144.126.210.74:8080/api/tipo_gestion?_size=500');
            const response_resultado = await axios.get('http://144.126.210.74:8080/api/resultado?_size=500');
            const response_cliente = await axios.get('http://144.126.210.74:8080/api/cliente?_size=500');
            setUsuario(response_usuario.data);
            setTipoGestion(response_tge.data);
            setResultado(response_resultado.data);
            setCliente(response_cliente.data);

            setIdUsuario(usuario.id_usuario);
            setIdTipoGestion(tipo_gestion.id_tipo_gestion);
            setIdResultado(resultado.id_resultado);
            setIdCliente(cliente.id_cliente);


        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const fecha_registro = new Date().toISOString().slice(0, 19).replace("T", " ");
        try {
            const gestion = {
                id_usuario,
                id_cliente,
                id_tipo_gestion,
                id_resultado,
                comentarios,
                fecha_registro
            }
            await axios.post(`http://144.126.210.74:8080/api/gestion`, gestion);
            navigate("/gestion");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container">
            <h1 className="my-3">Crear Gestión</h1>
            <hr></hr>
            <div className="card-header my-3">Complete los datos para crear el registro</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-floating">
                        <select className="form-select my-2" defaultValue={"default"} onChange={(e) => setIdUsuario(e.target.value)}>
                        <option value={"default"} disabled>Selecciona un usuario...</option>
                            {usuario.map((registro) => (
                                <option value={registro.id_usuario}>{registro.nombres} {registro.apellidos}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Usuario</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select my-2" defaultValue={"default"} onChange={(e) => setIdTipoGestion(e.target.value)}>
                        <option value={"default"} disabled>Selecciona un tipo de gestión...</option>
                            {tipo_gestion.map((registro) => (
                                <option value={registro.id_tipo_gestion}>{registro.nombre_tipo_gestion}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Tipo de Gestión</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select my-2" defaultValue={"default"} onChange={(e) => setIdResultado(e.target.value)}>
                        <option value={"default"} disabled>Selecciona un resultado...</option>
                            {resultado.map((registro) => (
                                <option value={registro.id_resultado}>{registro.nombre_resultado}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Resultado</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select my-2" defaultValue={"default"} onChange={(e) => setIdCliente(e.target.value)}>
                        <option value={"default"} disabled>Selecciona un cliente...</option>
                            {cliente.map((registro) => (
                                <option value={registro.id_cliente}>{registro.nombres} {registro.apellidos}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Cliente</label>
                    </div>
                    <div className="form-group my-2">
                        <label>Comentarios</label>
                        <input type="text" className="form-control my-2" maxLength={45} onChange={(e) => setComentarios(e.target.value)}></input>
                    </div>
                    <button type="submit" className="my-3 btn btn-primary">Crear Gestión</button>
                </form>
            </div>
        </div>
    )
}

export default CrearGestion;