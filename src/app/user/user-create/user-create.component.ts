import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/_models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InputMaskModule, createMask } from '@ngneat/input-mask';


export interface DialogData {
  user: IUser;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    MatSnackBarModule,
    NgMultiSelectDropDownModule,
    InputMaskModule
  ]
})
export class UserCreateComponent {
  phoneInputMask = createMask({ mask: '(99) 99999-9999', keepStatic: true });

  form: FormGroup;

  dropdownList = ['Supervisor', 'Analista', 'Gerente', 'Diretor', 'Auxiliar'];
  selectedItems = [];
  dropdownSettings = {
    "singleSelection": false,
    "defaultOpen": false,
    "idField": "item_id",
    "textField": "item_text",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "enableCheckAll": false,
    "itemsShowLimit": 3,
    "allowSearchFilter": false
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      profile: ['', [Validators.required]],
      language: ['', [Validators.required]],
      preferredContact: [''],
    });
  }

  confirmClose(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Deseja sair sem Salvar?' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

  onSubmit(): void {

    this.markFormGroupTouched(this.form);

    if (this.form.invalid) {
      return;
    }

    this.form.disable();

    const saved = this.userService.store(this.form.value);
    if (saved) {
      this._snackBar.open('Convite enviado com sucesso!', 'X', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });

      this.dialogRef.close('success');
    }

  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
