import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { QueryResult, Variables, GET_VISUALIZATION } from "./VisualizationParser";
import { useQuery } from "@apollo/client";

/**
 * Style sheet for visualization chart screen.
 */
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#80C141',
        paddingTop: '10%',
    },
    keyTitle: {
        fontSize: 23,
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
    profilePic: {
        width: 75,
        height: 75,
    },
    species: {
        fontStyle: 'italic',
    },
    percent: {
        paddingTop: '3%',
        fontSize: 16,
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
 * Visualization component that renders form where users can input a range of episodes to analyze.
 */
export default function Chart(props: any) {

    const { data, loading, error } = useQuery<QueryResult, Variables>(
        GET_VISUALIZATION,
        { variables: { ids: props.range } });

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
                <Text style={styles.errorMessage}>Unable to render visualization.</Text>
                <Text>{error.toString()}</Text>
            </View>
        );
    }
    if (!data) {
        return null;
    }

    let dict: {
        [id: string] : info;
    } = {};

    interface info {
        name: string;
        image: string;
        species: string;
        count: number;
    }

    let top6Dict: Array<topInfo> = [];

    interface topInfo {
        name: string;
        image: string;
        species: string;
        count: number;
        color: string;
    }

    let pieData: Array<dataType> = [];

    interface dataType {
        name: string,
        value: number,
        color: string,
    }

    /**
     * Code to parse api response and add to dictionary.
     */
    if (data) {
        // add data and character count to dict
        for (let i = 0; i < data.episodesByIds.length; i++) {
            for (let j = 0; j < data.episodesByIds[i].characters.length; j++) {
                if (data.episodesByIds[i].characters[j].id in dict) {
                    dict[data.episodesByIds[i].characters[j].id] = {
                        name: data.episodesByIds[i].characters[j].name,
                        image: data.episodesByIds[i].characters[j].image,
                        species: data.episodesByIds[i].characters[j].species,
                        count: dict[data.episodesByIds[i].characters[j].id].count + 1
                    };
                }
                else {
                    dict[data.episodesByIds[i].characters[j].id] = {
                        name: data.episodesByIds[i].characters[j].name,
                        image: data.episodesByIds[i].characters[j].image,
                        species: data.episodesByIds[i].characters[j].species,
                        count: 1
                    };
                }
            }
        }

        // find top 6 characters
        let items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
        });

        type arrType = Array<[string, info]>;

        items.sort(function(first: arrType, second: arrType) {
            return second[1]["count"] - first[1]["count"];
        });

        let colors: string[] = ["#80C141", "#318942", "#03AFC5", "#AAD4E9", "#865322", "#C3D948"];

        // populate pie data
        for (let i = 0; i < 6; i++) {
            pieData.push({ name: items[i][0], value: items[i][1]["count"], color: colors[i] });
            top6Dict.push({ name: items[i][1]["name"], image: items[i][1]["image"], species: items[i][1]["species"], count: items[i][1]["count"] , color: colors[i] });
        }
    }

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        barPercentage: 0.5,
    };

    return (
        <View>
            <Text style={styles.title}>Results</Text>
            <PieChart
                data={pieData}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').width}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                hasLegend={false}
                paddingLeft={"66"}
                absolute
            />
            <Text style={styles.keyTitle}>Key</Text>
            <View>
                {top6Dict.map((character, idx) => (
                    <View key={idx} style={styles.characterContainer}>
                        <View>
                            <Image source={{uri: character.image}} style={styles.profilePic}/>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: character.color}}>{character.name}</Text>
                            <Text style={styles.species}>{character.species}</Text>
                            <Text style={styles.percent}>{character.count} episodes</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
