import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReallyPaginationComponent } from './really-pagination.component';

describe('ReallyPaginationComponent', () => {
  let component: ReallyPaginationComponent;
  let fixture: ComponentFixture<ReallyPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReallyPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReallyPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
