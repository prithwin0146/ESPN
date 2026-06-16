import { TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';
import { FormBuilder } from '@angular/forms';

describe('ContactComponent', () => {
  let component: ContactComponent;
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
      imports: [ContactComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy },
        FormBuilder
      ]
    });

    component = TestBed.createComponent(ContactComponent).componentInstance;
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
      'Contact ESPN — English Speaking Presentation Network'
    );

    expect(seoService.updateMetaTags).toHaveBeenCalledWith([
      { name: 'description', content: 'Get in touch with ESPN for inquiries about our spoken English courses, enrollment, or general questions. We\'re here to help you start your journey to confident communication.' },
      { name: 'keywords', content: 'Contact ESPN, English Speaking Presentation Network, spoken English inquiries, course enrollment, Rajendiran Prakas, Tamil Nadu, Kerala, phone number, WhatsApp, email' }
    ]);

    expect(seoService.setCanonicalURL).toHaveBeenCalledWith('https://www.espn.example.com/contact');

    expect(seoService.setOpenGraph).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Contact ESPN — English Speaking Presentation Network',
        description: 'Get in touch with ESPN for inquiries about our spoken English courses, enrollment, or general questions. We\'re here to help you start your journey to confident communication.',
        type: 'website'
      })
    );

    expect(seoService.setTwitterCard).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Contact ESPN — English Speaking Presentation Network',
        description: 'Get in touch with ESPN for inquiries about our spoken English courses, enrollment, or general questions. We\'re here to help you start your journey to confident communication.'
      })
    );

    expect(seoService.setStructuredData).toHaveBeenCalledWith(
      jasmine.any(Object)
    );
  });
});