// [react-number-format] 자릿수 구분 쉼표 표시 로직
// https://github.com/s-yadav/react-number-format/blob/master/src/utils.js
// export function getThousandsGroupRegex(thousandsGroupStyle: string) {
export function getThousandsGroupRegex(): RegExp {
	// [TODO] 소수점 아래 숫자인 경우 콤마 구분 하지 않도록 정규식 수정 필요
	return /(\d)(?=(\d{3})+(?!\d))/g;
}

export function applyThousandSeparator(str: string): string {
	// [TEMP] 소숫점 아래 자리 콤마 구분을 피하기 위해 임시 설정
	if (str.indexOf('.') > 0) return str;

	const thousandsGroupRegex = getThousandsGroupRegex();
	let index = str.search(/[1-9]/);
	index = index === -1 ? str.length : index;
	return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, '$1,');
}
