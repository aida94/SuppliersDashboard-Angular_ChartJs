import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const endpoint = 'assets/json/supplierData.json';
@Injectable({
  providedIn: 'root'
})

export class TotalSupplierService {
  private month = new BehaviorSubject('00');
  currentMonth = this.month.asObservable();

  constructor(private http: Http) { }

  // method for getting suppliers data
  getData() {
    return this.http.get(endpoint)
                .pipe(map(response => response.json()),
                catchError(this.handleError));
  }

  private handleError(error: any, caught: any): any {
    console.log(error, caught);
  }

  // generate a random color for chart backgroundColor
  genereateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  changeMonth(message: string) {
    this.month.next(message);
  }
}
