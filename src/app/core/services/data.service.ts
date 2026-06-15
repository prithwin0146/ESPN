import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Testimonial } from '../models/testimonial.model';
import { Stat } from '../models/stat.model';

/**
 * DataService — Single source of truth for all static content data.
 * Follows Dependency Inversion: consumers depend on this abstraction, not on raw data.
 */
@Injectable({ providedIn: 'root' })
export class DataService {

  getCourses(): Course[] {
    return [
      {
        id: 'spoken-english',
        title: 'Spoken English',
        description: 'From beginner to advanced — master everyday conversational English with confidence.',
        icon: '🗣️',
        features: ['Pronunciation Mastery', 'Daily Conversations', 'Fluency Building', 'Error Correction'],
        level: 'All Levels',
        duration: '3 Months',
        color: '#00D4FF'
      },
      {
        id: 'daily-conversation',
        title: 'Daily Conversation Practice',
        description: 'Real-world conversation scenarios practiced every session for natural fluency.',
        icon: '💬',
        features: ['Situational Dialogues', 'Role Play', 'Live Practice', 'Instant Feedback'],
        level: 'Beginner',
        duration: '6 Weeks',
        color: '#FFB830'
      },
      {
        id: 'grammar',
        title: 'Grammar Made Simple',
        description: 'Learn grammar the easy way — through speaking, not just rules.',
        icon: '📝',
        features: ['Core Grammar Rules', 'Contextual Learning', 'Common Mistakes', 'Practice Exercises'],
        level: 'Beginner',
        duration: '4 Weeks',
        color: '#7C3AED'
      },
      {
        id: 'vocabulary',
        title: 'Vocabulary Building',
        description: 'Expand your word power with topic-wise vocabulary and memory techniques.',
        icon: '📚',
        features: ['Topic-wise Words', 'Idioms & Phrases', 'Memory Tricks', 'Daily Word Practice'],
        level: 'Intermediate',
        duration: '6 Weeks',
        color: '#10B981'
      },
      {
        id: 'public-speaking',
        title: 'Public Speaking Skills',
        description: 'Overcome stage fear and speak with authority in front of any audience.',
        icon: '🎤',
        features: ['Stage Confidence', 'Speech Structure', 'Body Language', 'Voice Modulation'],
        level: 'Intermediate',
        duration: '2 Months',
        color: '#F43F5E'
      },
      {
        id: 'interview-prep',
        title: 'Interview Preparation',
        description: 'Crack any interview with the right language, confidence, and smart answers.',
        icon: '💼',
        features: ['HR Round Prep', 'Technical Comm.', 'Body Language', 'Mock Interviews'],
        level: 'Advanced',
        duration: '4 Weeks',
        color: '#F59E0B'
      },
      {
        id: 'group-discussion',
        title: 'Group Discussions',
        description: 'Excel in GDs with structured speaking, listening, and leadership skills.',
        icon: '👥',
        features: ['GD Techniques', 'Assertive Speaking', 'Listening Skills', 'Leadership Language'],
        level: 'Intermediate',
        duration: '3 Weeks',
        color: '#06B6D4'
      },
      {
        id: 'personality',
        title: 'Personality Development',
        description: 'Transform your overall personality — confidence, etiquette, and leadership.',
        icon: '⭐',
        features: ['Self-Confidence', 'Professional Etiquette', 'Emotional Intelligence', 'Leadership Traits'],
        level: 'All Levels',
        duration: '2 Months',
        color: '#8B5CF6'
      }
    ];
  }

