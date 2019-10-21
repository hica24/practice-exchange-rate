import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { ErrorMessagesComponent } from './common/error-messages/error-messages.component';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { environment } from 'src/environments/environment';

export const customCurrencyMaskConfig = {
   align: 'right',
   allowNegative: false,
   allowZero: true,
   decimal: '.',
   precision: environment.precisionDecimal,
   prefix: '',
   suffix: '',
   thousands: ',',
   nullable: false
};


@NgModule({
   declarations: [
      AppComponent,
      ExchangeRateComponent,
      NavbarComponent,
      FooterComponent,
      ErrorMessagesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule,
      NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
      BrowserAnimationsModule,
      NgSelectModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      ExchangeRateService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
