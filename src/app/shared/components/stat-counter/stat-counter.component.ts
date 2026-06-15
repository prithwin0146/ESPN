import { Component, Input, OnInit, OnDestroy, ElementRef, NgZone, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat">
      @if (icon) {
        <span class="stat__icon" aria-hidden="true">
          {{ icon }}
        </span>
      }
      <div class="stat__value">
        <span class="stat__count">{{ displayValue }}</span>
        @if (suffix) {
          <span class="stat__suffix">{{ suffix }}</span>
        }
      </div>
      <p class="stat__label">{{ label }}</p>
    </div>
  `,
  styleUrls: ['./stat-counter.component.scss']
})
export class StatCounterComponent implements OnInit, OnDestroy {
  @Input() value = 0;
  @Input() suffix = '';
  @Input() label = '';
  @Input() icon = '';

  displayValue = 0;
  private observer?: IntersectionObserver;
  private animated = false;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof IntersectionObserver === 'undefined') {
      this.displayValue = this.value;
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.ngZone.run(() => this.animateCount());
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animateCount(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { this.displayValue = this.value; return; }

    const duration = 1800;
    const start = performance.now();
    const from = 0;
    const to = this.value;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.displayValue = Math.round(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
      else this.displayValue = to;
    };
    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
