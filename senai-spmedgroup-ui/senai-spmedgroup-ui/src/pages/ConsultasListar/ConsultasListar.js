import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import apiService from '../../services/apiService';
import "./ConsultasListar.css";
import imgMais from '../../assets/img/mais.png';
import Modal from '../../components/Modal/Modal';


class ConsultasListar extends Component {
    constructor() {
        super();
        this.state = {
            listaconsultas: [],
            show: false,
            idConsulta: 0
        };
    }

    showModal = (e) => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
        
        this.setState({
            idConsulta: e.target.idConsulta
        })
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
        let root = this;
        return (
            <div>
                <Modal
                    show={this.state.show}
                    onClose={this.showModal}
                    idConsulta={this.state.idConsulta}
                >
                </Modal>
                <Cabecalho />
                <div id="container">
                    <div id="lado_esquerdo">
                        <Link to="/consultascadastrar">Cadastrar Consulta</Link>
                        <Link to="/consultaslistar">Listar Consultas</Link>
                    </div>
                    <div id="conteudoPrincipal_lista">
                        <h1>Lista de Consultas</h1>

                        <table id="tabela_lista">
                            <thead id="tabela_cabecalho">
                                <tr>
                                    <th id="w50">Id</th>
                                    {/* <th>Id Prontuario</th> */}
                                    <th id="w140">Nome Paciente</th>
                                    {/* <th>Id Médico</th> */}
                                    <th id="w140">Nome Médico</th>
                                    <th id="w180">Data da Consulta</th>
                                    {/* <th>Id Situação da Consulta</th> */}
                                    <th id="w130">Sit. da Consulta</th>
                                    <th id="w320">Observações</th>
                                </tr>
                            </thead>
                            <div id="overflow">
                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaconsultas.map(function (consultas) {
                                            return (
                                                <tr key={consultas.id}>
                                                    <td id="w50">{consultas.id}</td>
                                                    {/* <td>{consultas.idProntuario}</td> */}
                                                    <td id="w180">{consultas.idProntuarioNavigation.nome}</td>
                                                    {/* <td>{consultas.idMedico}</td> */}
                                                    <td id="w180">{consultas.idMedicoNavigation.nome}</td>
                                                    <td id="w180">{consultas.dataConsulta}</td>
                                                    {/* <td>{consultas.idSituacao}</td> */}
                                                    {consultas.idSituacaoNavigation.nome == "Cancelada" ? (
                                                        <td className="red" id="w180">{consultas.idSituacaoNavigation.nome}</td>
                                                            ) : (consultas.idSituacaoNavigation.nome == "Realizada" ? (
                                                                <td className="green" id="w180">{consultas.idSituacaoNavigation.nome}</td>
                                                            ) : (
                                                                <td className="orange" id="w180">{consultas.idSituacaoNavigation.nome}</td>
                                                            )
                                                        )}
                                                        <td id="w270">{consultas.observacoes}</td>
                                                    <button
                                                        className="btn__mais"
                                                        onClick={root.showModal.bind(root)}
                                                        idConsulta={consultas.id}
                                                        ><img id="imgMais"src={imgMais}></img>
                                                    </button>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </div>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default ConsultasListar;