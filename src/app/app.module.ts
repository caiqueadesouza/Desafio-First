import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from './_core/nav/nav.module';
import { FooterModule } from './_core/footer/footer.module';
import { MatPaginatorIntlBr } from './_helpers/br-paginator-intl.model';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule,
    FooterModule,
    InputMaskModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
