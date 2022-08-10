import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";
import { QueryResult, Variables, GET_LOCATION } from "./LocationParser";
import { useQuery } from "@apollo/client";
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Style sheet for detailed location screen.
 */
const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '15%',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#80C141',
        paddingTop: '5%',
    },
    type: {
        fontStyle: 'italic',
        paddingTop: '2%',
        color: '#318942',
        fontSize: 16
    },
    dimension: {
        paddingTop: '2%',
        fontSize: 16
    },
    residentTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#318942',
        paddingTop: '10%',
    },
    characterContainer: {
        paddingTop: '10%',
        flexDirection: 'row'
    },
    textContainer: {
        paddingTop: '3%',
        paddingLeft: '7%',
        paddingRight: '25%'
    },
    characterName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#318942',
    },
    profilePic: {
        width: 75,
        height: 75,
    },
    back: {
        paddingTop: '10%',
        flexDirection: 'row',
    },
    return: {
        paddingLeft: '2%',
        paddingTop: '1%'
    },
    error: {
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    errorMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'red',
    },
    loading: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'green',
    },
});

/**
 * Created function types for the setPageFeed and setPageCharacter function.
 */
type PropsFunction = () => void;
type PropsFunctionParam = (id: number) => void;

/**
 * Location component that renders a screen that provides additional details of the selected location
 * and a list of the residents in the location including avatar picture, name, and species.
 */
export default function Location({ id, setPageFeed, setPageCharacter }: { id: number, setPageFeed: PropsFunction, setPageCharacter: PropsFunctionParam }) {

    const { data, loading, error } = useQuery<QueryResult, Variables>(
        GET_LOCATION,
        { variables: { id: id } });

    const onPress = () => {
        setPageFeed()
    }

    const onPressCharacter = (id: any) => {
        setPageCharacter(parseInt(id))
    }

    if (loading) {
        return (
            <View style={styles.error}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorMessage}>Unknown location</Text>
                <Text>{error.toString()}</Text>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={styles.back}>
                        <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
                        <Text style={styles.return}>Return to feed</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    if (!data) {
        return null;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.name}>{data.location.name}</Text>
                </View>
                <View>
                    <Text style={styles.type}>{data.location.type}</Text>
                    <Text style={styles.dimension}>{data.location.dimension}</Text>
                </View>
                <Text style={styles.residentTitle}>Residents</Text>
                {data.location.residents.map((character, idx) => (
                    <View key={idx} style={styles.characterContainer}>
                        <View>
                            <Image source={{uri: character.image}} style={styles.profilePic}/>
                        </View>
                        <TouchableWithoutFeedback onPress={() => onPressCharacter(character.id)}>
                            <View style={styles.textContainer}>
                                <Text style={styles.characterName}>{character.name}</Text>
                                <Text>{character.species}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ))}
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={styles.back}>
                        <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
                        <Text style={styles.return}>Return to feed</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
}
