import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  uid: string;
  email: string;
  nickname?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // null = guest; object when logged in
  readonly user = signal<UserProfile | null>(null);

  // Default false; later will read custom claim admin
  readonly isAdmin = signal<boolean>(false);

  login(): void {
    alert('Ще не реалізовано: Вхід');
  }

  register(): void {
    alert('Ще не реалізовано: Реєстрація');
  }

  logout(): void {
    alert('Ще не реалізовано: Вихід');
  }
}
