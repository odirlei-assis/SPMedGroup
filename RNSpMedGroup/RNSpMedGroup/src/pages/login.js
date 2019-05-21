import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, AsyncStorage, StyleSheet, Image } from "react-native";
import api from "../services/api";
import auth from "../services/auth";

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: ""
        };
    }

    logar = async () => {
        const resposta = await api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        });
        const token = resposta.data.token;
        await auth.setItem(token);
        this.props.navigation.navigate("MainNavigator");
    }

    render() {
        return (
            <View style={styles.conteudo}>
                <View style={styles.viewLogo}>
                    <Image source={require("../assets/img/Logo.png")} style={styles.logo} />
                </View>
                <TextInput style={styles.inputs} onChangeText={email => this.setState({ email })} placeholder="Email" defaultValue="A@A.A"></TextInput>
                <TextInput style={styles.inputs} onChangeText={senha => this.setState({ senha })} placeholder="Senha" defaultValue="123" secureTextEntry={true}></TextInput>
                <TouchableOpacity style={styles.btnLogar} onPress={this.logar}><Text style={styles.btnLogarText}>Logar</Text></TouchableOpacity>
                {console.warn(auth.getItem().then(res => res))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conteudo: {
        alignItems: "center",
        height: "100%",
        width: "100%"
    },

    viewLogo: {
        width: "100%",
        alignItems: "center",
        // backgroundColor: "pink",
    },

    logo: {
        marginTop: 100,
        marginBottom: 10,
        width: 300,
        height: 160,
    },

    inputs: {
        width: 200,
        height: 40,
        backgroundColor: "green",
        margin: 15,
        justifyContent: "center",
        fontSize: 18,
        paddingLeft: 10,
        borderRadius: 10,
    },

    btnLogar: {
        width: 200,
        height: 40,
        marginTop: 15,
        alignItems: "center",
        backgroundColor: "cyan",
        justifyContent: "center",
        borderRadius: 10,
    },
    
    btnLogarText: {
        fontSize: 20,
        fontWeight: "600" 
    }

});

export default login;