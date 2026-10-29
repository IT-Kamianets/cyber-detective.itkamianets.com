import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	template: `
		<section class="px-5 py-7">
			<h1 class="text-2xl font-semibold tracking-[-0.03em] text-[var(--c-text-strong)]">
				{{ title }}
			</h1>
		</section>
	`,
})
export class BlankPageComponent {
	protected readonly title = inject(ActivatedRoute).snapshot.data['pageTitle'] as string;
}
