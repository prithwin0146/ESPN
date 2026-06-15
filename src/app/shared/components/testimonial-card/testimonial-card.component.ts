import { Component, Input, computed, signal } from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  template: `
    <figure class="t-card">
      <span class="t-card__quote" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor">
          <path d="M9.5 8.5C5.5 11 4 14.6 4 19c0 3 1.5 5 4 5 2.2 0 4-1.8 4-4s-1.8-4-4-4c0-2.5 1.2-4.6 3.5-6L9.5 8.5zm14 0C19.5 11 18 14.6 18 19c0 3 1.5 5 4 5 2.2 0 4-1.8 4-4s-1.8-4-4-4c0-2.5 1.2-4.6 3.5-6L23.5 8.5z"/>
        </svg>
      </span>

      <blockquote class="t-card__body">
        "{{ testimonial.review }}"
      </blockquote>

      <div class="t-card__stars" [attr.aria-label]="testimonial.rating + ' out of 5 stars'">
        @for (filled of starArray(); track $index) {
          <svg viewBox="0 0 24 24" width="18" height="18"
               [attr.fill]="filled ? 'currentColor' : 'none'"
               stroke="currentColor" stroke-width="1.5"
               stroke-linejoin="round" aria-hidden="true">
            <polygon points="12,2 15.1,8.6 22,9.6 17,14.4 18.2,21.3 12,18 5.8,21.3 7,14.4 2,9.6 8.9,8.6"/>
          </svg>
        }
      </div>

      <figcaption class="t-card__person">
        <span class="t-card__avatar" [style.background]="avatarBg()" aria-hidden="true">
          {{ initials() }}
        </span>
        <span class="t-card__meta">
          <span class="t-card__name">{{ testimonial.name }}</span>
          <span class="t-card__role">{{ testimonial.role }}</span>
        </span>
      </figcaption>
    </figure>
  `,
  styleUrls: ['./testimonial-card.component.scss']
})
export class TestimonialCardComponent {
  @Input({ required: true }) testimonial!: Testimonial;

  protected starArray = computed(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) arr.push(i < (this.testimonial?.rating ?? 0));
    return arr;
  });

  protected initials = computed(() => {
    const name = (this.testimonial?.name ?? '').trim();
    if (!name) return '?';
    const parts = name.split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase() ?? '').join('') || name[0]?.toUpperCase();
  });

  protected avatarBg = computed(() => {
    const palette = ['#A41534', '#D4AF37', '#3D4D70', '#6F5A1C', '#8C0F2A'];
    let hash = 0;
    for (const c of this.testimonial?.name ?? '') hash = (hash * 31 + c.charCodeAt(0)) | 0;
    const c1 = palette[Math.abs(hash) % palette.length];
    const c2 = palette[(Math.abs(hash) + 2) % palette.length];
    return `linear-gradient(135deg, ${c1}, ${c2})`;
  });

  protected get rating() { return this.testimonial?.rating ?? 0; }
}
