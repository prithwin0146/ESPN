import { TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let seoService: jasmine.SpyObj<SeoService>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const seoSpy = jasmine.createSpyObj('SeoService', [
      'setTitle',
      'updateMetaTags',
      'setCanonicalURL',
      'setOpenGraph',
      'setTwitterCard',
      'setStructuredData'
    ]);
    const dataSpy = jasmine.createSpyObj('DataService', [
      'getCourses'
    ]);

    // Mock data service return values
    dataSpy.getCourses.and.returnValue([]);

    TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    component = TestBed.createComponent(CoursesComponent).componentInstance;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call SEO service methods on init', () => {
    // Call ngOnInit
    component.ngOnInit();

    // Verify SEO service methods were called
    expect(seoService.setTitle).toHaveBeenCalledWith(
      'Our Courses — ESPN — English Speaking Presentation Network'
    );

    expect(seoService.updateMetaTags).toHaveBeenCalledWith([
      { name: 'description', content: 'Explore ESPN\'s premium spoken English courses designed for students, professionals, and job seekers. From interview preparation to public speaking, find the perfect program for your communication goals.' },
      { name: 'keywords', content: 'spoken english courses, english speaking programs, interview preparation, public speaking training, business communication, soft skills development, ESPN course offerings' }
    ]);

    expect(seoService.setCanonicalURL).toHaveBeenCalledWith('https://www.espn.example.com/courses');

    expect(seoService.setOpenGraph).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Our Courses — ESPN — English Speaking Presentation Network',
        description: 'Explore ESPN\'s premium spoken English courses designed for students, professionals, and job seekers. From interview preparation to public speaking, find the perfect program for your communication goals.',
        type: 'website'
      })
    );

    expect(seoService.setTwitterCard).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Our Courses — ESPN — English Speaking Presentation Network',
        description: 'Explore ESPN\'s premium spoken English courses designed for students, professionals, and job seekers. From interview preparation to public speaking, find the perfect program for your communication goals.'
      })
    );

    expect(seoService.setStructuredData).toHaveBeenCalledWith(
      jasmine.any(Object)
    );
  });
});