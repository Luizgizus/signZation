import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-update-user.component.html',
  styleUrl: './add-update-user.component.css',
})
export class AddUpdateUserComponent {
  user: User = {
    id: '',
    email: '',
    password: '',
  };

  userId: any = "";
  isUpdateRoute: boolean = false;
  oldPassword: any = '';

  submitted = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let path = this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.isUpdateRoute = path.includes('user-update')
    if (this.isUpdateRoute) {
      this.userId = this.route.snapshot.paramMap.get('id');
      this.getUserById();
    }
  }

  getUserById(): void {
    this.userService.getById(this.userId).subscribe({
      next: (res) => {
        this.user.email = res.email;
        this.oldPassword = res.password;
      },
      error: (e) => console.error(e),
    });
  }

  saveUser(): void {
    const data = {
      email: this.user.email,
      password: this.user.password,
    };

    this.userService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  updateUser(): void {
    const data = {
      email: this.user.email,
      password: this.oldPassword,
    };

    this.userService.update(this.userId, data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newuser(): void {
    this.submitted = false;
    this.user = {
      id: '',
      email: '',
      password: '',
    };
  }
}
