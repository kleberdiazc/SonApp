import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrioridadPage } from './prioridad.page';

describe('PrioridadPage', () => {
  let component: PrioridadPage;
  let fixture: ComponentFixture<PrioridadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioridadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrioridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
