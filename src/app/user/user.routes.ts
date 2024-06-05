import { RouterModule, Routes } from '@angular/router';
import { UserReadComponent } from './user-read/user-read.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: UserReadComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }