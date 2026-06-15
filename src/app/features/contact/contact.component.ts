import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = new FormBuilder();

  submitted = signal(false);
  isSubmitting = signal(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.email]],
    course: ['', Validators.required],
    message: ['']
  });

  courses = [
    'Spoken English (Beginner to Advanced)',
    'Daily Conversation Practice',
    'Grammar Made Simple',
    'Vocabulary Building',
    'Public Speaking Skills',
    'Interview Preparation',
    'Group Discussions',
    'Personality Development'
  ];

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const v = this.contactForm.value;
    const msg = `Hi ESPN! 👋%0A%0AName: ${v.name}%0APhone: ${v.phone}%0AEmail: ${v.email || 'N/A'}%0ACourse: ${v.course}%0AMessage: ${v.message || 'I want to enroll!'}`;
    window.open(`https://wa.me/918778656159?text=${msg}`, '_blank');
    this.submitted.set(true);
    this.contactForm.reset();
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.contactForm.get(field);
    return !!(ctrl?.touched && ctrl.hasError(error));
  }
}
