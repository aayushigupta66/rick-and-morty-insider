import React from 'react';
import {StyleSheet, Text, View, Image, TouchableWithoutFeedback} from "react-native";
import { QueryResult, Variables, GET_SEARCH } from "./SearchParser";
import { useQuery } from "@apollo/client";

/**
 * Style sheet for search results screen.
 */
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#80C141',
        paddingTop: '10%',
    },
    paddingCharacter: {
        paddingTop: '10%'
    },
    paddingOther: {
        paddingTop: '7%'
    },
    characterContainer: {
        paddingBottom: '10%',
        flexDirection: 'row'
    },
    textContainer: {
        paddingTop: '3%',
        paddingLeft: '7%',
        paddingRight: '25%'
    },
    otherTextContainer: {
        paddingRight: '5%'
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
    error: {
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%'
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
 * Created function types for the setPageFeed, setPageLocation and setPageEpisode function.
 */
type PropsFunction = () => void;
type PropsFunctionParam = (id: number) => void;

/**
 * Search results component that renders a list of results depending on the category selected in the search form.
 */
export default function SearchResults({ keyword, character, location, episode, setPageFeed, setPageCharacter, setPageEpisode, setPageLocation }:
                                          { keyword: string, character: boolean, location: boolean, episode: boolean,
                                              setPageFeed: PropsFunction, setPageCharacter: PropsFunctionParam, setPageEpisode: PropsFunctionParam, setPageLocation: PropsFunctionParam }) {

    const { data, loading, error } = useQuery<QueryResult, Variables>(
        GET_SEARCH,
        { variables: { name: keyword, character: character, location: location, episode: episode } });

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
                <Text style={styles.errorMessage}>Results not found. Please try a different query.</Text>
                <Text>{error.toString()}</Text>
            </View>
        );
    }
    if (!data) {
        return null;
    }

    const onPress = () => {
        setPageFeed();
    }

    const onPressCharacter = (id: any) => {
        setPageCharacter(parseInt(id))
    }

    const onPressEpisode = (id: any) => {
        setPageEpisode(parseInt(id))
    }

    const onPressLocation = (id: any) => {
        setPageLocation(parseInt(id))
    }

    const renderResults = () => {
        if (character === true) {
            return (<View style={styles.paddingCharacter}>
                {data.characters.results.map((character, idx) => (
                    <View key={idx} style={styles.characterContainer}>
                        <View>
                            <Image source={{uri: character.image}} style={styles.profilePic}/>
                        </View>
                        <TouchableWithoutFeedback onPress={() => onPressCharacter(character.id)}>
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{character.name}</Text>
                                <Text>{character.species}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ))}
            </View>);
        } else if (location === true) {
            return (<View style={styles.paddingOther}>
                {data.locations.results.map((location, idx) => (
                    <View key={idx} style={styles.characterContainer}>
                        <TouchableWithoutFeedback onPress={() => onPressLocation(location.id)}>
                            <View style={styles.otherTextContainer}>
                                <Text style={styles.name}>{location.name}</Text>
                                <Text>{location.dimension}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ))}
            </View>);
        } else if (episode === true) {
            return (<View style={styles.paddingOther}>
                {data.episodes.results.map((episode, idx) => (
                    <View key={idx} style={styles.characterContainer}>
                        <TouchableWithoutFeedback onPress={() => onPressEpisode(episode.id)}>
                            <View style={styles.otherTextContainer}>
                                <Text style={styles.name}>{episode.name}</Text>
                                <Text>{episode.episode}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ))}
            </View>);
        }
        else {
            return <></>;
        }
    }

    return (
        <View>
            <Text style={styles.title}>Results</Text>
            {renderResults()}
        </View>
    );
}
