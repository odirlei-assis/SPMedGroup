import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import apiService from '../../services/apiService';
import "./ConsultasListar.css";

class ConsultasListar extends Component {
    constructor() {
        super();
        this.state = {
            listaconsultas: [],
            id: null,
            idprontuario: null,
            idmedico: null,
            dataconsulta: "",
            idsituacao: null,
            observacoes: "",
            listamedicos: []
        };
    }

    buscarConsultas() {
        // axios.get('http://localhost:5000/api/consultas', {
        //     headers: {
        //         "Authorization": "Bearer " + localStorage.getItem("usuario-spmedgroup"),
        //         "Content-Type": "Application/json"
        //     }
        // })
        //     .then(res => {
        //         const consultas = res.data;
        //         console.log(consultas);
        //         this.setState({ listaconsultas: consultas })
        //     })
        apiService
            .call("consultas")
            .getAll()
            .then(data => {
                console.log(data.data);
                this.setState({ listaconsultas: data.data });
            });
    }

    componentDidMount() {
        apiService
            .call("medicos")
            .getAll()
            .then(data => {
                console.log(data.data);
                this.setState({ listamedicos: data.data });
            });

        this.buscarConsultas();
    }


    render() {
        return (
            <div>
                <Cabecalho />
                <div id="container">
                    <div id="lado_esquerdo">
                        <Link to="/consultascadastrar">Cadastrar Consulta</Link>
                        <Link to="/consultaslistar">Listar Consultas</Link>
                    </div>
                    <div id="conteudoPrincipal-lista">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Lista de Consultas</h1>

                        <table id="tabela-lista">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    {/* <th>Id Prontuario</th> */}
                                    <th>Nome Paciente</th>
                                    {/* <th>Id Médico</th> */}
                                    <th>Nome Médico</th>
                                    <th>Data da Consulta</th>
                                    {/* <th>Id Situação da Consulta</th> */}
                                    <th>Situação da Consulta</th>
                                    <th>Observações</th>
                                </tr>
                            </thead>

                            <tbody id="tabela-lista-corpo">
                                {
                                this.state.listaconsultas.map(function (consultas) {
                                    return (
                                        <tr key={consultas.id}>
                                            <td>{consultas.id}</td>
                                            {/* <td>{consultas.idProntuario}</td> */}
                                            <td>{consultas.idProntuarioNavigation.nome}</td>
                                            {/* <td>{consultas.idMedico}</td> */}
                                            <td>{consultas.idMedicoNavigation.nome}</td>
                                            <td>{consultas.dataConsulta}</td>
                                            {/* <td>{consultas.idSituacao}</td> */}
                                            <td>{consultas.idSituacaoNavigation.nome}</td>
                                            <td>{consultas.observacoes}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        );
    }
}
        
export default ConsultasListar;