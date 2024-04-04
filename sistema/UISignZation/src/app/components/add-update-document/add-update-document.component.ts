import { Component } from '@angular/core';
import { Document } from '../../models/document.model';
import { Company } from '../../models/company.model';
import { DocumentService } from '../../services/document.service';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-update-document.component.html',
  styleUrl: './add-update-document.component.css',
})
export class AddUpdateDocumentComponent {
  document: Document = {
    name: '',
    created_at: new Date(),
    last_updated_at: new Date(),
    date_limit_to_sign: '',
    signed: false,
    company: 0,
    created_by: 1
  };

  companies?: Company[];

  documentId: any = "";
  isUpdateRoute: boolean = false;

  submitted = false;
  isSucess = false;

  message = ""

  constructor(
    private documentService: DocumentService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCompanies()

    let path = this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.isUpdateRoute = path.includes('document-update')
    if (this.isUpdateRoute) {
      this.documentId = this.route.snapshot.paramMap.get('id');
      this.getDocumentById();
    }
  }

  getDocumentById(): void {
    this.documentService.getById(this.documentId).subscribe({
      next: (res) => {
          this.document.name = res.name
          if(res.date_limit_to_sign){
            const dateLimitToSign = new Date(res.date_limit_to_sign);
            this.document.date_limit_to_sign = dateLimitToSign.toISOString().slice(0, 16);
          }

          this.document.company = res.company
          this.document.created_by = res.created_by
      },
      error: (e) => {
        this.isSucess = false
        this.message = JSON.stringify(e.error)
        this.submitted = true;
      },
    });
  }

  saveDocument(): void {
    const data = {
      name: this.document.name,
      date_limit_to_sign: this.document.date_limit_to_sign,
      company: this.document.company,
      created_by: this.document.created_by
    };

    this.documentService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.isSucess = true;
        this.message = "Documento criado com sucesso"
      },
      error: (e) => {
        console.log(e)
        this.isSucess = false
        this.message = JSON.stringify(e.error)
        this.submitted = true;
      },
    });
  }

  getAllCompanies(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res
      },
      error: (e) => console.error(e),
    });
  }

  updateDocument(): void {
    const data = {
      name: this.document.name,
      created_at: this.document.created_at,
      last_updated_at: this.document.last_updated_at,
      date_limit_to_sign: this.document.date_limit_to_sign,
      signed: this.document.signed,
      company: this.document.company,
      created_by: this.document.created_by,
    };

    this.documentService.update(this.documentId, data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.isSucess = true;
        this.message = "Documento atualizado com sucesso"
      },
      error: (e) => {
        this.isSucess = false
        this.message = JSON.stringify(e.error)
        this.submitted = true;
      },
    });
  }

  newDocument(): void {
    this.submitted = false;
    this.document = {
      name: '',
      date_limit_to_sign: '',
      signed: false,
      company: 2,
      created_by: 1
    };
  }
}
