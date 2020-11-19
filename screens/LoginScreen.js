import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image, ActivityIndicator, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import logo from '../assets/logo.png';

var { height, width } = Dimensions.get("window");

export default function LoginScreen({ navigation: { navigate } }) {
    const [isLoggedin, setLoggedinStatus] = useState(false);
    const [userData, setUserData] = useState(null);
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
                    setUserData(token);
                    setLoginLocal(token);
                    setLoggedinStatus(true);
                    console.log(token.access_token);
                    navigate("Partners");
                })
                .catch((e) => console.log(e));
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
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
    loginButton: {
        backgroundColor: "#007dfe",
        borderRadius: 2,
        width: "75%",
        height: undefined,
        aspectRatio: 7,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
