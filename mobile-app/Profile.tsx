import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import { QueryResult, Variables, GET_PROFILE } from "./ProfileParser";
import { useQuery } from "@apollo/client";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

/**
 * Style sheet for detailed character screen.
 */
const styles = StyleSheet.create({
    container: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '15%',
    },
    profilePic: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },
    picContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '5%',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#80C141',
        paddingTop: '5%',
    },
    status: {
        fontStyle: 'italic',
        paddingTop: '2%',
        color: '#318942',
    },
    bio: {
        paddingTop: '2%',
    },
    bioContainer: {
        flexDirection: 'row',
    },
    originContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%'
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '3%'
    },
    location: {
        paddingLeft: '3%',
    },
    episodeTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#80C141',
        paddingTop: '10%',
    },
    episodeContainer: {
        paddingTop: '5%',
    },
    episodeName: {
        fontWeight: 'bold',
        color: '#318942',
    },
    episode: {
        fontStyle: 'italic',
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
 * Created function types for the setPageFeed, setPageLocation and setPageEpisode function.
 */
type PropsFunction = () => void;
type PropsFunctionParam = (id: number) => void;

/**
 * Profile component that renders a screen that provides additional details of the selected character
 * and a list of the episodes the character appears on including name and episode number.
 */
export default function Profile({ setPageFeed, id, setPageEpisode, setPageLocation }:
                                    { setPageFeed: PropsFunction, id: number, setPageEpisode: PropsFunctionParam, setPageLocation: PropsFunctionParam }) {

    const { data, loading, error } = useQuery<QueryResult, Variables>(
        GET_PROFILE,
        { variables: { id: id } });

    const onPress = () => {
        setPageFeed();
    }

    const onPressEpisode = (id: any) => {
        setPageEpisode(parseInt(id))
    }

    const onPressLocation = (id: any) => {
        setPageLocation(parseInt(id))
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
                <Text style={styles.errorMessage}>Unknown character</Text>
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
                <View style={styles.picContainer}>
                    <Image source={{uri: data.character.image}} style={styles.profilePic}/>
                </View>
                <View>
                    <Text style={styles.name}>{data.character.name}</Text>
                </View>
                <View>
                    <Text style={styles.status}>{data.character.status}</Text>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.bio}>{data.character.gender}</Text>
                    <Text style={styles.bio}> </Text>
                    <Text style={styles.bio}>{data.character.species}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => onPressLocation(parseInt(data.character.origin.id))}>
                    <View style={styles.originContainer}>
                        <MaterialCommunityIcons name="home" color={'#80C141'} size={20}/>
                        <Text style={styles.location}>{data.character.origin.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onPressLocation(parseInt(data.character.location.id))}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-sharp" color={'#80C141'} size={20} />
                        <Text style={styles.location}>{data.character.location.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.episodeTitle}>Episodes</Text>
                {data.character.episode.map((episode, idx) => (
                    <View key={idx} style={styles.episodeContainer}>
                        <TouchableWithoutFeedback onPress={() => onPressEpisode(parseInt(episode.id))}>
                            <Text style={styles.episodeName}>{episode.name}</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.episode}>{episode.episode}</Text>
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
