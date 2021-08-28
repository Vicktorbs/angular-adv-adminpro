import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: Usuario[] = [];
  public fromRange: number = 0;
  public loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  
  loadUser() {
    this.loading = true;
    this.userService.loadUsers(this.fromRange).subscribe(resp => {
      this.totalUsers = resp.total;
      this.users = resp.users;
      this.loading = false;
  });
  }
  
  changePage(value: number) {
    this.fromRange += value;
    
    if (this.fromRange < 0) {
      this.fromRange = 0
    } else if(this.fromRange > this.totalUsers) {
      this.fromRange -= value;
    }

    this.loadUser();
  }

}
