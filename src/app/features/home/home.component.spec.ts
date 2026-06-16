import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
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
      },
      getTestimonials: () => {
        dataCallLog.push({ method: 'getTestimonials', args: [] });
        return [];
      },
      getStats: () => {
        dataCallLog.push({ method: 'getStats', args: [] });
        return [];
      },
      getProcessSteps: () => {
        dataCallLog.push({ method: 'getProcessSteps', args: [] });
        return [];
      },
      getWhyJoinReasons: () => {
        dataCallLog.push({ method: 'getWhyJoinReasons', args: [] });
        return [];
      }
    };

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    component = TestBed.createComponent(HomeComponent).componentInstance;
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
    expect(seoLog).toContainEqual({ method: 'setTitle', args: ['ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK | Spoken English Classes'] });

    // Check updateMetaTags
    expect(seoLog).toContainEqual({ method: 'updateMetaTags', args: [
      [{ name: 'description', content: 'ELPN (ENGLISH LANGUAGE PRESENTAION NETWORK) offers the best spoken English online classes. Founded in 2009 by Rajendiran Prakash. Serving Tamil Nadu & Kerala for 17+ years. Call: +91 8778656159' },
       { name: 'keywords', content: 'spoken english classes, spoken english online, english speaking classes, ELPN english, Rajendiran Prakash, Tamil Nadu english classes, Kerala english classes, interview preparation, public speaking' },
       { name: 'author', content: 'ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK' }]
    ]});

    // Check setCanonicalURL
    expect(seoLog).toContainEqual({ method: 'setCanonicalURL', args: ['https://www.elpn.example.com/'] });

    // Check setOpenGraph
    expect(seoLog).toContainEqual({ method: 'setOpenGraph', args: [
      expect.objectContaining({
        title: 'ELPN — Spoken English Online Classes | Tamil Nadu & Kerala',
        description: 'Transform your English with 17+ years of proven coaching. 10,000+ students trained. Enroll today!',
        type: 'website'
      })
    ]});

    // Check setTwitterCard
    expect(seoLog).toContainEqual({ method: 'setTwitterCard', args: [
      expect.objectContaining({
        card: 'summary_large_image',
        title: 'ELPN — Spoken English Online Classes',
        description: 'Transform your English with 17+ years of proven coaching.'
      })
    ]});

    // Check setStructuredData
    expect(seoLog).toContainEqual({ method: 'setStructuredData', args: [expect.any(Object)] });
  });
});