class ResourceGenerator {
	private _kind             = "AEEffect";
	private _name             = "AviUtl Circle Align";
	private _category         = "POTI";
	private _entryPoint       = "EffectMain";
	private _effectVersion    = "591361";  // 1.2
	private _infoFlags        = "0";
	private _globalOutFlags   = "0x02000000";  // 50332160
	private _globalOutFlags2  = "0x08000000";  // 134217728
	private _effectMatchName  = "POTI AviUtl Circle Align";
	private _effectSupportURL = "https://github.com/potistudio";

	constructor (name: string) {
		this._name = name;
		this._effectMatchName = `POTI ${name}`;
	}

	generate() {
		const content
			= "#include \"AEConfig.h\""                                                                        + "\n"
			+ "#include \"AE_EffectVers.h\""                                                                   + "\n"
			+ ""                                                                                               + "\n"
			+ "#ifndef AE_OS_WIN"                                                                              + "\n"
			+ "    #include <AE_General.r>"                                                                    + "\n"
			+ "#endif"                                                                                         + "\n"
			+ ""                                                                                               + "\n"
			+ "resource 'PiPL' (16000) {"                                                                      + "\n"
			+ "    {"                                                                                          + "\n"
			+ "        Kind { " + this._kind + " },"                                                           + "\n"
			+ "        Name { \"" + this._name + "\" },"                                                       + "\n"
			+ "        Category { \"" + this._category + "\" },"                                               + "\n"
			+ ""                                                                                               + "\n"
			+ "        #ifdef AE_OS_WIN"                                                                       + "\n"
			+ "            #ifdef AE_PROC_INTELx64"                                                            + "\n"
			+ "                CodeWin64X86 { \"" + this._entryPoint + "\" },"                                 + "\n"
			+ "            #endif"                                                                             + "\n"
			+ "        #else"                                                                                  + "\n"
			+ "            #ifdef AE_OS_MAC"                                                                   + "\n"
			+ "                CodeMacIntel64 { \"" + this._entryPoint + "\" },"                               + "\n"
			+ "                CodeMacARM64 { \"" + this._entryPoint + "\" },"                                 + "\n"
			+ "            #endif"                                                                             + "\n"
			+ "        #endif"                                                                                 + "\n"
			+ ""                                                                                               + "\n"
			+ "        AE_PiPL_Version { " + "2" + ", " + "0" + " },"                                          + "\n"
			+ "        AE_Effect_Spec_Version { " + "PF_PLUG_IN_VERSION" + ", " + "PF_PLUG_IN_SUBVERS" + " }," + "\n"
			+ "        AE_Effect_Version { " + this._effectVersion + " },"                                     + "\n"
			+ "        AE_Effect_Info_Flags { " + this._infoFlags + " },"                                      + "\n"
			+ "        AE_Effect_Global_OutFlags { " + this._globalOutFlags + " },"                            + "\n"
			+ "        AE_Effect_Global_OutFlags_2 { " + this._globalOutFlags2 + " },"                         + "\n"
			+ "        AE_Effect_Match_Name { \"" + this._effectMatchName + "\" },"                            + "\n"
			+ "        AE_Reserved_Info { " + "0" + " },"                                                      + "\n"
			+ "        AE_Effect_Support_URL { \"" + this._effectSupportURL + "\" }"                           + "\n"
			+ "    }"                                                                                          + "\n"
			+ "};";

		return content;
	}
}

export default ResourceGenerator;
