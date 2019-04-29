import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import imgLogo from '../../assets/img/Logo.png';
import imgUser from '../../assets/img/user logo.png'
import "./Cabecalho.css"

class Cabecalho extends Component {
    logout() {
        localStorage.removeItem("usuario-spmedgroup");
        this.props.history.push("/login");
    }

    render() {
        return (
            <header className="cabecalhoPrincipal">
                <section className="cabecalhoPrincipalCont">
                    <div className="imgLogo">
                        <img id="imgLogo" src={imgLogo} />
                    </div>
                    <div className="cabecalhoNav">
                        <nav id="cabecalhoNav">
                            <Link to="/">Home</Link>
                            <Link to="">Unidades</Link>
                            <Link to="/consultaslistar">Consultas</Link>
                        </nav>
                    </div>
                    <div className="imgUser">
                        <img id="imgUser" src={imgUser} />
                        {(localStorage.getItem("usuario-spmedgroup") !== null)
                        ? <Link onClick={this.logout.bind(this)}
                        style={{ cursor: "pointer" }}
                        className="">Sair</Link>
                        : <Link to="/login"> Login </Link>}
                    </div>
                </section>
            </header>
        );
    }
}

export default withRouter(Cabecalho);