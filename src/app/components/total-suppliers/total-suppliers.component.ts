
import { SupplierData } from './../../supplier';
import { TotalSupplierService } from './../../services/total-supplier.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-suppliers',
  templateUrl: './total-suppliers.component.html',
  styleUrls: ['./total-suppliers.component.css']
})
export class TotalSuppliersComponent implements OnInit {
  private req: any;
  supplierData: [SupplierData];
  chart: any;
  monthlyExpenses = {};
  selectedMonth = '';
  filterByMonth = [];
  chosenSupplier: any ;

  constructor(
    private totalSuppliers: TotalSupplierService,
    private router: Router ) { }

  ngOnInit() {
    this.req = this.totalSuppliers.getData().subscribe( data => {
    this.supplierData = data;
    this.totalSuppliers.currentMonth.subscribe(message => this.selectedMonth = message);
    this.generateMonthlyExpenses(this.selectedMonth);
    this.initPieChar();
   });
  }

  // filter data by month and calculate totals by supplier name
  generateMonthlyExpenses(month) {
    this.filterByMonth = this.supplierData.filter(supplier => supplier['Document Date'].split('/')[1] === month);
    this.monthlyExpenses = this.filterByMonth.reduce((acc, supplier) => {
      if (acc[supplier['Supplier name']]) {
        acc[supplier['Supplier name']] = acc[supplier['Supplier name']] + parseFloat(supplier['Total with Tax']);
        return acc;
      }
      acc[supplier['Supplier name']] = parseFloat(supplier['Total with Tax']);
      return acc;
    }, {});
  }

  // chart.js
  initPieChar() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
          labels: Object.keys(this.monthlyExpenses),
          datasets: [{
              label: Object.keys(this.monthlyExpenses),
              data: Object.values(this.monthlyExpenses),
              backgroundColor: Object.keys(this.monthlyExpenses).map(e => this.totalSuppliers.genereateRandomColor()),
          }]
      },
      options: {}
    });
  }

  // show data by month
  getMonth (event: any) {
    this.selectedMonth = event.target.value;
    this.generateMonthlyExpenses(this.selectedMonth);
    this.initPieChar();
  }

  showData(evt: any) {
    const data = this.chart.getElementsAtEvent(evt);
    this.chosenSupplier = data[0]._model.label.replace(/ /g, '_');
    this.router.navigateByUrl('/details/' + this.chosenSupplier);
   }

}
