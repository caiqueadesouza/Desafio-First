import { NgModule } from "@angular/core";
import { NavComponent } from "./nav/nav.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [NavComponent],
  imports: [MatIconModule],
  exports: [NavComponent],
})
export class NavModule { }
