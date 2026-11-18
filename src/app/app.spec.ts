import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { App } from './app';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { adminGuard } from './core/guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideTranslateService({
          lang: 'uk',
          fallbackLang: 'uk',
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('AdminGuard should redirect non-admin to / and allow admin', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    authService.isAdmin.set(false);
    const guardResultBlocked = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
    expect(guardResultBlocked).toEqual(router.createUrlTree(['/']));

    authService.isAdmin.set(true);
    const guardResultAllowed = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
    expect(guardResultAllowed).toBe(true);
  });

  it('HomeComponent should display guest info when user is null and progress when user is logged in', () => {
    const authService = TestBed.inject(AuthService);
    const fixture = TestBed.createComponent(HomeComponent);

    // 1. Guest state
    authService.user.set(null);
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.guest-hero')).toBeTruthy();
    expect(compiled.querySelector('.progress-container')).toBeFalsy();

    // 2. Registered state
    authService.user.set({ uid: 'user-1', email: 'test@detective.com', nickname: 'Sherlock' });
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.guest-hero')).toBeFalsy();
    expect(compiled.querySelector('.progress-container')).toBeTruthy();
    expect(compiled.querySelector('.stat-value')?.textContent).toContain('0');
  });
});
