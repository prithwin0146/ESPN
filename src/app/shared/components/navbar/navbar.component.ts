import {
  Component,
  HostListener,
  signal,
  PLATFORM_ID,
  Inject,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="nav-shell" [class.scrolled]="isScrolled()">
      <a class="skip-link" href="#main-content">Skip to main content</a>

      <nav class="navbar" aria-label="Primary">
        <a routerLink="/" class="nav-logo" aria-label="ESPN home">
          <span class="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="url(#logo-grad)"/>
              <path d="M12 13h7.2c3.5 0 5.8 2 5.8 5 0 3.2-2.4 5-6 5H16v4h-4V13zm4 7h2.8c1.4 0 2.2-.7 2.2-2s-.8-2-2.2-2H16v4zm10-7h4l3.5 10 3.5-10h4l-6 14h-3l-6-14z" fill="#fff"/>
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0" stop-color="#A41534"/>
                  <stop offset="1" stop-color="#6E0B20"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="logo-text">
            <span class="logo-name">ESPN</span>
            <span class="logo-tagline">English Speaking Presentation Network</span>
          </span>
        </a>

        <ul class="nav-links" [class.open]="menuOpen()">
          <li>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"
               (click)="closeMenu()">Home</a>
          </li>
          <li>
            <a routerLink="/about" routerLinkActive="active" (click)="closeMenu()">About</a>
          </li>
          <li>
            <a routerLink="/courses" routerLinkActive="active" (click)="closeMenu()">Courses</a>
          </li>
          <li>
            <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
          </li>
          <li class="nav-mobile-cta">
            <a href="tel:8778656159" class="btn btn-primary btn-sm" (click)="closeMenu()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Now
            </a>
          </li>
        </ul>

        <div class="nav-actions">
          <button class="theme-toggle" type="button"
                  (click)="toggleTheme()"
                  [attr.aria-label]="theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
            @if (theme() === 'dark') {
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>

          <a href="tel:8778656159" class="btn btn-primary btn-sm nav-cta" id="nav-call-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </a>

          <button class="hamburger" type="button"
                  [class.active]="menuOpen()"
                  (click)="toggleMenu()"
                  [attr.aria-expanded]="menuOpen()"
                  aria-controls="nav-mobile-menu"
                  aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>

    <div class="nav-backdrop" [class.open]="menuOpen()" (click)="closeMenu()" aria-hidden="true"></div>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);
  theme = signal<'light' | 'dark'>('light');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('espn-theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
      this.applyTheme();

      effect(() => {
        const t = this.theme();
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('espn-theme', t);
          this.applyTheme();
        }
      });
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 24);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.closeMenu(); }

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void { this.menuOpen.set(false); }

  toggleTheme(): void {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.setAttribute('data-theme', this.theme());
  }
}
