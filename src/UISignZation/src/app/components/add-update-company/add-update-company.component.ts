import { Component } from '@angular/core';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-update-company.component.html',
  styleUrl: './add-update-company.component.css',
})
export class AddUpdateCompanyComponent {
  company: Company = {
    id: '',
    name: '',
    lang: 'pt',
    locale: '-3',
    created_by: 1,
  };

  companyId: any = "";
  isUpdateRoute: boolean = false;

  submitted = false;
  isSucess = false;

  message = ""

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let path = this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.isUpdateRoute = path.includes('company-update')
    if (this.isUpdateRoute) {
      this.companyId = this.route.snapshot.paramMap.get('id');
      this.getCompanyById();
    }
  }

  getCompanyById(): void {
    this.companyService.getById(this.companyId).subscribe({
      next: (res) => {
          this.company.name = res.name
          this.company.lang = res.lang
          this.company.locale = res.locale
          this.company.created_by = res.created_by
      },
      error: (e) => {
        this.isSucess = false
        this.message = JSON.stringify(e.error)
        this.submitted = true;
      },
    });
  }

  saveCompany(): void {
    const data = {
      name: this.company.name,
      lang: this.company.lang,
      locale: this.company.locale,
      created_by: 1,
    };

    this.companyService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.isSucess = true;
        this.message = "Empresa criado com sucesso"
      },
      error: (e) => {
        console.log(e)
        this.isSucess = false
        this.message = JSON.stringify(e.error)
        this.submitted = true;
      },
    });
  }

  updateCompany(): void {
    const data = {
      name: this.company.name,
      lang: this.company.lang,
      locale: this.company.locale,
      created_by: 1,
    };

    this.companyService.update(this.companyId, data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.isSucess = true;
        this.message = "Empresa atualizado com sucesso"
      },
      error: (e) => {
        this.isSucess = false
        this.message = JSON.stringify(e.error)
        this.submitted = true;
      },
    });
  }

  newCompany(): void {
    this.submitted = false;
    this.company = {
      id: '',
      name: '',
      lang: 'pt',
      locale: '-3',
      created_by: 1,
    };
  }
}
