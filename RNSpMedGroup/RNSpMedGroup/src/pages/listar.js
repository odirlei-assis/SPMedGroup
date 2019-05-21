import React, { Component } from "react";
import api from "../services/api";
import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, AsyncStorage, Link } from "react-native";
import axios from 'axios';
import auth from "../services/auth"

class listar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        };
    }

    componentDidMount() {
        this.carregarConsultas();
    }

    carregarConsultas = async () => {
        let token = await auth.getItem().then(res => token = res);
        const resposta = await api.get("/consultas", {
            headers : {
                "Authorization": "Bearer " + token,
                "Content-Type": "Application/json"
            }
        });
        const dadosDaApi = resposta.data;
        this.setState({ listaConsultas: dadosDaApi });
        //console.warn("Fds");

        // axios.get("http://192.168.3.105:5000/api/consultas")
        // .then(res => this.setState({ listaConsultas: res.data }))
        // .catch(err => console.warn("Erro", err))
        // console.warn(this.state.listaConsultas)
        console.warn(dadosDaApi);
    };

    render() {
        return (
            <View>
                <View>
                    <Text>{"consultas".toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.removeItem("userSpMedToken")
                        this.props.navigation.navigate("login")
                    }}><Text>{"sair".toUpperCase()}</Text></TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={styles.mainBodyConteudo}
                    data={this.state.listaConsultas}
                    keyExtractor={item => item.id}
                    renderItem={this.renderizaItem}
                />
            </View>
        );
    }

    renderizaItem = ({ item }) => (
        <View style={styles.flatItemLinha}>
            <View style={styles.flatItemContainer}>
                <Text style={styles.flatItemTitulo}>{item.id}</Text>
                <Text>{item.dataConsulta}</Text>
                <Text>{item.idMedicoNavigation.nome}</Text>
                <Text>{item.idProntuarioNavigation.nome}</Text>
                <Text>{item.idProntuarioNavigation.rg}</Text>
                <Text>{item.idSituacaoNavigation.nome}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default listar;