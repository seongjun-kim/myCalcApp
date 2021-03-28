/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'typescript';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainScreen from './src/components/MainScreen';

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

const App: () => Node = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		flex: 1,
		backgroundColor: isDarkMode ? Colors.darker : 'white',
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<MainScreen />
		</SafeAreaView>
	);
};

export default App;
