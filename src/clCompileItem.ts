class ClCompileItem {
	private _arg: string;

	constructor (args: string) {
		this._arg = args;
	}

	get include(): string {
		return this._arg;
	}

	get content(): string {
		return `<ClCompile Include="${this._arg}" />`;
	}
}

export default ClCompileItem;
