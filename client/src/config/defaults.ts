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
}

export default config
export type Config = typeof config
