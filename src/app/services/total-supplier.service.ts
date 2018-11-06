import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

const endpoint = 'assets/json/supplierData.json';
@Injectable({
  providedIn: 'root'
})

export class TotalSupplierService {

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
}
