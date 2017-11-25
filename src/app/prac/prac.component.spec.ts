import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracComponent } from './prac.component';

describe('PracComponent', () => {
  let component: PracComponent;
  let fixture: ComponentFixture<PracComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
