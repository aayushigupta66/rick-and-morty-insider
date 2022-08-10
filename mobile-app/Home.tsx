import React from 'react';
import { Image, StyleSheet, View} from "react-native";

/**
 * Style sheet for home screen.
 */
const styles = StyleSheet.create({
    pic: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    }
});

/**
 * Home component that renders a screen with a Rick and Morty poster.
 */
export default function Home() {
    return (
        <View>
            <Image source={{uri: "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg"}} style={styles.pic}/>
        </View>
    );
}
