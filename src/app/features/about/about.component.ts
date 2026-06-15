import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  milestones = [
    { year: '2009', title: 'ESPN Founded', desc: 'Mr. Rajendiran Prakas established ESPN in Tamil Nadu with a mission to empower communicators.' },
    { year: '2012', title: 'First 1000 Students', desc: 'Reached the milestone of training 1000+ students across schools and colleges.' },
    { year: '2015', title: 'Kerala Expansion', desc: 'ESPN expanded its presence to Kerala, serving students across two South Indian states.' },
    { year: '2018', title: '5000+ Students Trained', desc: 'Celebrated training 5000+ students with a consistent 98% success rate.' },
    { year: '2021', title: 'Online Classes Launched', desc: 'Launched interactive online live classes to reach learners from anywhere.' },
    { year: '2026', title: '10,000+ Students', desc: '17 years strong — serving 10,000+ students across 50+ partner institutions.' }
  ];

  values = [
    { icon: '💡', title: 'Innovation', desc: 'We continuously evolve our teaching methods to stay ahead in language education.' },
    { icon: '❤️', title: 'Empathy', desc: 'We understand every learner\'s journey is unique and teach with patience and care.' },
    { icon: '🏆', title: 'Excellence', desc: 'We set and maintain the highest standards in English language training.' },
    { icon: '🤝', title: 'Integrity', desc: 'We build trust with honest, transparent, and commitment-driven training programs.' }
  ];
}
