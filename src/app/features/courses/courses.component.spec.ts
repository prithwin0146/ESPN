import { TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let seoService: any;
  let dataService: any;

  beforeEach(() => {
    // Create mock objects with call tracking for SeoService
    const seoCallLog: { method: string; args: any[] }[] = [];

    const seoSpy = {
      setTitle: (title: string) => {
        seoCallLog.push({ method: 'setTitle', args: [title] });
      },
      updateMetaTags: (tags: any[]) => {
        seoCallLog.push({ method: 'updateMetaTags', args: [tags] });
      },
      setCanonicalURL: (url: string) => {
        seoCallLog.push({ method: 'setCanonicalURL', args: [url] });
      },
      setOpenGraph: (options: any) => {
        seoCallLog.push({ method: 'setOpenGraph', args: [options] });
      },
      setTwitterCard: (options: any) => {
        seoCallLog.push({ method: 'setTwitterCard', args: [options] });
      },
      setStructuredData: (data: any) => {
        seoCallLog.push({ method: 'setStructuredData', args: [data] });
      }
    };

    // Create mock objects with call tracking for DataService
    const dataCallLog: { method: string; args: any[] }[] = [];

    const dataSpy = {
      getCourses: () => {
        dataCallLog.push({ method: 'getCourses', args: [] });
        return [];
      }
    };

    TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    component = TestBed.createComponent(CoursesComponent).componentInstance;
    seoService = TestBed.inject(SeoService);
    dataService = TestBed.inject(DataService);

    // Attach call logs for verification
    (seoService as any).callLog = seoCallLog;
    (dataService as any).callLog = dataCallLog;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call SEO service methods on init', () => {
    // Call ngOnInit
    component.ngOnInit();

    // Verify SEO service methods were called
    const seoLog = (seoService as any).callLog;

    // Check setTitle
    expect(seoLog).toContainEqual({ method: 'setTitle', args: ['Our Courses — ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK'] });

    // Check updateMetaTags
    expect(seoLog).toContainEqual({ method: 'updateMetaTags', args: [
      [{ name: 'description', content: 'Explore our comprehensive spoken English courses at ELPN. From beginner to advanced levels, we offer customized training programs for students, professionals, and anyone looking to improve their English communication skills.' },
       { name: 'keywords', content: 'spoken English courses, English speaking classes, beginner English course, advanced English course, business English, interview preparation, public speaking training' }]
    ]});

    // Check setCanonicalURL
    expect(seoLog).toContainEqual({ method: 'setCanonicalURL', args: ['https://www.elpn.example.com/courses'] });

    // Check setOpenGraph
    expect(seoLog).toContainEqual({ method: 'setOpenGraph', args: [
      expect.objectContaining({
        title: 'Our Courses — ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Explore our comprehensive spoken English courses at ELPN. From beginner to advanced levels, we offer customized training programs.',
        type: 'website'
      })
    ]});

    // Check setTwitterCard
    expect(seoLog).toContainEqual({ method: 'setTwitterCard', args: [
      expect.objectContaining({
        title: 'Our Courses — ELPN',
        description: 'Explore our comprehensive spoken English courses from beginner to advanced levels.'
      })
    ]});

    // Check setStructuredData
    expect(seoLog).toContainEqual({ method: 'setStructuredData', args: [expect.any(Object)] });
  });
});