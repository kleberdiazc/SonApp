import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpaqueListPage } from './empaque-list.page';

describe('EmpaqueListPage', () => {
  let component: EmpaqueListPage;
  let fixture: ComponentFixture<EmpaqueListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpaqueListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpaqueListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
