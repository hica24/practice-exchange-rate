/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExchangeRateService } from './exchange-rate.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: ExchangeRate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangeRateService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([ExchangeRateService], (service: ExchangeRateService) => {
    expect(service).toBeTruthy();
  }));
});
