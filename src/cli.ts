import { intro, outro, text, select, multiselect, spinner } from "@clack/prompts";

import ProjectGenerator from "./projectGenerator";

async function cli() {
	intro ("Hello World.");

	const projectName = await text ({
		message: "Enter a project name",
	});

	const destination = await text ({
		message: "Where do you want to create the project?",
		placeholder: "./",
	});

	const languageStandard = await select ({
		message: "Select a language standard",
		options: [
			{ value: "14", label: "ISO C++14 Standard" },
			{ value: "17", label: "ISO C++17 Standard" },
			{ value: "20", label: "ISO C++20 Standard" },
			{ value: "23", label: "ISO C++23 Standard", hint: "Preview" },
		],
	});

	const platform = await multiselect ({
		message: "Select the target platform",
		options: [
			{ value: "win", label: "Windows (x64)" },
			{ value: "mac", label: "macOS (arm64)" },
		]
	});

	const pluginName = await text ({
		message: "Enter a plugin name",
		placeholder: projectName as string,
	});

	const pluginCategory = await text ({
		message: "Enter a plugin category",
		placeholder: "POTI",
	});

	const entryPoint = await text ({
		message: "Enter an entry point",
		placeholder: "EffectMain",
	});

	const supportURL = await text ({
		message: "Enter your support URL",
		placeholder: "https://github.com/potistudio",
	});

	const spin = spinner();
	spin.start ("Generating project...");

	const generator = new ProjectGenerator();

	generator.pluginName = pluginName as string;
	generator.projectName = projectName as string;
	generator.destination = destination as string;

	await generator.generate();

	spin.stop ("Generated project.");

	outro ("Goodbye World.");
}

export default cli;
