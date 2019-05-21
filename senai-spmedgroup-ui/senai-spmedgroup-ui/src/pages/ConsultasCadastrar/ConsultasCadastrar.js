import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import apiService from '../../services/apiService';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import "./ConsultasCadastrar.css";

class ConsultasCadastrar extends Component {

    constructor() {
        super();
        this.state = {
            listaconsultas: [],
            id: null,
            idprontuario: null,
            idmedico: null,
            dataconsulta: "",
            horaconsulta: "",
            datahoraconsulta: "",
            idsituacao: null,
            observacoes: "",
            listamedicos: [],
            listaProntuario: []
        };
    }

    atualizaEstadoId(event) {
        this.setState({ id: event.target.value });
    }

    atualizaEstadoIdProntuario(event) {
        this.setState({ idprontuario: event.target.value });
    }

    atualizaEstadoIdMedico(event) {
        this.setState({ idmedico: event.target.value });
    }

    atualizaEstadoData(event) {
        this.setState({ dataconsulta: event.target.value });
    }

    atualizaEstadoHora(event) {
        this.setState({ horaconsulta: event.target.value });
    }

    atualizaEstadoIdSituacao(event) {
        this.setState({ idsituacao: event.target.value });
    }

    atualizaEstadoObservacoes(event) {
        this.setState({ observacoes: event.target.value });
    }

    atualizaEstadoDataHoraConsulta(){
        this.setState({datahoraconsulta: this.state.dataconsulta + "T" + this.state.horaconsulta})
    }

    cadastraConsulta(event) {
        event.preventDefault();


        let consulta = {
            id: this.state.id,
            idprontuario: this.state.idprontuario,
            idmedico: this.state.idmedico,
            dataconsulta: this.state.datahoraconsulta,
            idsituacao: 2,
            observacoes: this.state.observacoes
        };

        console.log("Consulta:");
        console.log(consulta);

        axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usuario-spmedgroup"),
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status == 200) {
                    alert("Suavao!")
                    this.buscarConsultas()
                }
                alert("Deu ruim!")
            })
    }

    componentDidMount() {
        apiService
        .call("medicos")
        .getAll()
        .then(data => {
            console.log(data.data);
            this.setState({ listamedicos: data.data });
        });
        
        apiService
        .call("prontuarios")
        .getAll()
        .then(data => {
            console.log(data.data);
            this.setState({ listaProntuario: data.data });
        });

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

                    <main className="conteudoPrincipal">
                        <section className="conteudoPrincipal-cadastro">


                            <div id="conteudoPrincipal_cadastro">
                                <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Consulta</h2>
                                <form onSubmit={this.cadastraConsulta.bind(this)}>
                                    <div className="containerCadatrar">
                                        {/* <input
                                            type="text"
                                            value={this.state.idprontuario}
                                            onChange={this.atualizaEstadoIdProntuario.bind(this)}
                                            id="consulta_idProntuario"
                                            placeholder="Id do Prontuario"
                                        /> */}
                                        <select
                                            id="consulta_idProntuario"
                                            value={this.state.idprontuario}
                                            onChange={this.atualizaEstadoIdProntuario.bind(this)}
                                        >
                                            <option>Selecione o Paciente</option>
                                            {
                                                this.state.listaProntuario.map((element) => {
                                                    return <option key={element.id} value={element.id}>{element.rg}</option>
                                                })
                                            }
                                        </select>
                                        {/* <input
                                        type="text"
                                        value={this.state.idmedico}
                                        onChange={this.atualizaEstadoIdMedico.bind(this)}
                                        id="consulta_idMedico"
                                        placeholder="Id do Médico"
                                    /> */}
                                        <input
                                            type="date"
                                            value={this.state.dataconsulta}
                                            onChange={this.atualizaEstadoData.bind(this)}
                                            id="consulta_data"
                                            placeholder="Data Da Consulta"
                                        />
                                        <input
                                            type="time"
                                            value={this.state.horaconsulta}
                                            onChange={this.atualizaEstadoHora.bind(this)}
                                            id="consulta_hora"
                                            placeholder="Hora Da Consulta"
                                        />
                                        {/* <select
                                        id="option__acessolivre"
                                        value={this.state.acessoLivre}
                                        onChange={this.atualizaEstadoAcessoLivre.bind(this)}
                                    >
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select> */}
                                        <select
                                            id="consulta_medico"
                                            value={this.state.idmedico}
                                            onChange={this.atualizaEstadoIdMedico.bind(this)}
                                        >
                                            <option>Selecione o Médico</option>
                                            {
                                                this.state.listamedicos.map((element) => {
                                                    return <option key={element.id} value={element.id}>{element.nome}</option>
                                                })
                                            }
                                        </select>
                                        <textarea
                                            rows="3"
                                            cols="50"
                                            value={this.state.observacoes}
                                            onChange={this.atualizaEstadoObservacoes.bind(this)}
                                            placeholder="Observações"
                                            id="consulta_observacoes"
                                        />
                                    </div>
                                    <button type="submit" className="conteudoPrincipal-btn-cadastro" onClick={this.atualizaEstadoDataHoraConsulta.bind(this)}>Cadastrar</button>
                                </form>
                            </div>
                        </section>
                    </main>

                    {/* <Rodape /> */}
                </div>
            </div>
        );
    }
}

export default ConsultasCadastrar;