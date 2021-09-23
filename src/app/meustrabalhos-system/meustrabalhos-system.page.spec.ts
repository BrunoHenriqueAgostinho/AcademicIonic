import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeustrabalhosSystemPage } from './meustrabalhos-system.page';

describe('MeustrabalhosSystemPage', () => {
  let component: MeustrabalhosSystemPage;
  let fixture: ComponentFixture<MeustrabalhosSystemPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeustrabalhosSystemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeustrabalhosSystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
