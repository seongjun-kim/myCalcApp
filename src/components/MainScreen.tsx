import React from 'react';
import { StyleSheet, View, Dimensions, useColorScheme } from 'react-native';
import AppColor from '../libs/AppColor';
import Button from './Button';

// const screenHeight = Dimensions.get('screen').height;
const screenHeight = Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height);
const rowHeight = screenHeight / 6;

const styles = StyleSheet.create({
	root: {
		padding: 10,
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 200,
	},
	header: {
		flex: 1,
		padding: 5,
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		marginHorizontal: 10,
	},
	display: {
		flex: 3,
		minHeight: rowHeight,
		backgroundColor: 'white',
		borderWidth: 2,
		borderRadius: 5,
		marginHorizontal: 10,
		borderColor: AppColor.button.border,
	},
	keypadArea: {
		flex: 4,
	},
	keypadRow: {
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
	},
});

const MainScreen: React.FC = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<View style={[styles.display, isDarkMode && { backgroundColor: 'black', borderColor: 'yellow' }]} />
				<Button value="R" />
			</View>

			<View style={styles.keypadArea}>
				<View style={styles.keypadRow}>
					<Button value="1" />
					<Button value="2" />
					<Button value="3" />
					<Button value="+" />
				</View>
				<View style={styles.keypadRow}>
					<Button value="4" />
					<Button value="5" />
					<Button value="6" />
					<Button value="-" />
				</View>
				<View style={styles.keypadRow}>
					<Button value="7" />
					<Button value="8" />
					<Button value="9" />
					<Button value="x" />
				</View>
				<View style={styles.keypadRow}>
					<Button value="." />
					<Button value="0" />
					<Button value="=" />
					<Button value="÷" />
				</View>
			</View>
		</View>
	);
};

export default MainScreen;
