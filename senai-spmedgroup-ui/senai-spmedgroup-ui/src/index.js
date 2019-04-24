import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Login from './pages/Login/Login';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { usuarioAutenticado } from './services/auth';
import ConsultasCadastrar from './pages/ConsultasCadastrar/ConsultasCadastrar';
import ConsultasListar from './pages/ConsultasListar/ConsultasListar';

const Permissao = ({component : Component}) => (
    <Route
        render = {props => usuarioAutenticado() ?
            (<Component { ...props} />) :
            (<Redirect to={{ pathname : '/login', state : {from: props.location}}} />)
        }
    />
);

const rotas =(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login}/>
                <Permissao path="/consultascadastrar" component={ConsultasCadastrar}/>
                <Permissao path="/consultaslistar" component={ConsultasListar}/>
                <Route component={NaoEncontrada} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
