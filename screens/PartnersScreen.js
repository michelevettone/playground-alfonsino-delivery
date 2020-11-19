import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View, Dimensions, Image, FlatList, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

var { height, width } = Dimensions.get("window");

export default function PartnersScreen({ navigation: { navigate } }, props) {
    const isFocused = useIsFocused();
    const [partnersData, setPartnersData] = useState("");
    const [bearerToken, setBearerToken] = useState("");

    const fetchPartnerList = () => {
        axios
            .get("https://playground.alfonsino.delivery/api/partners", {
                headers: { "Authorization": "Bearer " + bearerToken, "Cache-Control": "no-cache" }
            })
            .then((response) => {
                setPartnersData(response.data);
                console.log('PARTNERS');
                console.log(partnersData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getData = () => {
        AsyncStorage.getItem("loginData", (errs, result) => {
            if (!errs) {
                if (result !== "") {
                    setBearerToken(result)
                } else {
                    console.log('NO TOKEN STORED - NOT LOGGED IN')
                }
            }
        });
    }
    const keyExtractor = (item, index) => {
        return index.toString();
    };

    useEffect(() => {
        getData();
        fetchPartnerList();
    }, [props, isFocused]);

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%', backgroundColor: 'white', marginTop: 10 }}
                data={partnersData}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { console.log('Partner Clicked') }}>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemImage}>
                                <Image source={{ uri: item['img'] }} style={{ height: '100%', width: '100%', borderRadius: 5 }} />
                            </View>
                            <View style={styles.itemTitle}>
                                <Text style={styles.title}>
                                    {item['title']}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.addButton}
                onPress={() => {
                    navigate("CreaPartner", { token: bearerToken });
                }}>
                <Icon name='add' size={38} />
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: 'white'
    },
    itemContainer: {
        flex: 1,
        marginBottom: 50,
        marginHorizontal: 20,
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row"
    },
    itemImage: {
        flex: 1,
        marginBottom: 5,
        justifyContent: 'center',
    },
    itemTitle: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        backgroundColor: '#007dfe',
        borderRadius: 30,
        justifyContent: 'center'
    },
    buttonIcon: {
        color: '#fff',
        fontSize: 30,
        textAlign: "center"
    }
});
