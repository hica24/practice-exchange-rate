/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExchangeRateComponent } from './exchange-rate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExchangeRateService } from './exchange-rate.service';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgSelectModule } from '@ng-select/ng-select';
import { ErrorMessagesComponent } from '../common/error-messages/error-messages.component';
import { HttpClientModule } from '@angular/common/http';

describe('ExchangeRateComponent', () => {
  let component: ExchangeRateComponent;
  let fixture: ComponentFixture<ExchangeRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateComponent, ErrorMessagesComponent],
      imports: [ReactiveFormsModule, CommonModule, NgxCurrencyModule, NgSelectModule, HttpClientModule],
      providers: [ExchangeRateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert Dolar to Soles', () => {
    expect(component.convertSoles(10, 3.34)).toEqual(33.4);
  });

  it('should convert Soles to Dolars', () => {
    expect(component.convertDolar(1, 3.33).toPrecision(2)).toEqual((0.30).toPrecision(2));
  });

  it('should call event exchange currency', () => {
    spyOn(component, 'onExchange');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('i');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onExchange).toHaveBeenCalled();
    });
  });

});