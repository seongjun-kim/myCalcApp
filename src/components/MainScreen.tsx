import React, { useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StyleSheet, View, Text, Dimensions, useColorScheme, TouchableOpacity, Platform } from 'react-native';
import AppColor from '../libs/AppColor';
import { applyThousandSeparator } from '../libs/Util';
import Button from './Button';
import resultStore from '../../store/resultStore';

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
	const [currentValue, setCurrentValue] = useState('0');
	const [nextValue, setNextValue] = useState('0');
	const [calcMode, setCalcMode] = useState('+');

	const handleOperation = (value) => {
		setCalcMode(value);
		resultStore.setResult(parseInt(currentValue, 10));
		setCurrentValue('');
		setNextValue('0');
	};

	const handlePressButton = (value) => {
		switch (value) {
			case 'R':
				setCurrentValue('0');
				setNextValue('0');
				resultStore.setResult(0);
				break;
			case '+':
				handleOperation(value);
				break;
			case '-':
				handleOperation(value);
				break;
			case 'x':
				handleOperation(value);
				break;
			case '÷':
				handleOperation(value);
				break;
			case '=':
				const { result: priorValue } = resultStore;

				let _nextValue = parseInt(currentValue, 10);
				if (nextValue > 0) {
					_nextValue = parseInt(nextValue, 10);
				}
				// 다음 반복 연산을 위한 값 저장
				setNextValue(_nextValue);

				switch (calcMode) {
					case '+':
						setCurrentValue((priorValue + _nextValue).toString());
						resultStore.setResult(priorValue + _nextValue);
						break;
					case '-':
						setCurrentValue((priorValue - _nextValue).toString());
						resultStore.setResult(priorValue - _nextValue);
						break;
					case 'x':
						setCurrentValue((priorValue * _nextValue).toString());
						resultStore.setResult(priorValue * _nextValue);
						break;
					case '÷':
						setCurrentValue((priorValue / _nextValue).toString());
						resultStore.setResult(priorValue / _nextValue);
						break;
					default:
						break;
				}
				break;
			case '.':
				if (currentValue.indexOf('.') < 0) {
					if (currentValue.length === 0) {
						setCurrentValue('0.');
					} else {
						setCurrentValue(currentValue?.concat(value));
					}
				}
				break;
			case '0':
				if (currentValue === '0') break;
			default:
				if (currentValue === '0') setCurrentValue(value);
				else if (currentValue.length < 9) {
					setCurrentValue(currentValue?.concat(value));
				}
				break;
		}
	};

	const handlePressDisplay = () => {
		/*  [TODO] 디스플레이 입력 박스
			프레스/롱프레스하면 다이얼로그 띄워서
			디스플레이된 값을 복사하거나, 
			클립보드 값을 붙여넣을 수 있도록 기능 제공 */
		// console.log('currentValue: ', currentValue);
		// setCurrentValue(currentValue?.concat(value));
	};

	return useObserver(() => {
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
					<Button onPress={() => handlePressButton('R')} value="R" />
				</View>

				<View style={styles.keypadArea}>
					<View style={styles.keypadRow}>
						<Button onPress={() => handlePressButton('1')} value="1" />
						<Button onPress={() => handlePressButton('2')} value="2" />
						<Button onPress={() => handlePressButton('3')} value="3" />
						<Button onPress={() => handlePressButton('+')} value="+" />
					</View>
					<View style={styles.keypadRow}>
						<Button onPress={() => handlePressButton('4')} value="4" />
						<Button onPress={() => handlePressButton('5')} value="5" />
						<Button onPress={() => handlePressButton('6')} value="6" />
						<Button onPress={() => handlePressButton('-')} value="-" />
					</View>
					<View style={styles.keypadRow}>
						<Button onPress={() => handlePressButton('7')} value="7" />
						<Button onPress={() => handlePressButton('8')} value="8" />
						<Button onPress={() => handlePressButton('9')} value="9" />
						<Button onPress={() => handlePressButton('x')} value="x" />
					</View>
					<View style={styles.keypadRow}>
						<Button onPress={() => handlePressButton('.')} value="." />
						<Button onPress={() => handlePressButton('0')} value="0" />
						<Button onPress={() => handlePressButton('=')} value="=" />
						<Button onPress={() => handlePressButton('÷')} value="÷" />
					</View>
				</View>
			</View>
		);
	});
};

export default MainScreen;
