import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

  userFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
  ) {
    this.userFormGroup = this.formBuilder.group({
      fname: [data?.fname ?? '', Validators.required],
      lname: [data?.lname ?? '', Validators.required],
      email: [data?.email ?? '', [Validators.email, Validators.required]],
      mobile: [data?.mobile ?? '', Validators.required],
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.userFormGroup.valid) {
      this.dialogRef.close({
        _id: this.data._id,
        ...this.userFormGroup.value
      } as User);
    }
  }

}
