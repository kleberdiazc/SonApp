import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpaquePage } from './empaque.page';

describe('EmpaquePage', () => {
  let component: EmpaquePage;
  let fixture: ComponentFixture<EmpaquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpaquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpaquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
