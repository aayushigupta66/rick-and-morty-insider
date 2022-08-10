import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import Home from "./Home";
import Visualization from "./Visualization";
import Search from "./Search";
import Feed from "./Feed";

/**
 * Creating http link using GraphQL uri.
 */
export const link = createHttpLink({
    uri: 'https://rickandmortyapi.com/graphql'
});

/**
 * Apollo client connecting to API.
 */
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

const Tab = createBottomTabNavigator();

/**
 * Creates a tab navigator using the bottom tab navigator created in Tab to allow navigation between components and
 * adds styled icons.
 * @constructor NA
 */
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#80C141',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-search-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Visualization"
                component={Visualization}
                options={{
                    tabBarLabel: 'Visualization',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="circular-graph" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

/**
 * App component that controls the entire application with the NavigationContainer and MyTabs component, surrounded by
 * Apollo Client.
 * @constructor NA
 */

export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </ApolloProvider>
    );
}
