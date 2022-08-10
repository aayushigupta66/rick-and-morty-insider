import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Chart from './Chart';

/**
 * Style sheet for visualization screen.
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
        paddingBottom: '5%'
    },
    instruction: {
        paddingTop: '5%',
        paddingLeft: '3%',
        fontSize: 15,
    },
    buttonContainer: {
        paddingTop: '5%',
        flexDirection: 'row',
        paddingBottom: '3%'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1.25,
        borderRadius: 4,
    },
    submitContainer: {
        flexDirection: 'row',
        paddingLeft: '1%',
    }
});

/**
 * Visualization component that renders form where users can input a range of episodes to analyze.
 */
export default function Visualization() {

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [range, setRange] = useState<number[]>([]);

    function onPressSubmit() {
        let arr = new Array();
        for (let i = parseInt(start); i <= parseInt(end); i++) {
            arr.push(i);
        }
        setRange(arr);
    }

    const renderResults = () => {
        if (range.length == 0) {
            return <></>;
        } else {
            return <Chart range={range} />
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Visualization</Text>
                <Text style={styles.instruction}>Starting episode number</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={setStart}
                    value={start}
                />
                <Text style={styles.instruction}>Ending episode number</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={setEnd}
                    value={end}
                />
                <View style={styles.submitContainer}>
                    <Button
                        title='Submit'
                        color="#80C141"
                        onPress={onPressSubmit}
                    />
                </View>
                {renderResults()}
            </View>
        </ScrollView>
    );
}
