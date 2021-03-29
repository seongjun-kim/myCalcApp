import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity, useColorScheme, Platform } from 'react-native';
import PropTypes from 'prop-types';
import AppColor from '../libs/AppColor';

export interface Props {
	value: string;
}

const screenHeight = Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height);
const rowHeight = screenHeight / 6;

const styles = StyleSheet.create({
	button: {
		margin: 10,
		alignSelf: 'center',
		minWidth: rowHeight,
		minHeight: rowHeight,
		backgroundColor: AppColor.button.background,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: AppColor.button.border,
		justifyContent: 'center',
		alignItems: 'center',
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50, 50, 50)',
				shadowOpacity: 0.3,
				shadowRadius: 5,
				shadowOffset: {
					height: -1,
					width: 0,
				},
			},
			android: {
				elevation: 3,
			},
		}),
	},
	buttonText: {
		fontSize: 35,
		color: AppColor.button.text,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

const Button: React.FC<Props> = ({ value, onPress: handlePress }) => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<TouchableOpacity
			style={[styles.button, isDarkMode && { backgroundColor: 'gray', borderColor: 'yellow' }]}
			onPress={handlePress}
		>
			<Text style={[styles.buttonText, isDarkMode && { color: 'gold' }]}>{value}</Text>
		</TouchableOpacity>
	);
};

Button.propTypes = {
	value: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
};

export default Button;
