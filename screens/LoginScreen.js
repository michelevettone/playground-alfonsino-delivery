import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import logo from '../assets/logo.png';

export default function LoginScreen({ navigation: { navigate, setOptions } }) {
    const [isLoggedin, setLoggedinStatus] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const setLoginLocal = async (loginData) => {
        try {
            await AsyncStorage.setItem(
                "loginData",
                JSON.stringify(loginData)
            ).then(() => console.log("callback"));
        } catch (err) {
            console.log(err);
        }
    };

    const login = async () => {
        var data = JSON.stringify({
            email: email,
            password: password,
        });
        try {
            let response = await fetch(
                "https://playground.alfonsino.delivery/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache"
                    },
                    body: data,
                }
            )
                .then((response) => response.json())
                .then((responseData) => {
                    const token = {
                        access_token: responseData.access_token,
                        token_type: responseData.token_type,
                        expires_in: responseData.expires_in
                    };
                    setLoginLocal(token);
                    console.log(token.access_token);
                    navigate("Partners");
                    setOptions({
                        title: 'Logout'
                    });
                    setLoggedinStatus(true);
                })
                .catch((e) => console.log(e));
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setLoggedinStatus(false);
        removeLoginLocal();
        setOptions({
            title: 'Login'
        });
    };

    const removeLoginLocal = async () => {
        await AsyncStorage.clear();
        console.log("cleared");
    };

    return (
        !isLoggedin ? (
            <View style={styles.container}>
                <Image source={logo} style={styles.logo}></Image>
                <View style={styles.formInputView}>
                    <TextInput
                        placeholder={"Indirizzo Email"}
                        style={styles.formInput}
                        underlineColor={"#fff"}
                        underlineColorAndroid={"#fff"}
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        keyboardType={"email-address"}
                    />
                    <TextInput
                        placeholder={"Password"}
                        style={styles.formInput}
                        underlineColor={"#fff"}
                        underlineColorAndroid={"#fff"}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => {
                            login();
                        }}>
                        <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Effettua il login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
                <View style={styles.container}>
                    <Image source={logo} style={styles.logo}></Image>
                    <View style={styles.emailView}>
                        <Text>{email}</Text>
                    </View>
                    <View style={styles.logoutButtonView}>
                        <TouchableOpacity style={styles.loginButton}
                            onPress={() => {
                                navigate("Partners");
                            }}>
                            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Vai ai Partners</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton}
                            onPress={() => {
                                logout();
                            }}>
                            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Effettua il logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white'
    },
    logo: {
        width: "35%",
        height: "35%",
        resizeMode: "contain",
        backgroundColor: "white",
    },
    formInputView: {
        flex: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    emailView: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    formInput: {
        height: '10%',
        width: '75%',
        backgroundColor: "white",
        borderColor: "#bababa",
        borderWidth: 1,
        marginVertical: 30,
        textAlign: 'left',
        paddingLeft: 20
    },
    buttonView: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logoutButtonView: {
        flex: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    loginButton: {
        backgroundColor: "#007dfe",
        borderRadius: 2,
        width: "75%",
        height: undefined,
        aspectRatio: 7,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    logoutButton: {
        backgroundColor: "red",
        borderRadius: 2,
        width: "75%",
        height: undefined,
        aspectRatio: 7,
        justifyContent: "center",
        alignItems: "center",
    },
});
