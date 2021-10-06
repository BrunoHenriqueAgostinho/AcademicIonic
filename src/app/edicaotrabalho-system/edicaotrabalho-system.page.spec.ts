import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicaotrabalhoSystemPage } from './edicaotrabalho-system.page';

describe('EdicaotrabalhoSystemPage', () => {
  let component: EdicaotrabalhoSystemPage;
  let fixture: ComponentFixture<EdicaotrabalhoSystemPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaotrabalhoSystemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaotrabalhoSystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