  getTestimonials(): Testimonial[] {
    return [
      {
        id: 't1',
        name: 'Priya Kumari',
        role: 'Software Engineer',
        review: 'ESPN transformed my English completely. I used to freeze in meetings — now I lead them with confidence. Rajendiran Sir\'s method is truly unique!',
        rating: 5,
        avatar: '👩‍💻'
      },
      {
        id: 't2',
        name: 'Arun Murugan',
        role: 'MBA Student',
        review: 'Cleared my campus placements thanks to ESPN\'s interview prep. The mock interview sessions were incredibly realistic and helpful.',
        rating: 5,
        avatar: '👨‍🎓'
      },
      {
        id: 't3',
        name: 'Deepa Nair',
        role: 'Teacher',
        review: 'As a teacher, I needed to improve my classroom communication. ESPN helped me speak with more clarity and authority. Highly recommend!',
        rating: 5,
        avatar: '👩‍🏫'
      },
      {
        id: 't4',
        name: 'Karthik Selvam',
        role: 'BPO Professional',
        review: 'My accent and pronunciation improved dramatically in just 2 months. My client call scores went up by 40%. ESPN is worth every rupee!',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        id: 't5',
        name: 'Ananya Krishnan',
        role: 'College Student',
        review: 'The group discussion sessions at ESPN are amazing. I won our college GD competition after just 3 weeks of training here.',
        rating: 5,
        avatar: '👩‍🎓'
      },
      {
        id: 't6',
        name: 'Ramesh Pillai',
        role: 'Job Seeker',
        review: 'Got placed in my dream company after ESPN\'s interview preparation program. The trainers are patient, supportive, and extremely skilled.',
        rating: 5,
        avatar: '👨‍💻'
      },
      {
        id: 't7',
        name: 'Subha Chandran',
        role: 'Homemaker',
        review: 'I always dreamed of speaking English fluently. ESPN made it possible for me at 35! The evening batch timings were very convenient.',
        rating: 5,
        avatar: '👩'
      },
      {
        id: 't8',
        name: 'Vijay Menon',
        role: 'Sales Manager',
        review: 'My client presentations became so much more impactful after ESPN\'s public speaking training. Revenue in my team increased by 25%!',
        rating: 5,
        avatar: '👨‍💼'
      }
    ];
  }

  getStats(): Stat[] {
    return [
      { id: 's1', value: 17, suffix: '+', label: 'Years of Excellence', icon: '🏆' },
      { id: 's2', value: 10000, suffix: '+', label: 'Students Trained', icon: '👥' },
      { id: 's3', value: 50, suffix: '+', label: 'Partner Schools', icon: '🏫' },
      { id: 's4', value: 98, suffix: '%', label: 'Success Rate', icon: '⭐' }
    ];
  }

  getProcessSteps() {
    return [
      {
        step: '01',
        title: 'Assessment & Goal Mapping',
        description: 'We begin by understanding your current English level, communication patterns, and learning goals.',
        icon: '🎯'
      },
      {
        step: '02',
        title: 'Skill Foundation',
        description: 'Focus on pronunciation, grammar clarity, and vocabulary that makes your speech sound natural.',
        icon: '🧱'
      },
      {
        step: '03',
        title: 'Real-World Practice',
        description: 'Every session includes interactive speaking drills, live discussions, and real-life scenario practice.',
        icon: '🌍'
      },
      {
        step: '04',
        title: 'Confident Communication',
        description: 'You graduate as a confident English speaker ready for interviews, presentations, and daily life.',
        icon: '🚀'
      }
    ];
  }

  getWhyJoinReasons() {
    return [
      {
        icon: '🎤',
        title: 'Speak Confidently',
        description: 'Learn to speak English confidently in everyday situations — at work, home, and social settings.'
      },
      {
        icon: '📣',
        title: 'Pronunciation & Fluency',
        description: 'Improve your pronunciation, expand vocabulary, and achieve natural English fluency.'
      },
      {
        icon: '🏆',
        title: 'Public Speaking',
        description: 'Develop powerful public speaking and presentation skills that make you stand out.'
      },
      {
        icon: '💡',
        title: 'Live Interactive Sessions',
        description: 'Engage in interactive live sessions with practical activities that accelerate learning.'
      },
      {
        icon: '💼',
        title: 'Career-Focused Training',
        description: 'Special focus on interviews, group discussions, and workplace professional communication.'
      },
      {
        icon: '👨‍🏫',
        title: 'Expert Trainers',
        description: 'Personalized guidance from experienced trainers with 17+ years of proven track record.'
      }
    ];
  }
}
