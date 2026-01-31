import { Component } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.css',
})
export class DocumentComponent {
  documents?: Document[];
  currentDocument: Document = {};
  currentIndex = -1;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.getAllDocuemnts();
  }

  getAllDocuemnts(): void {
    this.documentService.getAll().subscribe({
      next: (res) => {
        this.documents = res;
      },
      error: (e) => console.error(e),
    });
  }

  deleteDocument(id?: number): void {
    var response = confirm('Tem certeza que deseja excluir Esse documento?');
    if (response) {
      this.documentService.delete(id).subscribe({
        next: (res) => {
          this.getAllDocuemnts();
        },
        error: (e) => console.error(e),
      });
    }
  }

  signDocument(id?: number, company?: number, created_by?: number): void {
    let data = {
      company: company,
      created_by: created_by
    }
    this.documentService.signDocument(id, data).subscribe({
      next: (res) => {
        this.getAllDocuemnts();
      },
      error: (e) => console.error(e),
    });
  }
}
