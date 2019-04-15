import React, { Component } from 'react';
import axios from 'axios';

class Consultas extends Component {

    constructor() {
        super();
        this.state = {
            listaconsultas: [],
            id: null,
            idprontuario: null,
            idmedico: null,
            dataconsulta: "",
            idsituacao: null,
            observacoes: ""
        };
    }

    logout(event) {
        event.preventDefault();

        localStorage.removeItem("usuario-spmedgroup");
        this.props.history.push("/login");
    }

    buscarConsultas() {
        axios.get('http://localhost:5000/api/consultas', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usuario-spmedgroup"),
                "Content-Type": "Application/json"
            }
        })
            .then(res => {
                const consultas = res.data;
                console.log(consultas);
                this.setState({ listaconsultas: consultas })
            })
    }

    componentDidMount() {
        this.buscarConsultas();
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

    atualizaEstadoIdSituacao(event) {
        this.setState({ idsituacao: event.target.value });
    }

    atualizaEstadoObservacoes(event) {
        this.setState({ observacoes: event.target.value });
    }

    cadastraConsulta(event) {
        event.preventDefault();

        let consulta = {
            id: this.state.id,
            idprontuario: this.state.idprontuario,
            idmedico: this.state.idmedico,
            dataconsulta: this.state.dataconsulta,
            idsituacao: this.state.idsituacao,
            observacoes: this.state.observacoes
        };

        console.log(consulta);

        axios.post('http://localhost:5000/api/consultas', consulta, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usuario-spmedgroup"),
                "Content-Type": "Application/json"
            }
        })
            .then(res => {
                this.buscarConsultas()
            })
    }

    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src="" />

                        <a onClick={this.logout.bind(this)}
                            style={{ cursor: "pointer" }}
                            className="">Sair</a>

                        <nav className="cabecalhoPrincipal-nav">Consultas</nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Consultas</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Id Prontuario</th>
                                        <th>Id Médico</th>
                                        <th>Data da Consulta</th>
                                        <th>Id Situação da Consulta</th>
                                        <th>Observações</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaconsultas.map(function (consultas) {
                                            return (
                                                <tr key={consultas.id}>
                                                    <td>{consultas.id}</td>
                                                    <td>{consultas.idProntuario}</td>
                                                    <td>{consultas.idMedico}</td>
                                                    <td>{consultas.dataConsulta}</td>
                                                    <td>{consultas.idSituacao}</td>
                                                    <td>{consultas.observacoes}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Consulta</h2>
                            <form onSubmit={this.cadastraConsulta.bind(this)}>
                                <div className="container">
                                    <input
                                        type="text"
                                        value={this.state.idprontuario}
                                        onChange={this.atualizaEstadoIdProntuario.bind(this)}
                                        id="consulta_idProntuario"
                                        placeholder="Id do Prontuario"
                                    />
                                    <input
                                        type="text"
                                        value={this.state.idmedico}
                                        onChange={this.atualizaEstadoIdMedico.bind(this)}
                                        id="consulta_idMedico"
                                        placeholder="Id do Médico"
                                    />
                                    <input
                                        type="text"
                                        value={this.state.dataconsulta}
                                        onChange={this.atualizaEstadoData.bind(this)}
                                        id="consulta_data"
                                        placeholder="Data Da Consulta"
                                    />
                                    <input
                                        type="text"
                                        value={this.state.idsituacao}
                                        onChange={this.atualizaEstadoIdSituacao.bind(this)}
                                        id="consulta_idSituacao"
                                        placeholder="Id da Situação da consulta"
                                    />
                                    {/* <select
                                        id="option__acessolivre"
                                        value={this.state.acessoLivre}
                                        onChange={this.atualizaEstadoAcessoLivre.bind(this)}
                                    >
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select> */}
                                    {/* <select
                                        id="option__tipoevento"
                                        value={this.state.tipoEventoId}
                                        onChange={this.atualizaEstadoTipoEvento.bind(this)}
                                        >
                                        <option>Selecione</option>
                                        {
                                            this.state.listaTiposEventos.map((element) => {
                                                return <option key={element.id} value={element.id}>{element.nome}</option>
                                            })
                                        }
                                    </select> */}
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        value={this.state.observacoes}
                                        onChange={this.atualizaEstadoObservacoes.bind(this)}
                                        placeholder="Observações"
                                        id="consulta_observacoes"
                                    />
                                </div>
                                <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                            </form>
                        </div>
                    </section>
                </main>

                {/* <Rodape /> */}
            </div>
        );
    }
}

export default Consultas;