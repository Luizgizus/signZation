import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDocumentComponent } from './add-update-document.component';

describe('AddUpdateDocumentComponent', () => {
  let component: AddUpdateDocumentComponent;
  let fixture: ComponentFixture<AddUpdateDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
