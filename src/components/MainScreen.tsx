import React, { useContext } from 'react';
import { StyleSheet, View, Text, Dimensions, useColorScheme, TouchableOpacity, Platform } from 'react-native';
import { Context } from '../store';
import AppColor from '../libs/AppColor';
import { applyThousandSeparator } from '../libs/Util';
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
		alignItems: 'flex-end',
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
		paddingHorizontal: 10,
		marginBottom: 20,
		borderColor: AppColor.button.border,
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
	displayText: {
		textAlign: 'right',
		paddingVertical: 10,
		fontSize: 30,
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
	const { currentValue } = useContext(Context);

	const handlePressDisplay = () => {
		/*  [TODO] 디스플레이 입력 박스
			프레스/롱프레스하면 다이얼로그 띄워서
			디스플레이된 값을 복사하거나, 
			클립보드 값을 붙여넣을 수 있도록 기능 제공 */
		// console.log('currentValue: ', currentValue);
		// setCurrentValue(currentValue?.concat(value));
	};

	return (
		<View style={styles.root}>
			<View style={styles.header}>
				<TouchableOpacity
					style={[styles.display, isDarkMode && { backgroundColor: 'black', borderColor: 'yellow' }]}
					onPress={handlePressDisplay}
					onLongPress={handlePressDisplay}
				>
					<Text
						style={[
							styles.displayText,
							isDarkMode && { backgroundColor: 'black', borderColor: 'yellow', color: 'white' },
						]}
					>
						{applyThousandSeparator(currentValue)}
					</Text>
				</TouchableOpacity>
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
