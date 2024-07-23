import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CrearGestion() {
    const [gestion, setGestion] = useState([]);

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
            const response = await axios.post('http://144.126.210.74:8080/dynamic', {
                "query": `
                select 
                    usu.id_usuario,
                    cli.id_cliente,
                    tge.id_tipo_gestion,
                    res.id_resultado,
                    CONCAT(cli.nombres, ' ', cli.apellidos) as nombre_cliente,
                    CONCAT(usu.nombres, ' ', usu.apellidos) as nombre_usuario,
                    tge.nombre_tipo_gestion as nombre_tipo_gestion,
                    res.nombre_resultado as nombre_resultado
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
            let registro = response.data[0];
            setIdGestion(registro.id_gestion);

            setIdUsuario(registro.id_usuario);
            setIdTipoGestion(registro.id_tipo_gestion);
            setIdResultado(registro.id_resultado);
            setIdCliente(registro.id_cliente);


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
    console.log(gestion);
    return (
        <div className="container">
            <h1 className="my-3">Crear Gestión</h1>
            <hr></hr>
            <div className="card-header my-3">Complete los datos para crear el registro</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-floating">
                        <select className="form-select my-2" value={id_usuario} onChange={(e) => setIdUsuario(e.target.value)}>
                            {gestion.map((registro) => (
                                <option value={registro.id_usuario}>{registro.nombre_usuario}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Usuario</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select my-2" value={id_tipo_gestion} onChange={(e) => setIdTipoGestion(e.target.value)}>
                            {gestion.map((registro) => (
                                <option value={registro.id_tipo_gestion}>{registro.nombre_tipo_gestion}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Tipo de Gestión</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select my-2" value={id_resultado} onChange={(e) => setIdResultado(e.target.value)}>
                            {gestion.map((registro) => (
                                <option value={registro.id_resultado}>{registro.nombre_resultado}</option>
                            ))}
                        </select>
                        <label for="floatingSelect">Resultado</label>
                    </div>
                    <div className="form-floating">
                        <select className="form-select my-2" value={id_cliente} onChange={(e) => setIdCliente(e.target.value)}>
                            {gestion.map((registro) => (
                                <option value={registro.id_cliente}>{registro.nombre_cliente}</option>
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