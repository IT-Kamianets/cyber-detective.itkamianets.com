import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService, LanguageCode } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <header class="app-header">
      <div class="header-inner">
        <a routerLink="/" class="brand-link">
          <span class="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </span>
          <span class="brand-title">{{ 'APP.NAME' | translate }}</span>
        </a>

        <nav class="desktop-nav" aria-label="Головне меню">
          <a routerLink="/practice" routerLinkActive="active" class="nav-item">
            {{ 'NAV.PRACTICE' | translate }}
          </a>
          <a routerLink="/theory" routerLinkActive="active" class="nav-item">
            {{ 'NAV.THEORY' | translate }}
          </a>
          <a routerLink="/glossary" routerLinkActive="active" class="nav-item">
            {{ 'NAV.GLOSSARY' | translate }}
          </a>
        </nav>

        <div class="header-controls">
          <div class="lang-switch" role="group" [attr.aria-label]="'LANGUAGE.SWITCH' | translate">
            <button
              type="button"
              class="lang-btn"
              [class.active]="langService.currentLang() === 'uk'"
              (click)="setLang('uk')"
            >
              UA
            </button>
            <span class="lang-divider" aria-hidden="true">/</span>
            <button
              type="button"
              class="lang-btn"
              [class.active]="langService.currentLang() === 'en'"
              (click)="setLang('en')"
            >
              EN
            </button>
          </div>

          <button
            type="button"
            class="theme-btn"
            [attr.aria-label]="themeService.currentTheme() === 'dark' ? ('THEME.TOGGLE_TO_LIGHT' | translate) : ('THEME.TOGGLE_TO_DARK' | translate)"
            (click)="themeService.toggleTheme()"
          >
            @if (themeService.currentTheme() === 'dark') {
              <!-- Sun icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            } @else {
              <!-- Moon icon -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow);
      height: var(--header-height);
    }

    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .brand-link {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      color: var(--text-main);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
    }

    .brand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: var(--badge-bg);
      color: var(--badge-text);
    }

    .desktop-nav {
      display: none;
      align-items: center;
      gap: 0.5rem;
    }

    @media (min-width: 768px) {
      .desktop-nav {
        display: flex;
      }
    }

    .nav-item {
      padding: 0.5rem 0.875rem;
      border-radius: 6px;
      font-size: 0.925rem;
      font-weight: 500;
      color: var(--text-muted);
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .nav-item:hover {
      color: var(--text-main);
      background-color: var(--bg-hover);
    }

    .nav-item.active {
      color: var(--primary);
      background-color: var(--badge-bg);
      font-weight: 600;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .lang-switch {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: var(--bg-surface-elevated);
      font-size: 0.8125rem;
      font-weight: 600;
    }

    .lang-btn {
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      color: var(--text-muted);
      font-weight: 600;
      transition: color 0.15s ease, background-color 0.15s ease;
    }

    .lang-btn.active {
      color: var(--primary);
      background: var(--badge-bg);
    }

    .lang-divider {
      color: var(--text-muted);
      font-size: 0.75rem;
      user-select: none;
    }

    .theme-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: var(--bg-surface-elevated);
      color: var(--text-main);
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }

    .theme-btn:hover {
      background: var(--bg-hover);
    }
  `],
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly langService = inject(LanguageService);

  setLang(lang: LanguageCode): void {
    this.langService.setLanguage(lang);
  }
}
