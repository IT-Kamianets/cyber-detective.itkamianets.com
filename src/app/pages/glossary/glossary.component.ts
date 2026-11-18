import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

@Component({
  selector: 'app-glossary',
  imports: [TranslatePipe],
  template: `
    <section class="page-container">
      <div class="page-card">
        <h1 class="page-title">{{ 'PAGES.GLOSSARY.TITLE' | translate }}</h1>
        <p class="page-description">{{ 'PAGES.GLOSSARY.DESCRIPTION' | translate }}</p>

        <div class="glossary-container">
          @if (terms.length === 0) {
            <div class="empty-state">
              <span class="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                  <path d="M8 7h8"/>
                  <path d="M8 11h8"/>
                  <path d="M8 15h5"/>
                </svg>
              </span>
              <p class="empty-text">{{ 'PAGES.GLOSSARY.EMPTY' | translate }}</p>
            </div>
          } @else {
            <dl class="terms-list">
              @for (item of terms; track item.id) {
                <div class="term-card">
                  <dt class="term-title">{{ item.term }}</dt>
                  <dd class="term-definition">{{ item.definition }}</dd>
                </div>
              }
            </dl>
          }
        </div>
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
      margin-bottom: 2rem;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      text-align: center;
      background: var(--bg-surface-elevated);
      border: 1px dashed var(--border-color);
      border-radius: 8px;
    }
    .empty-icon {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    .empty-text {
      color: var(--text-muted);
      font-size: 0.95rem;
    }
    .terms-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .term-card {
      padding: 1rem 1.25rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-surface-elevated);
    }
    .term-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.35rem;
    }
    .term-definition {
      margin: 0;
      font-size: 0.925rem;
      color: var(--text-main);
      line-height: 1.5;
    }
  `],
})
export class GlossaryComponent {
  // Список термінів з полями term і definition (поки порожній для наповнення на наступних етапах)
  terms: GlossaryTerm[] = [];
}
