import { create } from "xmlbuilder2";

class VCXUserGenerator {
	constructor() { }

	generate() {
		const xml = create ({ version: "1.0", encoding: "utf-8" })
			.ele ("Project", { ToolsVersion: "Current", xmlns: "http://schemas.microsoft.com/developer/msbuild/2003" })
				.ele ("PropertyGroup").up()
			.up();

		return xml.end ({ prettyPrint: true });
	}
}

export default VCXUserGenerator;
