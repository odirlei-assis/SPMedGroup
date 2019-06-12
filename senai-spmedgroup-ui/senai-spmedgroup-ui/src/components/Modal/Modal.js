import React, { Component } from 'react';
import "./Modal.css"

export default class Modal extends Component {
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    constructor(props){
        super(props);

        this.state = {
            listaEspecialidade: [],
            especialidade: undefined,
            genero: '',
            dataCriacao: '',
            idade: undefined,
            doenca: '',
            longitude: '',
            latitude: '',
            idconsulta: this.props.consulta
        }
    }

    buscarEspecialidade(){
        fetch('http://192.168.3.105:5000/api/especialidades', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-spmedgroup'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({listaEspecialidade: data}))
        .catch(erro => console.log('Erro: ', erro))

    }

    atualizaEstado(event){
        this.setState({[event.target.name] : event.target.value});
    }

    componentDidMount(){
        this.buscarEspecialidade();
    }

    atualizarConsulta(event){
        event.preventDefault();

        let date = new Date().getTime();

        let consulta = {
            doenca: this.state.doenca,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            idade: this.state.idade,
            genero: this.state.genero,
            dataCriacao: new Date(date),
            especialidade: this.state.especialidade,
            idconsulta: this.props.consulta
        }

        fetch('http://192.168.3.105:5000/api/consultasmongo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consulta)
        })
        .then(res => console.log(res))
        .then(data => console.log(data))
        .catch(erro => console.log("Erro: ", erro))
    }

    buscarLatLong(){

        // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=&key=AIzaSyAMJX3iTSJgfsI7fBwaeF0LsC2PdiAZID0')
    }

    render(){
        if(!this.props.show){
            return null;
        }
        return(
            <div id="backdropStyle">
                <div className="modalStyle">
                    <div id="headerStyle">
                        Atualizar Consulta
                    </div>
                    <div id="mainStyle">
                        <div id="input__header">
                            <div id="input__header__one">
                                <label htmlFor="espec" id="label">Especialidade do Médico</label>
                                <select id="select__header__espec" name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)}>
                                    {
                                        this.state.listaEspecialidade.map((e) => {
                                            return(
                                                <option value={e.id} key={e.id}>{e.nome}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div id="input__header__one">
                                <label htmlFor="genero" id="label">Selecione o Gênero</label>
                                <select id="select__header__genero" name="genero" value={this.state.genero} defaultValue="Masculino" onChange={this.atualizaEstado.bind(this)}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Indefinido">Indefinido</option>
                                </select>
                            </div>
                        </div>

                        <div id="input__middle">
                            <div id="input__middle__one">
                                <label htmlFor="dataConsulta" id="label">Data da Consulta</label>
                                <input 
                                    type="date" 
                                    id="dataConsulta"
                                    name="dataConsulta"
                                    value={this.state.dataConsulta} 
                                    onChange={this.atualizaEstado.bind(this)} 
                                    id="input__middle__data"
                                />
                            </div>
                            <div id="input__middle__one">
                                <label htmlFor="idade" id="label">Idade do Paciente</label>
                                <input 
                                    type="text" 
                                    id="idade"
                                    name="idade" 
                                    value={this.state.idade} 
                                    onChange={this.atualizaEstado.bind(this)} 
                                    id="input__middle__idade"
                                    placeholder="Digite a idade do paciente"
                                />
                            </div>
                            <div id="input__middle__one">
                                <label htmlFor="doenca" id="label">Doença do Paciente</label>
                                <input 
                                    type="text" 
                                    id="doenca" 
                                    name="doenca"
                                    value={this.state.doenca} 
                                    onChange={this.atualizaEstado.bind(this)} 
                                    id="input__middle__idade"
                                    placeholder="Digite a doença do paciente"
                                />
                            </div>
                        </div>

                        <div id="input__end">
                            <div id="input__end__one">
                                <label htmlFor="longitude" id="label">Longitude do Paciente</label>
                                <input 
                                    type="text" 
                                    id="longitude"
                                    name="longitude"
                                    value={this.state.longitude} 
                                    onChange={this.atualizaEstado.bind(this)} 
                                    id="input__end__local"
                                    placeholder="Digite a longitude"
                                />
                            </div>

                            <div id="input__end__one">
                                <label htmlFor="latitude" id="label">Latitude do Paciente</label>
                                <input 
                                    type="text" 
                                    id="latitude"
                                    name="latitude"
                                    value={this.state.latitude} 
                                    onChange={this.atualizaEstado.bind(this)}
                                    id="input__end__local"
                                    placeholder="Digite a latitude"
                                />
                            </div>
                        </div>
                    </div>
                    <div id="footerStyle">
                        <button id="footerStyle__btn__one" onClick={this.atualizarConsulta.bind(this)}>
                            Salvar Alterações
                        </button>
                        <button 
                            onClick={(e) => { 
                                this.onClose(e)
                                this.setState({
                                    doenca: '',
                                    latitude: '',
                                    longitude: '',
                                    idade: undefined,
                                    genero: '',
                                    dataCriacao: '',
                                    especialidade: ''
                                })
                            }} 
                            id="footerStyle__btn__two"
                        >Close</button>
                    </div>
                </div>
            </div>
        );
    }
}