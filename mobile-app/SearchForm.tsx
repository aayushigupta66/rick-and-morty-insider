import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView} from "react-native";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import SearchResults from "./SearchResults";

/**
 * Style sheet for search form screen.
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
    instruction: {
        paddingTop: '10%',
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
 * Array of radio buttons for category section in search form.
 */
const radioButtonsData: RadioButtonProps[] = [{
    id: '1',
    label: 'Character',
    value: 'character'
}, {
    id: '2',
    label: 'Episode',
    value: 'episode'
}, {
    id: '3',
    label: 'Location',
    value: 'location'
}]

/**
 * Created function types for the setPageFeed, setPageLocation and setPageEpisode function.
 */
type PropsFunction = () => void;
type PropsFunctionParam = (id: number) => void;

/**
 * Search component that renders a screen that provides a search form to search the db's
 * characters, episodes, and locations and prints its results.
 */
export default function SearchForm({ setPageFeed, setPageCharacter, setPageEpisode, setPageLocation }:
                                       { setPageFeed: PropsFunction, setPageCharacter: PropsFunctionParam, setPageEpisode: PropsFunctionParam, setPageLocation: PropsFunctionParam }) {

    const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData);
    const [text, onChangeText] = useState('');
    const [search, setSearch] = useState({ category: '', keyword: '' });

    function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
        setRadioButtons(radioButtonsArray);
    }

    function onPressSubmit() {
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].selected && radioButtons[i].value) {
                setSearch({ category: radioButtons[i].value!, keyword: text })
            }
        }
    }

    const renderResults = () => {
        switch (search.category) {
            case 'character':
                return <SearchResults keyword={search.keyword} character={true} location={false} episode={false}
                                      setPageFeed={setPageFeed} setPageCharacter={setPageCharacter} setPageEpisode={setPageEpisode} setPageLocation={setPageLocation} />;
            case 'episode':
                return <SearchResults keyword={search.keyword} character={false} location={false} episode={true}
                                      setPageFeed={setPageFeed} setPageCharacter={setPageCharacter} setPageEpisode={setPageEpisode} setPageLocation={setPageLocation} />;
            case 'location':
                return <SearchResults keyword={search.keyword} character={false} location={true} episode={false}
                                      setPageFeed={setPageFeed} setPageCharacter={setPageCharacter} setPageEpisode={setPageEpisode} setPageLocation={setPageLocation} />;
            default:
                return <></>;
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Search</Text>
                <Text style={styles.instruction}>Enter keyword and select category</Text>
                <View style={styles.buttonContainer}>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
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
