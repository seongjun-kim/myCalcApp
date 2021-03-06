/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'typescript';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import MainScreen from './components/MainScreen';
import StoreProvider from './store';

const App: () => Node = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		flex: 1,
		backgroundColor: isDarkMode ? 'black' : 'white',
	};
	return (
		<StoreProvider>
			<SafeAreaView style={backgroundStyle}>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				<MainScreen />
				<Toast ref={(ref) => Toast.setRef(ref)} />
			</SafeAreaView>
		</StoreProvider>
	);
};

export default App;
