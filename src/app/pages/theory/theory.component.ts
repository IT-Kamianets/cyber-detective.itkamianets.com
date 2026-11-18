import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface TheoryTopic {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

@Component({
  selector: 'app-theory',
  imports: [TranslatePipe],
  template: `
    <section class="page-container">
      <div class="page-card">
        <h1 class="page-title">{{ 'PAGES.THEORY.TITLE' | translate }}</h1>
        <p class="page-description">{{ 'PAGES.THEORY.DESCRIPTION' | translate }}</p>

        <div class="topics-container">
          @if (topics.length === 0) {
            <div class="empty-state">
              <span class="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </span>
              <p class="empty-text">{{ 'PAGES.THEORY.EMPTY' | translate }}</p>
            </div>
          } @else {
            <ul class="topics-list">
              @for (topic of topics; track topic.id) {
                <li class="topic-item">
                  <h3 class="topic-title">{{ topic.title }}</h3>
                  @if (topic.description) {
                    <p class="topic-desc">{{ topic.description }}</p>
                  }
                </li>
              }
            </ul>
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
    .topics-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .topic-item {
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-surface-elevated);
    }
    .topic-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 0.25rem;
    }
    .topic-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  `],
})
export class TheoryComponent {
  // Список тем з заголовками (поки порожній для наповнення на наступних етапах)
  topics: TheoryTopic[] = [];
}
