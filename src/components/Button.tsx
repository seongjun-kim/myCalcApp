import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import AppColor from '../libs/AppColor';

export interface Props {
	value: string;
}

// const screenHeight = Dimensions.get('screen').height;
const screenHeight = Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height);
const rowHeight = screenHeight / 5;

const Button: React.FC<Props> = (props) => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>{props.value}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 35,
		color: AppColor.button.text,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	button: {
		alignSelf: 'center',
		width: rowHeight,
		height: rowHeight,
		backgroundColor: AppColor.button.background,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: AppColor.button.border,
		paddingVertical: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Button;
