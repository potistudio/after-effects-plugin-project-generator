import { create } from "xmlbuilder2";

class VCXFiltersGenerator {
	private _guid = "ac80c6a1-ac7f-41cb-b723-b76e676ec4c9";
	private _name = "SDK_Noise";

	constructor (name: string) {
		this._name = name;
	}

	generate() {
		const xml = create ({ version: "1.0", encoding: "utf-8" })
			.ele ("Project", { ToolsVersion: "Current", xmlns: "http://schemas.microsoft.com/developer/msbuild/2003" })
				.ele ("ItemGroup")
					.ele ("Filter", { Include: "Resources" })
						.ele ("UniqueIdentifier").txt ("{" + this._guid + "}").up()
					.up()
				.up()
				.ele ("ItemGroup")
					.ele ("ClInclude", { Include: "..\\pipl\\resources.h" })
						.ele ("Filter").txt ("Resources").up()
					.up()
				.up()
				.ele ("ItemGroup")
					.ele ("CustomBuild", { Include: "..\\pipl\\" + this._name + ".r" })
						.ele ("Filter").txt ("Resources").up()
					.up()
				.up()
			.up();

		return xml.end ({ prettyPrint: true });
	}
}

export default VCXFiltersGenerator;
