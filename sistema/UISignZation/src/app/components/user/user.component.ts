import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  users?: User[];
  currentUser: User = {};
  currentIndex = -1;

  constructor(
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res
      },
      error: (e) => console.error(e),
    });
  }

  deleteUser(id:number): void {
    this.userService.delete(id).subscribe({
      next: (res) => {
        this.getAllUsers()
      },
      error: (e) => console.error(e),
    });
  }
}
