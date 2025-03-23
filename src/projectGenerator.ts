import fsPromises from "node:fs/promises";

import ResourceGenerator from "./resourceGenerator";
import SolutionGenerator from "./solutionGenerator";
import VCXGenerator from "./vcxGenerator";
import VCXFiltersGenerator from "./vcxFiltersGenerator";
import VCXUserGenerator from "./vcxUserGenerator";
import SourceGenerator from "./sourceGenerator";
import path from "node:path";

class ProjectGenerator {
	//* Project Info
	private _projectName: string = "Sample Project";
	set projectName (name: string) { this._projectName = name; }

	private _destination: string = "./dist";
	set destination (path: string) { this._destination = path; }


	//* Plugin Info
	private _pluginName: string = "Sample Plugin";
	set pluginName (name: string) { this._pluginName = name; }


	async generate(): Promise<void> {
		this.makeProjectStructure();
		this.makeResourceInclude();
		this.makeWinProject();
		this.makeVSCode();
		this.copySDK();
		this.makeSource();
	}


	private async makeProjectStructure(): Promise<void> {
		await fsPromises.mkdir (this._destination);
	}

	private async makeResourceInclude(): Promise<void> {
		const content: string
			= "//{{NO_DEPENDENCIES}}"                           + "\n"
			+ "// Microsoft Visual C++ generated include file." + "\n"
			+ "// Used by Resource.rc"                          + "\n"
			+ ""                                                + "\n"
			+ "// Next default values for new objects"          + "\n"
			+ "//"                                              + "\n"
			+ "#ifdef APSTUDIO_INVOKED"                         + "\n"
			+ "#ifndef APSTUDIO_READONLY_SYMBOLS"               + "\n"
			+ "#define _APS_NEXT_RESOURCE_VALUE        101"     + "\n"
			+ "#define _APS_NEXT_COMMAND_VALUE         40001"   + "\n"
			+ "#define _APS_NEXT_CONTROL_VALUE         1001"    + "\n"
			+ "#define _APS_NEXT_SYMED_VALUE           101"     + "\n"
			+ "#endif"                                          + "\n"
			+ "#endif"                                          + "\n";

		await fsPromises.mkdir (path.resolve(`${this._destination}/pipl`));

		await fsPromises.writeFile (`${this._destination}/pipl/resource.h`, content);
		await fsPromises.writeFile (`${this._destination}/pipl/${this._projectName}.r`, new ResourceGenerator (this._pluginName).generate());
	}

	private async makeWinProject() {
		const sln = new SolutionGenerator (this._projectName).generate();
		const vcx = new VCXGenerator (this._projectName).generate();
		const filters = new VCXFiltersGenerator (this._projectName).generate();
		const user = new VCXUserGenerator().generate();

		await fsPromises.mkdir (`${this._destination}/win`);

		await fsPromises.writeFile (`${this._destination}/win/${this._projectName}.sln`, sln);
		await fsPromises.writeFile (`${this._destination}/win/${this._projectName}.vcxproj`, vcx);
		await fsPromises.writeFile (`${this._destination}/win/${this._projectName}.vcxproj.filters`, filters);
		await fsPromises.writeFile (`${this._destination}/win/${this._projectName}.vcxproj.user`, user);
	}

	private async makeVSCode() {
		await fsPromises.cp (
			`D:/Projects/Development/After Effects Plugin/aviutl-circle-align/.vscode`,
			`${this._destination}/.vscode`,
			{ recursive: true }
		);
	}

	private async copySDK() {
		//* Resource Compiler *//

		await fsPromises.mkdir (`${this._destination}/scripts/`);

		await fsPromises.cp (
			`D:/Projects/Development/After Effects Plugin/After Effects SDK v25.2 - Dec 2025/Examples/Resources/`,
			`${this._destination}/scripts/resources/`,
			{ recursive: true }
		);


		//* Includes *//

		await fsPromises.mkdir (`${this._destination}/include/aesdk/`, { recursive: true });

		await fsPromises.cp (
			`D:/Projects/Development/After Effects Plugin/After Effects SDK v25.2 - Dec 2025/Examples/Headers/`,
			`${this._destination}/include/aesdk/headers/`,
			{ recursive: true }
		);

		await fsPromises.cp (
			`D:/Projects/Development/After Effects Plugin/After Effects SDK v25.2 - Dec 2025/Examples/Util/`,
			`${this._destination}/include/aesdk/utils/`,
			{ recursive: true }
		);
	}

	private async makeSource() {
		const generator = new SourceGenerator();
		generator.name = `${this._projectName}`;

		await fsPromises.mkdir (path.resolve(`${this._destination}/src/`));

		await fsPromises.writeFile (path.resolve(`${this._destination}/src/${this._projectName}.cc`), generator.generate());
	}
}

export default ProjectGenerator;
