import React, { useReducer, createContext } from 'react';

export const Context = createContext();

// [TODO] compute 함수 별도로 두고, 최대치 제한
// const MAX_VALUE = '9999999999';

const initialState = {
	priorValue: '',
	currentValue: '0',
	formula: '',
	type: '',
};

const reducer = (state, action) => {
	const { value } = action;
	const { priorValue, currentValue, formula, type } = state;
	let finalFormula = '';
	let result = '';

	switch (value) {
		case 'R':
			return {
				priorValue: '',
				currentValue: '0',
				formula: '',
				type: 'R',
			};
		case '+':
			// [TODO] 기존 결과물에 이어서 연산이 가능하도록 추가 조치 필요
			if (type) return state;

			return {
				...state,
				currentValue: '',
				formula: formula.concat(value),
				type: '+',
			};
		case '-':
			if (type) return state;
			return {
				...state,
				currentValue: '',
				formula: formula.concat(value),
				type: '-',
			};
		case 'x':
			if (type) return state;
			return {
				...state,
				currentValue: '',
				formula: formula.concat('*'),
				type: '*',
			};
		case '÷':
			if (type) return state;
			return {
				...state,
				currentValue: '',
				formula: formula.concat('/'),
				type: '/',
			};
		case '=':
			if (priorValue) {
				finalFormula = currentValue.concat(type).concat(priorValue);
				result = new Function(`return ${finalFormula}`)().toString();
				return {
					...state,
					currentValue: result,
					formula: '',
				};
			}

			finalFormula = /^\d.*\d/g.exec(formula)[0];
			result = new Function(`return ${finalFormula}`)().toString();
			return {
				...state,
				priorValue: currentValue,
				currentValue: result,
				formula: '',
			};
		case '.':
			// [21-03-30] 정수형 계산 기능만 제공
			break;
		default:
			// '0'의 연속입력 방지
			if (currentValue === '0') {
				if (value === '0') return state;
				// '0'만 입력된 상황일 경우, 0을 입력된 값으로 변경
				return {
					...state,
					currentValue: value,
					formula: formula.concat(value),
					type: '',
				};
			}
			if (currentValue.length < 10) {
				// 처음 입력 또는 연산 재시작(= 버튼으로 연산 결과 받고 난 뒤) 할 경우 초깃값 세팅
				if (formula === '') {
					return {
						...state,
						currentValue: value,
						formula: formula.concat(value),
					};
				}
				return {
					...state,
					currentValue: `${currentValue}${value}`,
					formula: formula.concat(value),
				};
			}
			// throw new Error();
			return state;
	}
};

const StoreProvider = ({ children }: any) => {
	const [state, contextDispatch] = useReducer(reducer, initialState);

	return <Context.Provider value={{ currentValue: state.currentValue, contextDispatch }}>{children}</Context.Provider>;
};

export default StoreProvider;
