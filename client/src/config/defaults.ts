const defaultFileContent = `function sayHi() {
  console.log("👋 Hello world");
}
sayHi()`;

const config = {
	backendUrl: 'http://localhost:3000',
	pistonApiUrl: 'http://localhost:2000/api/v2',
	defaultFileName: 'index.js',
	defaultFileContent,
	defaultProjectLanguage: 'Javascript',
	defaultTheme: 'Dracula',
	defaultFontSize: 16,
	defaultFontFamily: 'Space Mono',
	defaultShowGitHubCorner: true,
	interfaceColors: {
		dark: "#212429",
		darkHover: "#3D404A",
		light: "#f5f5f5",
		primary: "#39E079",
		danger: "#ef4444",
	},
}

export default config
export type Config = typeof config
