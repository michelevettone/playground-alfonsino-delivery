import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';


export default function CreatePartnerScreen({ navigation: { navigate } }, props) {
    const [title, setTitle] = useState("");
    const [isButtonDisabled, disableButton] = useState(false);



    const createPartner = async () => {
        var data = JSON.stringify({
            title: title,
        });
        try {
            console.log(props.token);
            let response = await fetch(
                "https://playground.alfonsino.delivery/api/partners",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + props.token
                    },
                    body: data,
                }
            )
                .then((response) => {response.json();})
                .then((responseData) => {
                    console.log(responseData)
                    if (responseData !== "") {
                        navigate("Partners");
                    }
                })
                .catch((e) => console.log(e));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formInputView}>
                <TextInput
                    placeholder={"Nome Partner"}
                    style={styles.formInput}
                    underlineColor={"#fff"}
                    underlineColorAndroid={"#fff"}
                    onChangeText={(value) => setTitle(value)}
                    value={title}
                />
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={() => {
                            createPartner();
                            disableButton(true);
                        }}
                        disabled={isButtonDisabled}>
                        <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>Crea</Text>
                    </TouchableOpacity>
                </View>
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
