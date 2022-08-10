import React, { useState } from 'react';
import { View } from 'react-native';
import Profile from "./Profile";
import Characters from "./Characters";
import Episode from "./Episode";
import Location from "./Location";

/**
 * Feed component that controls what screen is being rendered based on onPress handlers.
 */
export default function Feed() {

    const [page, setPage] = useState({ screen: '', id: 0 });

    const setPageFeed = (): void => {
        setPage({ screen: '', id: 0 });
    }

    const setPageCharacter = (id: number): void => {
        setPage({ screen: 'character', id: id })
    }

    const setPageLocation = (id: number): void => {
        setPage({ screen: 'location', id: id })
    }

    const setPageEpisode = (id: number): void => {
        setPage({ screen: 'episode', id: id })
    }

    const renderResults = () => {
        switch (page.screen) {
            case 'character':
                return <Profile id={page.id} setPageFeed={setPageFeed} setPageEpisode={setPageEpisode} setPageLocation={setPageLocation} />;
            case 'episode':
                return <Episode id={page.id} setPageFeed={setPageFeed} setPageCharacter={setPageCharacter} />
            case 'location':
                return <Location id={page.id} setPageFeed={setPageFeed} setPageCharacter={setPageCharacter} />
            default:
                return <Characters setPageCharacter={setPageCharacter} />
        }
    }

    return(
        <View>
            {renderResults()}
        </View>
    );
};
