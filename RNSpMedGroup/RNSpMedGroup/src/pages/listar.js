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
            headers: {
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
                <View style={styles.cabecalho}>
                    <Image source={require("../assets/img/Logo.png")} style={styles.logo} />
                    <TouchableOpacity style={styles.btnSair} onPress={() => {
                        AsyncStorage.removeItem("userSpMedToken")
                        this.props.navigation.navigate("login")
                    }}><Image source={require("../assets/img/logout.png")} style={styles.logoutImg} /><Text style={styles.btnSairText}>{"sair".toUpperCase()}</Text></TouchableOpacity>
                </View>
                <View style={styles.viewConsutas}>
                    <Text style={styles.textConsutas}>{"consultas".toUpperCase()}</Text>
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
        <View style={styles.flatItemConteudo}>
            <View style={styles.flatItemContainer}>
                <View style={styles.flatItemItem}>
                    <Text style={styles.flatItemTitulo}>Nome do Médico: </Text>
                    <Text style={styles.flatItemLinha}>{item.idMedicoNavigation.nome}</Text>
                </View>

                <View style={styles.flatItemItem}>
                    <Text style={styles.flatItemTitulo}>Nome do Paciente: </Text>
                    <Text style={styles.flatItemLinha}>{item.idProntuarioNavigation.nome}</Text>
                </View>

                <View style={styles.flatItemItem}>
                    <Text style={styles.flatItemTitulo}>Rg do Paciente: </Text>
                    <Text style={styles.flatItemLinha}>{item.idProntuarioNavigation.rg}</Text>
                </View>

                <View style={styles.flatItemItem}>
                    <Text style={styles.flatItemTitulo}>Situação da Consulta: </Text>
                    {item.idSituacaoNavigation.nome == "Cancelada" ? (
                        <Text style={styles.flatItemLinhaRed}>{item.idSituacaoNavigation.nome}</Text>
                    ) : (item.idSituacaoNavigation.nome == "Realizada" ? (
                        <Text style={styles.flatItemLinhaGreen}>{item.idSituacaoNavigation.nome}</Text>
                    ) : (
                        <Text style={styles.flatItemLinhaYellow}>{item.idSituacaoNavigation.nome}</Text>
                        )
                    )}
                </View>

                <View style={styles.flatItemItem}>
                    <Text style={styles.flatItemTitulo}>Data da Consulta: </Text>
                    <Text style={styles.flatItemLinha}>{item.dataConsulta}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 80,
        marginTop: 10,
        marginLeft: 10,
    },

    cabecalho: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },

    btnSair: {
        marginRight: 15,
        display: "flex",
        flexDirection: "row",
    },

    btnSairText: {
        fontWeight: "600",
        fontSize: 18
    },

    logoutImg: {
        width: 25,
        height: 25,
        marginRight: 5,
    },

    viewConsutas: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: 15,
    },

    textConsutas: {
        fontWeight: "600",
        fontSize: 22,
        letterSpacing: 7,
        borderBottomColor: "black",
        borderBottomWidth: 0.9,
        marginTop: 5,
    },

    flatItemConteudo: {
        display: "flex",
        alignItems: "center",
    },

    flatItemContainer: {
        height: 150,
        width: "90%",
        backgroundColor: "#D8EDf3",
        marginTop: 30,
        borderRadius: 20,
        padding: 12,
        borderColor: "#82D98F",
    },

    flatItemItem: {
        display: "flex",
        flexDirection: "row",

    },

    flatItemTitulo: {
        fontSize: 18,
        fontWeight: "600",

    },

    flatItemLinha: {
        fontSize: 18

    },

    flatItemLinhaRed: {
        color: "red",
        fontSize: 18
    },

    flatItemLinhaGreen: {
        color: "green",
        fontSize: 18
    },

    flatItemLinhaYellow: {
        color: "orange",
        fontSize: 18
    }
});

export default listar;