import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type LanguageCode = 'uk' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _translate = inject(TranslateService);
  private readonly STORAGE_KEY = 'cyber-detective-lang';

  readonly currentLang = signal<LanguageCode>(this.getInitialLang());

  constructor() {
    const lang = this.currentLang();
    this._translate.addLangs(['uk', 'en']);
    this._translate.setFallbackLang('uk');
    this._translate.use(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  setLanguage(lang: LanguageCode): void {
    this.currentLang.set(lang);
    this._translate.use(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch {}
  }

  toggleLanguage(): void {
    const next: LanguageCode = this.currentLang() === 'uk' ? 'en' : 'uk';
    this.setLanguage(next);
  }

  private getInitialLang(): LanguageCode {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY) as LanguageCode | null;
      if (saved === 'uk' || saved === 'en') {
        return saved;
      }
    } catch {}
    return 'uk';
  }
}
