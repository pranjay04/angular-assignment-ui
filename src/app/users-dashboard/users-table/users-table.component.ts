import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = [
    'fname',
    'lname',
    'email',
    'mobile',
    'editActionButton',
    'deleteActionButton',
  ];
  public dataSource: Array<User> = [];

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }

  private refreshUsersList(): void {
    this.userService
      .getAllUsers()
      .subscribe(userList => {
        this.dataSource = userList;
      })
  }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '250px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService
          .addUser(result)
          .subscribe(() => {
            this.refreshUsersList()
          })
      }
    });
  }

  public openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService
          .editUser(result)
          .subscribe(() => {
            this.refreshUsersList()
          })
      }
    });
  }

  public openDeleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService
          .deleteUser(user._id)
          .subscribe(() => {
            this.refreshUsersList()
          })
      }
    });
  }

}
