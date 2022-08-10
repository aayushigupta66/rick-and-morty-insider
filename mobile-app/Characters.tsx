import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useQuery } from '@apollo/client';
import { QueryResult, Variables, GET_CHARACTERS } from "./CharactersParser";

/**
 * Style sheet for characters feed screen.
 */
const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '15%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#80C141',
        paddingTop: '5%',
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
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#318942',
    },
    status: {
        fontStyle: 'italic',
        color: '#80C141',
    },
    profilePic: {
        width: 75,
        height: 75,
    },
});

/**
 * Created function type for setPageCharacter function.
 */
type PropsFunctionParam = (id: number) => void;

/**
 * Characters component that renders a screen that provides a list of the characters in the show including
 * avatar picture, name, status, and species.
 */
export default function Characters({ setPageCharacter }: { setPageCharacter: PropsFunctionParam }) {

    const { data, loading, error } = useQuery<QueryResult, Variables>(
        GET_CHARACTERS,
        { variables: { page: 1 } }
    );

    if (!data || !data.characters) return null;
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error.toString()}</Text>;

    const onPress = (id: any) => {
        setPageCharacter(parseInt(id))
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Characters</Text>
                <View>
                    {data.characters.results.map((character, idx) => (
                        <View key={idx} style={styles.characterContainer}>
                            <View>
                                <Image source={{uri: character.image}} style={styles.profilePic}/>
                            </View>
                            <TouchableWithoutFeedback onPress={() => onPress(character.id)}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{character.name}</Text>
                                    <Text style={styles.status}>{character.status}</Text>
                                    <Text>{character.species}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
