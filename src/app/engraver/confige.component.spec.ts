import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigeComponent } from './confige.component';

describe('ConfigeComponent', () => {
  let component: ConfigeComponent;
  let fixture: ComponentFixture<ConfigeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
