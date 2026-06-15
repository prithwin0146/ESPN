import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

/**
 * ScrollRevealDirective — Applies scroll-reveal animation to host element.
 * Single Responsibility: Only attaches/detaches scroll observation.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  constructor(
    private el: ElementRef,
    private scrollService: ScrollAnimationService
  ) {}

  ngOnInit(): void {
    this.el.nativeElement.classList.add('scroll-reveal');
    this.scrollService.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.scrollService.unobserve(this.el.nativeElement);
  }
}
