// console.log(a.replace(/ /g, '_'))
import { SupplierData } from './../../supplier';
import { TotalSupplierService } from './../../services/total-supplier.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-total-suppliers',
  templateUrl: './total-suppliers.component.html',
  styleUrls: ['./total-suppliers.component.css']
})
export class TotalSuppliersComponent implements OnInit {
  private req: any;
  supplierData: [SupplierData];
  chart = [];
  monthlyExpenses = {};
  selectedMonth: string = '';
  filterByMonth = [] ;

  constructor( private totalSuppliers: TotalSupplierService) { }

  ngOnInit() {
    this.req = this.totalSuppliers.getData().subscribe( data => {
    this.supplierData = data;
   });
  }

  // filter data by month and calculate totals by supplier name
  generateMonthlyExpenses(month) {
    this.filterByMonth = this.supplierData.filter(supplier => supplier['Document Date'].split('/')[1] === month);
    console.log(this.filterByMonth);
    this.monthlyExpenses = this.filterByMonth.reduce((acc, supplier) => {
      if (acc[supplier['Supplier name']]) {
        acc[supplier['Supplier name']] = acc[supplier['Supplier name']] + parseFloat(supplier['Total with Tax']);
        return acc;
      }
      acc[supplier['Supplier name']] = parseFloat(supplier['Total with Tax']);
      return acc;
    }, {});
  }

  //generate a random color for chart backgroundColor
  genereateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //chart.js
  initPieChar() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
          labels: Object.keys(this.monthlyExpenses),
          datasets: [{
              label: 'Amout of suppliers',
              data: Object.values(this.monthlyExpenses),
              backgroundColor: Object.keys(this.monthlyExpenses).map(e => this.genereateRandomColor ()),
          }]
      },
      options: {}
    });
  }

  //show data by month
  getMonth (event: any) {
    this.selectedMonth = event.target.value;
    this.generateMonthlyExpenses(this.selectedMonth);
    this.initPieChar();
  }

}
