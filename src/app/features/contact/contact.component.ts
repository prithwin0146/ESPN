import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SeoService } from '../../core/services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, inject } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = new FormBuilder();
  private seoService = inject(SeoService);

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

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setTitle('Contact ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK');
      this.seoService.updateMetaTags([
        { name: 'description', content: 'Get in touch with ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK. For inquiries about our spoken English classes, call us at +91 8778656159 or fill out our contact form.' },
        { name: 'keywords', content: 'contact ELPN, ELPN phone number, spoken English classes inquiry, English speaking classes contact, Rajendiran Prakas contact' }
      ]);
      this.seoService.setCanonicalURL('https://www.elpn.example.com/contact');
      this.seoService.setOpenGraph({
        title: 'Contact ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Get in touch with ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK. For inquiries about our spoken English classes.',
        image: 'https://www.elpn.example.com/assets/og-image-contact.jpg',
        type: 'website',
        url: 'https://www.elpn.example.com/contact',
        siteName: 'ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK'
      });
      this.seoService.setTwitterCard({
        card: 'summary_large_image',
        title: 'Contact ELPN',
        description: 'Get in touch with ELPN for course inquiries and enrollment.',
        image: 'https://www.elpn.example.com/assets/twitter-image-contact.jpg',
        site: '@ELPN_Official',
        creator: '@RajendiranPrakas'
      });

      // Structured data for LocalBusiness (contact information)
      this.seoService.setStructuredData({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK",
        "url": "https://www.elpn.example.com/contact",
        "telephone": "+91-8778656159",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Education Street",
          "addressLocality": "Tamil Nadu",
          "postalCode": "600001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.9716",
          "longitude": "77.5946"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-8778656159",
            "contactType": "Customer Service"
          },
          {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "contactOption": "TollFree",
            "areaServed": "IN"
          }
        ]
      });
    }
  }

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
