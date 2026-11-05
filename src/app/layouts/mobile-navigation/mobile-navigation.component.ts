import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-mobile-navigation',
	imports: [RouterLink, RouterLinkActive],
	template: `
		<nav class="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-xl border-t border-[var(--c-border)] bg-[var(--c-bg-secondary)] px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]" aria-label="Основна навігація">
			@for (item of items; track item.path) {
				<a
					class="theme-focus flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-[0.68rem] font-medium text-[var(--c-text-muted)]"
					routerLinkActive="bg-[var(--c-bg-tertiary)]! text-[var(--c-primary)]"
					[routerLinkActiveOptions]="{ exact: item.path === '/' }"
					[routerLink]="item.path"
				>
					<span class="material-symbols-outlined text-[22px]" aria-hidden="true">{{ item.icon }}</span>
					<span>{{ item.label }}</span>
				</a>
			}
		</nav>
	`,
})
export class MobileNavigationComponent {
	protected readonly items = [
		{ label: 'Головна', path: '/', icon: 'home' },
		{ label: 'Практика', path: '/practice', icon: 'security' },
		{ label: 'Прогрес', path: '/progress', icon: 'trending_up' },
		{ label: 'Адмін', path: '/admin', icon: 'admin_panel_settings' },
	];
}
