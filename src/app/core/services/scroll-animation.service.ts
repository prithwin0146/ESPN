import { Injectable, NgZone } from '@angular/core';

/**
 * ScrollAnimationService — Handles intersection observer for scroll-reveal animations.
 * Single Responsibility: Only manages scroll-based animations.
 */
@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  private observer!: IntersectionObserver;

  constructor(private ngZone: NgZone) {
    this.initObserver();
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              entry.target.classList.add('is-visible');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
  }

  observe(element: Element): void {
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    this.observer.unobserve(element);
  }

  disconnect(): void {
    this.observer.disconnect();
  }
}
