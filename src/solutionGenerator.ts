class SolutionGenerator {
	private _name: string = "";

	constructor (name: string) {
		this._name = name;
	}

	generate() {
		return this.generateVersionInfo() + this.generateProjectInfo() + this.generateGlobalInfo();
	}

	private generateVersionInfo() {
		const formatVersion = "12.00";
		const studioVersion = "17.13.35825.156 d17.13";
		const minimumVersion = "10.0.40219.1";

		const content
			= "Microsoft Visual Studio Solution File, Format Version " + formatVersion + "\n"
			+ "# Visual Studio Version " + studioVersion.split (".")[0]                + "\n"
			+ "VisualStudioVersion = " + studioVersion                                 + "\n"
			+ "MinimumVisualStudioVersion = " + minimumVersion                         + "\n";

		return content;
	}

	private generateProjectInfo() {
		const uudi1 = "8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942";
		const uuid2 = "8DA95305-4848-4BC6-8E9E-5C76D4F3D9F5";

		const content
			= "Project(\"{" + uudi1 + "}\") = \"" + this._name + "\", \"" + this._name + ".vcxproj\", \"{" + uuid2 + "}\"" + "\n"
			+ "EndProject"                                                                                                 + "\n";

		return content;
	}

	private generateGlobalInfo() {
		const uuid = "8DA95305-4848-4BC6-8E9E-5C76D4F3D9F5";

		const content
			= "Global"                                                          + "\n"
			+ "    GlobalSection(SolutionConfigurationPlatforms) = preSolution" + "\n"
			+ "        Debug|x64 = Debug|x64"                                   + "\n"
			+ "        Release|x64 = Release|x64"                               + "\n"
			+ "    EndGlobalSection"                                            + "\n"
			+ "    GlobalSection(ProjectConfigurationPlatforms) = postSolution" + "\n"
			+ "        " + uuid + ".Debug|x64.ActiveCfg = Debug|x64"            + "\n"
			+ "        " + uuid + ".Debug|x64.Build.0 = Debug|x64"              + "\n"
			+ "        " + uuid + ".Release|x64.ActiveCfg = Release|x64"        + "\n"
			+ "        " + uuid + ".Release|x64.Build.0 = Release|x64"          + "\n"
			+ "    EndGlobalSection"                                            + "\n"
			+ "    GlobalSection(SolutionProperties) = preSolution"             + "\n"
			+ "        HideSolutionNode = FALSE"                                + "\n"
			+ "    EndGlobalSection"                                            + "\n"
			+ "    GlobalSection(ExtensibilityGlobals) = postSolution"          + "\n"
			+ "        SolutionGuid = {03FF203A-3651-4D48-9B8A-C87454C7C7A1}"   + "\n"
			+ "    EndGlobalSection"                                            + "\n"
			+ "EndGlobal"                                                       + "\n";

		return content;
	}
}

export default SolutionGenerator;
