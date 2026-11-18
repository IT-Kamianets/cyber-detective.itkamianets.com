import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe],
  template: `
    <section class="page-container">
      @if (authService.user() === null) {
        <!-- Гість: інформація про застосунок -->
        <div class="guest-hero">
          <div class="hero-badge">Cyber Detective</div>
          <h1 class="hero-title">{{ 'PAGES.HOME.GUEST.HERO_TITLE' | translate }}</h1>
          <p class="hero-subtitle">{{ 'PAGES.HOME.GUEST.HERO_SUBTITLE' | translate }}</p>

          <div class="hero-actions">
            <button type="button" class="btn btn-primary" (click)="authService.register()">
              {{ 'AUTH.REGISTER' | translate }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="authService.login()">
              {{ 'AUTH.LOGIN' | translate }}
            </button>
          </div>
        </div>

        <div class="info-grid">
          <article class="info-card">
            <div class="card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <h2 class="card-title">{{ 'PAGES.HOME.GUEST.ABOUT_TITLE' | translate }}</h2>
            <p class="card-text">{{ 'PAGES.HOME.GUEST.ABOUT_TEXT' | translate }}</p>
          </article>

          <article class="info-card">
            <div class="card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h2 class="card-title">{{ 'PAGES.HOME.GUEST.AUDIENCE_TITLE' | translate }}</h2>
            <p class="card-text">{{ 'PAGES.HOME.GUEST.AUDIENCE_TEXT' | translate }}</p>
          </article>

          <article class="info-card info-card-highlight">
            <div class="card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h2 class="card-title">{{ 'PAGES.HOME.GUEST.START_TITLE' | translate }}</h2>
            <p class="card-text">{{ 'PAGES.HOME.GUEST.START_TEXT' | translate }}</p>
          </article>
        </div>
      } @else {
        <!-- Зареєстрований користувач: блок «Мій прогрес» -->
        <div class="progress-container">
          <header class="progress-header">
            <div>
              <h1 class="progress-title">{{ 'PAGES.HOME.PROGRESS.TITLE' | translate }}</h1>
              <p class="progress-subtitle">{{ 'PAGES.HOME.PROGRESS.SUBTITLE' | translate }}</p>
            </div>
            <button type="button" class="btn btn-outline-sm" (click)="authService.logout()">
              {{ 'AUTH.LOGOUT' | translate }}
            </button>
          </header>

          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-label">{{ 'PAGES.HOME.PROGRESS.POINTS' | translate }}</span>
              <span class="stat-value">0</span>
            </div>

            <div class="stat-card">
              <span class="stat-label">{{ 'PAGES.HOME.PROGRESS.LEVEL' | translate }}</span>
              <span class="stat-value">1</span>
            </div>

            <div class="stat-card">
              <span class="stat-label">{{ 'PAGES.HOME.PROGRESS.STREAK' | translate }}</span>
              <span class="stat-value">0</span>
            </div>
          </div>

          <section class="badges-section">
            <h2 class="badges-title">{{ 'PAGES.HOME.PROGRESS.BADGES_TITLE' | translate }}</h2>
            <div class="badges-empty">
              <span class="badges-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </span>
              <p class="badges-empty-text">{{ 'PAGES.HOME.PROGRESS.NO_BADGES' | translate }}</p>
            </div>
          </section>
        </div>
      }
    </section>
  `,
  styles: [`
    .page-container {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    /* Guest Hero */
    .guest-hero {
      text-align: center;
      padding: 2.5rem 1rem 3rem;
    }
    .hero-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: var(--badge-bg);
      color: var(--primary);
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .hero-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 1rem;
      letter-spacing: -0.03em;
      line-height: 1.2;
    }
    @media (min-width: 640px) {
      .hero-title {
        font-size: 2.75rem;
      }
    }
    .hero-subtitle {
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 640px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.75rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: var(--primary);
      color: var(--primary-contrast);
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: var(--bg-surface);
      color: var(--text-main);
      border: 1px solid var(--border-color);
    }
    .btn-secondary:hover {
      background: var(--bg-hover);
    }
    .btn-outline-sm {
      padding: 0.4rem 0.875rem;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 600;
    }
    .btn-outline-sm:hover {
      color: var(--text-main);
      background: var(--bg-hover);
    }

    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      margin-top: 1rem;
    }
    @media (min-width: 768px) {
      .info-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .info-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.75rem 1.5rem;
      box-shadow: var(--shadow);
    }
    .card-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--badge-bg);
      color: var(--primary);
      margin-bottom: 1rem;
    }
    .card-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }
    .card-text {
      font-size: 0.925rem;
      color: var(--text-muted);
      line-height: 1.55;
    }

    /* Progress Block */
    .progress-container {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: var(--shadow);
    }
    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1rem;
    }
    .progress-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.25rem;
      letter-spacing: -0.02em;
    }
    .progress-subtitle {
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 1.25rem;
      text-align: center;
    }
    .stat-label {
      display: block;
      font-size: 0.8125rem;
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.35rem;
    }
    .stat-value {
      font-size: 1.875rem;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.1;
    }

    /* Badges */
    .badges-section {
      border-top: 1px solid var(--border-color);
      padding-top: 1.5rem;
    }
    .badges-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 1rem;
    }
    .badges-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1rem;
      border: 1px dashed var(--border-color);
      border-radius: 8px;
      background: var(--bg-surface-elevated);
      text-align: center;
    }
    .badges-empty-icon {
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    .badges-empty-text {
      color: var(--text-muted);
      font-size: 0.925rem;
    }
  `],
})
export class HomeComponent {
  readonly authService = inject(AuthService);
}
