import { create } from "xmlbuilder2";

class VCXGenerator {
	private _languageStandard = "17";
	private _name = "SDK_Noise";
	private _guid = "82675920-EFDC-4880-84E3-4D234C1A86BC";
	private _sourceDir = "src\\";
	private _sourceFiles = [
		"Source.cc",
	];
	private _headerFiles = [
		"Source.hh",
	];

	constructor (name: string) {
		this._name = name;
	}

	generate() {
		// Release x64
		const xml = create ({ version: "1.0", encoding: "utf-8" })
			.ele ("Project", { DefaultTargets: "Build", ToolsVersion: "15.0", xmlns: "http://schemas.microsoft.com/developer/msbuild/2003" })
				.ele ("ItemGroup", { Label: "ProjectConfigurations" })
					.ele ("ProjectConfiguration", { Include: "Debug|x64" })
						.ele ("Configuration").txt ("Debug").up()
						.ele ("Platform")     .txt ("x64").up()
					.up()
					.ele ("ProjectConfiguration", { Include: "Release|x64" })
						.ele ("Configuration").txt ("Release").up()
						.ele ("Platform")     .txt ("x64").up()
					.up()
				.up()

				// Source Files

				// Header Files
				.ele ("ItemGroup")
					.ele ("ClInclude", { Include: "..\\pipl\\resources.h"}).up()
				.up()

				// Resources
				.ele ("ItemGroup")
					.ele ("CustomBuild", { Include: "..\\pipl\\" + this._name + ".r" })
						.ele ("FileType").txt ("Document").up()

						.ele ("Command", { Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'" }).txt ("cl /I \"$(ProjectDir)..\\include\\aesdk\\headers\" /EP \"..\\pipl\"\\\\\"%(Filename).r\" &gt; \"$(IntDir)\"\\\\\"%(Filename).rr\"\n\"$(ProjectDir)..\\scripts\\resources\\PiPLTool\" \"$(IntDir)%(Filename).rr\" \"$(IntDir)%(Filename).rrc\"\ncl /D \"MSWindows\" /EP $(IntDir)%(Filename).rrc &gt; \"$(ProjectDir)..\\pipl\\\"\\\\\"%(Filename)\".rc").up()
						.ele ("Message", { Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'" }).txt ("Compiling the PiPL").up()
						.ele ("Outputs", { Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'" }).txt ("$(ProjectDir)..\\pipl\\%(Filename).rc;%(Outputs)").up()

						.ele ("Command", { Condition: "'$(Configuration)|$(Platform)'=='Release|x64'" }).txt ("cl /I \"$(ProjectDir)..\\include\\aesdk\\headers\" /EP \"..\\pipl\"\\\\\"%(Filename).r\" &gt; \"$(IntDir)\"\\\\\"%(Filename).rr\"\n\"$(ProjectDir)..\\scripts\\resources\\PiPLTool\" \"$(IntDir)%(Filename).rr\" \"$(IntDir)%(Filename).rrc\"\ncl /D \"MSWindows\" /EP $(IntDir)%(Filename).rrc &gt; \"$(ProjectDir)..\\pipl\\\"\\\\\"%(Filename)\".rc").up()
						.ele ("Message", { Condition: "'$(Configuration)|$(Platform)'=='Release|x64'" }).txt ("Compiling the PiPL").up()
						.ele ("Outputs", { Condition: "'$(Configuration)|$(Platform)'=='Release|x64'" }).txt ("$(ProjectDir)..\\pipl\\%(Filename).rc;%(Outputs)").up()
					.up()
				.up()

				.ele ("PropertyGroup", { Label: "Globals" })
					.ele ("VCProjectVersion")            .txt (this._languageStandard).up()
					.ele ("ProjectGuid")                 .txt ("{" + this._guid + "}").up()
					.ele ("RootNamespace")               .txt (this._name).up()
					.ele ("WindowsTargetPlatformVersion").txt ("10.0").up()
				.up()

				.ele ("Import", { Project: "$(VCTargetsPath)\\Microsoft.Cpp.Default.props" }).up()

				// General
				.ele ("PropertyGroup", { Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'", Label: "Configuration" })
					.ele ("CharacterSet")            .txt ("Unicode").up()
					.ele ("ConfigurationType")       .txt ("DynamicLibrary").up()
					.ele ("PlatformToolset")         .txt ("v143").up()
					.ele ("UseDebugLibraries")       .txt ("true").up()
					.ele ("WholeProgramOptimization").txt ("false").up()
				.up()
				.ele ("PropertyGroup", { Condition: "'$(Configuration)|$(Platform)'=='Release|x64'", Label: "Configuration" })
					.ele ("CharacterSet")            .txt ("Unicode").up()
					.ele ("ConfigurationType")       .txt ("DynamicLibrary").up()
					.ele ("PlatformToolset")         .txt ("v143").up()
					.ele ("UseDebugLibraries")       .txt ("false").up()
					.ele ("WholeProgramOptimization").txt ("true").up()
				.up()

				.ele ("Import", { Project: "$(VCTargetsPath)\\Microsoft.Cpp.props" }).up()

				.ele ("ImportGroup", { Label: "PropertySheets", Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'" })
					.ele ("Import", { Project: "$(UserRootDir)\\Microsoft.Cpp.$(Platform).user.props", Condition: "exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')", Label: "LocalAppDataPlatform" }).up()
				.up()
				.ele ("ImportGroup", { Label: "PropertySheets", Condition: "'$(Configuration)|$(Platform)'=='Release|x64'" })
					.ele ("Import", { Project: "$(UserRootDir)\\Microsoft.Cpp.$(Platform).user.props", Condition: "exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')", Label: "LocalAppDataPlatform" }).up()
				.up()

				.ele ("PropertyGroup", { Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'" })
					.ele ("TargetExt").txt (".aex").up()
					.ele ("OutDir")   .txt ("$(AE_PLUGIN_BUILD_DIR)\\Effects\\poti\\").up()
				.up()
				.ele ("PropertyGroup", { Condition: "'$(Configuration)|$(Platform)'=='Release|x64'" })
					.ele ("TargetExt").txt (".aex").up()
					.ele ("OutDir")   .txt ("$(ProjectDir)..\\build\\win\\").up()
				.up()

				.ele ("ItemDefinitionGroup",  { Condition: "'$(Configuration)|$(Platform)'=='Debug|x64'" })
					.ele ("ClCompile")
						// C/C++ / General
						.ele ("WarningLevel")                .txt ("Level3").up()
						.ele ("TreatWarningAsError")         .txt ("false").up()
						.ele ("MultiProcessorCompilation")   .txt ("true").up()
						.ele ("AdditionalIncludeDirectories").txt ("..\\include\\aesdk\\headers\\SP;..\\include\\aesdk\\headers;..\\include\\aesdk\\utils;%(AdditionalIncludeDirectories)").up()

						// C/C++ / Preprocessor
						.ele ("PreprocessorDefinitions")     .txt ("DEBUG;_DEBUG;WINDOWS;_WINDOWS;UNICODE;_UNICODE;" + "%(PreprocessorDefinitions)").up()

						// C/C++ / Code Generation
						.ele ("RuntimeLibrary")              .txt ("MultiThreadedDebugDLL").up()
						.ele ("FunctionLevelLinking")        .txt ("true").up()
						.ele ("EnableParallelCodeGeneration").txt ("true").up()
						.ele ("BrowseInformation")           .txt ("true").up()

						// C/C++ / Language
						.ele ("LanguageStandard")            .txt ("stdcpp" + this._languageStandard).up()  // !
						.ele ("LanguageStandard_C")          .txt ("stdc" + this._languageStandard).up()  // !
						.ele ("ConformanceMode")             .txt ("true").up()
					.up()

					.ele ("Link")
						// Manifest File
						.ele ("EnableUAC")                   .txt ("false").up()

						// Debugging
						.ele ("GenerateDebugInformation")    .txt ("true").up()

						// Advanced
						.ele ("RandomizedBaseAddress")       .txt ("false").up()
					.up()
				.up()
				.ele ("ItemDefinitionGroup",  { Condition: "'$(Configuration)|$(Platform)'=='Release|x64'" })
					.ele ("ClCompile")
						// C/C++ / General
						.ele ("WarningLevel").txt ("Level3").up()
						.ele ("TreatWarningAsError").txt ("false").up()
						.ele ("MultiProcessorCompilation").txt ("true").up()
						.ele ("AdditionalIncludeDirectories").txt ("..\\include\\aesdk\\headers\\SP;..\\include\\aesdk\\headers;..\\include\\aesdk\\utils;%(AdditionalIncludeDirectories)").up()

						// C/C++ / Optimization
						.ele ("Optimization").txt ("MaxSpeed").up()
						.ele ("InlineFunctionExpansion").txt ("AnySuitable").up()
						.ele ("FavorSizeOrSpeed").txt ("Speed").up()
						.ele ("OmitFramePointers").txt ("true").up()
						.ele ("EnableFiberSafeOptimizations").txt ("true").up()
						.ele ("WholeProgramOptimization").txt ("true").up()

						// C/C++ / Preprocessor
						.ele ("PreprocessorDefinitions").txt ("WINDOWS;_WINDOWS;UNICODE;_UNICODE;" + "%(PreprocessorDefinitions)").up()

						// C/C++ / Code Generation
						.ele ("RuntimeLibrary").txt ("MultiThreadedDLL").up()
						.ele ("FunctionLevelLinking").txt ("true").up()
						.ele ("EnableParallelCodeGeneration").txt ("true").up()

						// C/C++ / Language
						.ele ("LanguageStandard").txt ("stdcpp" + this._languageStandard).up()  // !
						.ele ("LanguageStandard_C").txt ("stdc" + this._languageStandard).up()  // !
						.ele ("ConformanceMode").txt ("true").up()
					.up()

					.ele ("Link")
						// Manifest File
						.ele ("EnableUAC").txt ("false").up()

						// Debugging
						.ele ("GenerateDebugInformation").txt ("false").up()

						// Advanced
						.ele ("RandomizedBaseAddress").txt ("false").up()
					.up()
				.up()

				.ele ("Import", { Project: "$(VCTargetsPath)\\Microsoft.Cpp.targets" }).up()
			.up();

		return xml.end ({ prettyPrint: true });
	}
}

export default VCXGenerator;
