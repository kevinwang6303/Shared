import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPopupComponent } from './test-popup.component';

describe('TestPopupComponent', () => {
  let component: TestPopupComponent;
  let fixture: ComponentFixture<TestPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
