import React, { useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { StyleSheet, View, Text, Dimensions, useColorScheme, TouchableOpacity, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import AppColor from '../libs/AppColor';
import { applyThousandSeparator } from '../libs/Util';
import Button from './Button';
import resultStore from '../store/resultStore';

const MAX_VALUE = '9999999999';
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
		resultStore.setResult(parseFloat(currentValue));
		setCurrentValue('');
		setNextValue('0');
	};

	const handlePressButton = (value) => {
		const { result: priorValue } = resultStore;

		// '=' 버튼을 통한 반복 연산을 위한 값
		let reuseValue = parseFloat(currentValue);
		if (nextValue > 0) {
			reuseValue = parseFloat(nextValue);
		}
		setNextValue(reuseValue);

		// 최대치 초과 제한을 위한 임시 변수
		let res;

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
				switch (calcMode) {
					case '+':
						res = (priorValue + reuseValue).toString();
						if (res > MAX_VALUE) {
							res = MAX_VALUE;

							Toast.show({
								type: 'error',
								position: 'bottom',
								autoHide: true,
								text1: 'Hello',
								text2: '계산 가능 범위(~9,999,999,999)를 초과했습니다.',
							});
						}
						setCurrentValue(res);
						resultStore.setResult(priorValue + reuseValue);
						break;
					case '-':
						setCurrentValue((priorValue - reuseValue).toString());
						resultStore.setResult(priorValue - reuseValue);
						break;
					case 'x':
						res = (priorValue * reuseValue).toString();
						if (res > MAX_VALUE) {
							res = MAX_VALUE;

							Toast.show({
								type: 'error',
								position: 'bottom',
								autoHide: true,
								text1: '결과값 초과',
								text2: '계산 가능 범위(~9,999,999,999)를 초과했습니다.',
							});
						}
						setCurrentValue(res);
						resultStore.setResult(priorValue + reuseValue);
						break;
					case '÷':
						setCurrentValue((priorValue / reuseValue).toString());
						resultStore.setResult(priorValue / reuseValue);
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
			// case '0':
			default:
				// '0'의 연속입력 방지
				if (currentValue === '0' && value === '0') break;
				// '0'만 입력된 상황일 경우, 0을 입력된 값으로 변경
				else if (currentValue === '0') setCurrentValue(value);
				else if (currentValue.length < 10) {
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
