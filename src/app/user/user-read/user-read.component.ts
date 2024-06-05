import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';
import { IUser } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.services';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { MatMenuModule } from '@angular/material/menu';
import { AvatarModule } from 'src/app/shared/avatar/avatar.module';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    AlertModule,
    MatMenuModule,
    AvatarModule
  ]
})
export class UserReadComponent implements OnInit {

  users: IUser[] = [];

  pageEvent!: PageEvent;
  pageIndex = 0;
  pageSize = 10;
  totalUsers = 0;

  searchTerm: string = '';
  statusFilter: string = '';

  displayedColumns: string[] = ['user', 'status', 'created', 'access', 'acoes'];

  constructor(
    private userServices: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.userServices.read(this.pageIndex + 1, this.pageSize, this.searchTerm, this.statusFilter).subscribe(({ users, totalUsers }) => {
      this.users = users;
      this.totalUsers = totalUsers;
    });
  }

  pageNavigations(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listUsers();
  }

  storeUser(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.listUsers();
      }
    });
  }

  getBadgeClass(item: string): string {
    let color = '';

    switch (item) {
      case 'Ativo':
        color = 'badge rounded-pill bg-success';
        break;
      case 'Pendente':
        color = 'badge rounded-pill bg-warning';
        break;
      case 'Bloqueado':
        color = 'badge rounded-pill bg-danger';
        break;
      default:
        color = 'badge rounded-pill bg-primary';
        break;
    }

    return color;
  }

  applyFilter(event: Event, filterType: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterType === 'name') {
      this.searchTerm = filterValue;
    } else if (filterType === 'status') {
      this.statusFilter = filterValue;
    }

    this.pageIndex = 0;
    this.listUsers();
  }

  getBackgroundColor(letter: string): string {
    switch (letter.toUpperCase()) {
      case 'A':
      case 'B':
      case 'C':
        return 'bg-primary';
      case 'D':
      case 'E':
      case 'F':
        return 'bg-secondary';
      case 'G':
      case 'H':
      case 'I':
        return 'bg-success';
      case 'J':
      case 'K':
      case 'L':
        return 'bg-danger';
      case 'M':
      case 'N':
      case 'O':
        return 'bg-warning';
      case 'P':
      case 'Q':
      case 'R':
        return 'bg-info';
      case 'S':
      case 'T':
      case 'U':
        return 'bg-light';
      case 'V':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
        return 'bg-dark';
      default:
        return 'bg-light';
    }
  }
}
