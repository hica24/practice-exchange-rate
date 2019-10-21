import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExchangeRateService } from './exchange-rate.service';
import { Currency } from '../common/model/currency.enum';
@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {
  valueConvert = 0;
  form: FormGroup;
  date = '';
  nameCurrencyFrom = '';
  nameCurrencyTo = '';
  valueDolarCurrent = 0;
  valueCurrent = 1;
  constructor(
    private fb: FormBuilder,
    private exchangeRateService: ExchangeRateService) {
    this.creatingform();
  }

  ngOnInit() {
    this.callServiceConvert();
    this.onChangeCurrencyAndText();
    this.onConvert(this.valueCurrent);
  }
  onConvert(value: number) {
    this.valueCurrent = +value;
    this.callServiceConvert();
  }
  onChangeCurrencyAndText() {
    if (this.form.controls.currencyFrom.value === 'USD') {
      this.nameCurrencyFrom = Currency.USD;
      if (this.form.controls.currencyTo.value === 'PEN') {
        this.nameCurrencyTo = Currency.PEN;
        this.valueConvert = this.convertSoles(this.valueCurrent, this.valueDolarCurrent);
      } else if (this.form.controls.currencyTo.value === 'USD') {
        this.nameCurrencyTo = Currency.USD;
        this.valueConvert = this.valueCurrent;
      }
    } else if (this.form.controls.currencyFrom.value === 'PEN') {
      this.nameCurrencyFrom = Currency.PEN;
      if (this.form.controls.currencyTo.value === 'PEN') {
        this.nameCurrencyTo = Currency.PEN;
        this.valueConvert = this.valueCurrent;
      } else if (this.form.controls.currencyTo.value === 'USD') {
        this.nameCurrencyTo = Currency.USD;
        this.valueConvert = this.convertDolar(this.valueCurrent, this.valueDolarCurrent);
      }
    }
  }
  convertSoles(value: number, multiple: number) {
    return value * multiple;
  }
  convertDolar(value: number, divisor: number) {
    return value / divisor;
  }
  onChangeSelect() {
    this.onConvert(this.form.controls.amount.value);
  }
  onExchange() {
    const currencyFrom = this.form.controls.currencyFrom.value;
    const currencyTo = this.form.controls.currencyTo.value;
    this.form.controls.currencyFrom.setValue(currencyTo);
    this.form.controls.currencyTo.setValue(currencyFrom);
    this.onChangeSelect();
  }

  callServiceConvert() {
    this.exchangeRateService.exchangeRateDolar().subscribe((result: any) => {
      if (result) {
        this.valueDolarCurrent = result.quotes.USDPEN;
        this.date = moment(new Date()).utc().format('YYYY-MM-DD HH:mm');
        this.onChangeCurrencyAndText();
      }
    });
  }

  get formControl() { return this.form.controls; }
  private creatingform() {
    this.form = this.fb.group({
      amount: [1, [Validators.required]],
      currencyFrom: ['USD'],
      currencyTo: ['PEN']
    });
  }

}
