import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragFilesComponent } from './drag-files.component';

describe('DragFilesComponent', () => {
  let component: DragFilesComponent;
  let fixture: ComponentFixture<DragFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
