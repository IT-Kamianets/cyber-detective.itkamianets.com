export const environment: {
	appVersion: string;
	production: boolean;
	defaultLanguage: string;
	languages: AppLanguage[];
} = {
	appVersion: '1.0.0',
	production: true,
	defaultLanguage: 'uk',
	languages: [
		{
			code: 'uk',
			name: 'Ukrainian',
			nativeName: 'Українська',
			flagSrc: 'flags/ukraine.svg',
			htmlLang: 'uk',
		},
		{
			code: 'en',
			name: 'English',
			nativeName: 'English',
			flagSrc: 'flags/united-kingdom.svg',
			htmlLang: 'en',
		},
	],
};

export interface AppLanguage {
	code: string;
	name: string;
	nativeName: string;
	flagSrc: string;
	htmlLang: string;
	population?: number;
}
