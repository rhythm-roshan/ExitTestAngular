import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteLoginComponent } from './roulette-login.component';

describe('RouletteLoginComponent', () => {
  let component: RouletteLoginComponent;
  let fixture: ComponentFixture<RouletteLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
