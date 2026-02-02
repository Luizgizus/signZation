import { Component } from '@angular/core';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent {
  companies?: Company[];
  currentcompany: Company = {};
  currentIndex = -1;

  constructor(
    private companyService: CompanyService
  ) {}
  
  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res
      },
      error: (e) => console.error(e),
    });
  }

  deleteCompany(id:number): void {
    var response = confirm("Tem certeza que deseja excluir a empresa?")
    if(response){
      this.companyService.delete(id).subscribe({
        next: (res) => {
          this.getAllCompanies()
        },
        error: (e) => console.error(e),
      });
    }
  }
}
