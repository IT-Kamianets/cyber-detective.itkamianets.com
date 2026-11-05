import { DOCUMENT } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanonicalService } from '@wawjs/ngx-default';
import { LanguageService } from '@wawjs/ngx-translate';
import { environment } from '../environments/environment';
import { MobileNavigationComponent } from './layouts/mobile-navigation/mobile-navigation.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, MobileNavigationComponent],
	template: `
		<div class="mobile-app-shell mx-auto flex min-h-[100dvh] max-w-xl flex-col bg-[var(--c-bg-primary)]">
			<main class="min-h-0 flex-1 overflow-y-auto pb-24">
				<router-outlet />
			</main>
			<app-mobile-navigation />
		</div>
	`,
})
export class App {
	private readonly _canonicalService = inject(CanonicalService);
	private readonly _document = inject(DOCUMENT);
	private readonly _languageService = inject(LanguageService);

	constructor() {
		this._canonicalService.initialize();

		effect(() => {
			const language = this._languageService.language();
			const htmlLang =
				environment.languages.find((item) => item.code === language)?.htmlLang ?? language;

			if (htmlLang) {
				this._document.documentElement.lang = htmlLang;
			}
		});
	}
}
