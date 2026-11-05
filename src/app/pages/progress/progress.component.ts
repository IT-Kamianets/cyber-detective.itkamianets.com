import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-progress',
  imports: [TranslatePipe],
  template: `
    <section class="page-container">
      <div class="page-card">
        <h1 class="page-title">{{ 'PAGES.PROGRESS.TITLE' | translate }}</h1>
        <p class="page-description">{{ 'PAGES.PROGRESS.DESCRIPTION' | translate }}</p>
      </div>
    </section>
  `,
  styles: [`
    .page-container {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    .page-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: var(--shadow);
    }
    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.75rem;
      letter-spacing: -0.02em;
    }
    .page-description {
      font-size: 1rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
  `],
})
export class ProgressComponent {}
