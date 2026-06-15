import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [NgClass],
  template: `
    <header class="heading" [ngClass]="'heading--' + align">
      @if (badge) {
        <span class="heading__badge">
          <span class="heading__badge-dot" aria-hidden="true"></span>
          {{ badge }}
        </span>
      }
      <h2 class="heading__title" [innerHTML]="title"></h2>
      @if (subtitle) {
        <p class="heading__subtitle">{{ subtitle }}</p>
      }
      <span class="heading__line" aria-hidden="true"></span>
    </header>
  `,
  styles: [`
    .heading { margin-bottom: var(--space-12); display: flex; flex-direction: column; }
    .heading--center { align-items: center; text-align: center; }
    .heading--left   { align-items: flex-start; text-align: left; }

    .heading__badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      background: var(--color-accent-soft);
      color: var(--color-accent-hover);
      border: 1px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
      font-size: var(--fs-12);
      font-weight: 600;
      letter-spacing: var(--letter-wider);
      text-transform: uppercase;
      padding: var(--space-2) var(--space-5);
      border-radius: var(--r-pill);
      margin-bottom: var(--space-5);
    }

    .heading__badge-dot {
      width: 6px; height: 6px;
      background: var(--color-accent);
      border-radius: 50%;
      box-shadow: 0 0 0 4px var(--color-accent-soft);
    }

    .heading__title {
      font-family: var(--font-display);
      font-size: clamp(1.875rem, 4vw, 2.75rem);
      font-weight: 700;
      line-height: var(--lh-tight);
      color: var(--color-text);
      margin: 0 0 var(--space-4);
      letter-spacing: var(--letter-tight);
      max-width: 28ch;
    }
    .heading--center .heading__title { margin-inline: auto; }

    .heading__subtitle {
      font-size: var(--fs-18);
      color: var(--color-text-muted);
      line-height: var(--lh-loose);
      max-width: 60ch;
      margin: 0 0 var(--space-5);
    }
    .heading--center .heading__subtitle { margin-inline: auto; }

    .heading__line {
      display: block;
      width: 56px;
      height: 4px;
      background: var(--grad-brand);
      border-radius: var(--r-pill);
      margin-top: var(--space-2);
    }
    .heading--center .heading__line { margin-inline: auto; }

    :host ::ng-deep .heading__title .highlight {
      background: var(--grad-gold);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }
  `]
})
export class SectionHeadingComponent {
  @Input() badge = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() align: 'center' | 'left' = 'center';
}
