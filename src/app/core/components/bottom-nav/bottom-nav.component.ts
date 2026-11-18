import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <nav class="bottom-nav" aria-label="Мобільне меню">
      <a routerLink="/practice" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span class="item-label">{{ 'NAV.PRACTICE' | translate }}</span>
      </a>

      <a routerLink="/theory" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        <span class="item-label">{{ 'NAV.THEORY' | translate }}</span>
      </a>

      <a routerLink="/glossary" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M8 7h8"/>
          <path d="M8 11h8"/>
          <path d="M8 15h5"/>
        </svg>
        <span class="item-label">{{ 'NAV.GLOSSARY' | translate }}</span>
      </a>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: var(--bottom-nav-height);
      background: var(--bg-surface);
      border-top: 1px solid var(--border-color);
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }

    @media (min-width: 768px) {
      .bottom-nav {
        display: none;
      }
    }

    .bottom-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      color: var(--text-muted);
      gap: 3px;
      font-size: 0.725rem;
      font-weight: 500;
      transition: color 0.15s ease;
    }

    .bottom-item.active {
      color: var(--primary);
      font-weight: 600;
    }

    .item-label {
      line-height: 1.1;
    }
  `],
})
export class BottomNavComponent {}
