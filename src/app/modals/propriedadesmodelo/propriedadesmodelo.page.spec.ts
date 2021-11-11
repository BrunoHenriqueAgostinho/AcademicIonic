import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropriedadesmodeloPage } from './propriedadesmodelo.page';

describe('PropriedadesmodeloPage', () => {
  let component: PropriedadesmodeloPage;
  let fixture: ComponentFixture<PropriedadesmodeloPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PropriedadesmodeloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropriedadesmodeloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
