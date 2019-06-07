import React, { Component } from "react";
import { TextInput, TouchableOpacity, View, Text, ImageBackground, StyleSheet, Image } from "react-native";
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
            <ImageBackground 
                source={require("../assets/img/background.jpg")}
                style={{ width: '100%', height: '100%' }} blurRadius={8}>
                    
                <View style={styles.conteudo}>
                    <View style={styles.viewLogo}>
                        <Image source={require("../assets/img/Logo.png")} style={styles.logo}/>
                    </View>

                    <TextInput style={styles.inputs} onChangeText={email => this.setState({ email })} placeholder="Email" placeholderTextColor= "#1A1A1A"></TextInput>

                    <TextInput style={styles.inputs} onChangeText={senha => this.setState({ senha })} placeholder="Senha" placeholderTextColor= "#1A1A1A" secureTextEntry={true}></TextInput>

                    <TouchableOpacity style={styles.btnLogar} onPress={this.logar}><Text style={styles.btnLogarText}>Logar</Text></TouchableOpacity>

                    {console.warn(auth.getItem().then(res => res))}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    conteudo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },

    viewLogo: {
        width: "100%",
        alignItems: "center",
        elevation: 2,
    },

    logo: {
        marginTop: 100,
        marginBottom: 10,
        width: 320,
        height: 180,
    },

    inputs: {
        width: 250,
        height: 40,
        backgroundColor: "#CCFFFF",
        margin: 20,
        fontSize: 18,
        paddingLeft: 10,
        borderRadius: 20,
        // elevation: 5,
        borderWidth: 1,
        borderColor: "#82D98F",
    },

    btnLogar: {
        width: 150,
        height: 40,
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#82C0D9",
        justifyContent: "center",
        borderRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#82D98F"
    },
    
    btnLogarText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1A1A1A",
    }

});

export default login;