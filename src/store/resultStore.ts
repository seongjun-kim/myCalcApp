import { makeObservable, observable, action } from 'mobx';

class ResultStore {
	@observable result = 0;

	constructor() {
		makeObservable(this);
	}

	@action
	setResult(value: number) {
		this.result = value;
	}
}

export default new ResultStore();
