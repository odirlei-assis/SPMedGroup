import React, { Component } from 'react';
import axios from 'axios';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import "./Login.css";
import imgLogo from '../../assets/img/Logo.png';


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            senha: ''
        }
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetuaLogin(event) {
        event.preventDefault();

        axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                localStorage.setItem("usuario-spmedgroup", data.data.token);
                this.props.history.push('/consultas');
                console.log(data);
            })
            .catch(erro => {
                console.log(erro);
            })
    }

    render() {
        return (
            <section id="containerflexlogin">
                <Cabecalho />
                <div className="img__login">
                    <div className="img__overlay" />
                </div>

                <div id="item__login">
                    <div className="item"></div>

                        <img id="imgLogo" src={imgLogo} />

                    <form onSubmit={this.efetuaLogin.bind(this)}>
                        <div className="item">
                            <input
                                className="input__login item1"
                                placeholder="Email"
                                type="text"
                                value={this.state.email}
                                onChange={this.atualizaEstadoEmail.bind(this)}
                                name="email"
                                id="login__email"
                            />
                        </div>

                        <div className="item">
                            <input
                                className="input__login item1" 
                                placeholder="Senha"
                                value={this.state.senha}
                                onChange={this.atualizaEstadoSenha.bind(this)}
                                type="password"
                                name="password"
                                id="login__password"
                            />
                        </div>

                        <button type="submit" className="btn btn__login item1" id="btn__login">Entrar</button>
                    </form>
                </div>
            </section>
        );
    }
}