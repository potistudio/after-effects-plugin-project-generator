class SourceGenerator {
	// Project Info
	private _name: string = "";

	// Plugin Info
	private _pluginName: string = "";

	private _functions: string[] = [
		"About",
		"GlobalSetup",
		"ParamsSetup",
		"Render",
	];

	private _commands: string[] = [
		"PF_Cmd_ABOUT",
		"PF_Cmd_GLOBAL_SETUP",
		"PF_Cmd_PARAMS_SETUP",
		"PF_Cmd_RENDER",
	];

	set name (name: string) { this._name = name; }
	set pluginName (name: string) { this._pluginName = name; }

	private generateFunction (funcName: string) {
		const content: string
			= "\n"
			+ `static PF_Err ${funcName} (PF_InData *in_data, PF_OutData *out_data, PF_ParamDef *params[], PF_LayerDef *output) {` + "\n"
			+ `    PF_Err error = PF_Err_NONE;` + "\n"
			+ ``                                + "\n"
			+ `    // do something`             + "\n"
			+ ``                                + "\n"
			+ `    return error;`               + "\n"
			+ `}`                               + "\n"
			+ "\n";

		return content;
	}

	private generateEntryPoint() {
		let content: string
			= "\n"
			+ `PF_Err EffectMain (PF_Cmd cmd, PF_InData *in_data, PF_OutData *out_data, PF_ParamDef *params[], PF_LayerDef *output, void *extra) {` + "\n"
			+ `    PF_Err err = PF_Err_NONE;` + "\n"
			+ ""                              + "\n"
			+ `    switch (cmd) {` + "\n";

		for (let i = 0; i < this._commands.length; i++) {
			content += `        case ${this._commands[i]}:` + "\n";
			content += `            err = ${this._functions[i]} (in_data, out_data, params, output);` + "\n";
			content += `            break;`; + "\n";
			content += "\n";
		}

		content += "        }"                            + "\n"
		content += `    } catch (PF_Err &thrown_error) {` + "\n";
		content += `        error = thrown_error;`        + "\n";
		content += `    }`                                + "\n";
		content += ``                                     + "\n";
		content += `    return error;`                    + "\n";
		content += `}`                                    + "\n";
		content += "\n";

		return content;
	}

	generate() {
		let content: string = "";

		for (let i = 0; i < this._functions.length; i++) {
			content += this.generateFunction (this._functions[i]);
		}

		const resources: string
			= "\n"
			+ "//* Resources *//"                                + "\n"
			+ ""                                                 + "\n"
			+ "extern \"C\" {"                                   + "\n"
			+ "    DllExport PF_Err PluginDataEntryFunction2 (PF_PluginDataPtr inPtr, PF_PluginDataCB2 inPluginDataCallBackPtr, SPBasicSuite *inSPBasicSuitePtr, const char *inHostName, const char *inHostVersion) {" + "\n"
			+ "        PF_Err result = PF_Err_INVALID_CALLBACK;" + "\n"
			+ ""                                                 + "\n"
			+ "        result = PF_REGISTER_EFFECT_EXT2 ("       + "\n"
			+ "            inPtr,"                               + "\n"
			+ "            inPluginDataCallBackPtr,"             + "\n"
			+ `            "${this._pluginName}",`               + "\n"
			+ `            "POTI ${this._pluginName}",`          + "\n"
			+ "            \"POTI\","                            + "\n"
			+ "            AE_RESERVED_INFO,"                    + "\n"
			+ "            \"EffectMain\","                      + "\n"
			+ "            \"https://github.com/potistudio\""    + "\n"
			+ "        );"                                       + "\n"
			+ ""                                                 + "\n"
			+ "        return result;"                           + "\n"
			+ "    }"                                            + "\n"
			+ "}"
			+ "\n";

		return content + resources + this.generateEntryPoint();
	}
}

export default SourceGenerator;
