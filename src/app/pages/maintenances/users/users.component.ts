import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;
  public users: Usuario[] = [];
  public usersTemp: Usuario[] = [];
  public fromRange: number = 0;
  public loading: boolean = true;

  constructor(private userService: UserService,
              private serachService: SearchesService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  
  loadUser() {
    this.loading = true;
    this.userService.loadUsers(this.fromRange).subscribe(resp => {
      this.totalUsers = resp.total;
      this.users = resp.users;
      this.usersTemp = resp.users;
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

  search(termin: string) {
    if (termin.length === 0) {
      return this.users = this.usersTemp;
    }
    this.serachService.search('users', termin).subscribe(
      resp => {
        this.users = resp;
      }
      
    )
  }

  deleteUser(user: Usuario) {

    if (user.uid === this.userService.uid) {
      return Swal.fire(
        'Error',
        'You are not able to delete your own profile',
        'error'
      )
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `You are trying to delete: ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe(
          resp => {
            this.loadUser();
            Swal.fire(
              'Deleted!',
              `User '${ user.name }' was delete`,
              'success'
            )
          }
        )
      }
    })
  }

}
