import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <nav class="bottom-nav" aria-label="Мобільне меню">
      <a routerLink="/home" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="item-label">{{ 'NAV.HOME' | translate }}</span>
      </a>

      <a routerLink="/practice" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span class="item-label">{{ 'NAV.PRACTICE' | translate }}</span>
      </a>

      <a routerLink="/progress" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
        <span class="item-label">{{ 'NAV.PROGRESS' | translate }}</span>
      </a>

      <a routerLink="/admin" routerLinkActive="active" class="bottom-item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
        <span class="item-label">{{ 'NAV.ADMIN' | translate }}</span>
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
