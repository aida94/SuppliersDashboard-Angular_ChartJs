import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TotalSupplierService } from './../../services/total-supplier.service';
import { SupplierData } from './../../supplier';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  private req: any;
  supplierData: [SupplierData];
  chart: any;
  supplierMonth = {};
  months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  supplierName: any;
  filterBySupplier = [];
  suppliers: any;
  month: string;

  constructor(
    private totalSuppliers: TotalSupplierService,
    private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit() {
    this.supplierName = this.route.snapshot.paramMap.get('name').replace(/_/g, ' ');
    this.req = this.totalSuppliers.getData().subscribe( data => {
      this.supplierData = data;
      this.generateSupplier(this.supplierName);
      this.initPieChar();
      this.getSuppliers();
     });
     this.totalSuppliers.currentMonth.subscribe(message => this.month = message);
  }

  getSuppliers() {
    this.suppliers = new Set(...[this.supplierData.map(supplier => supplier['Supplier name'])]);
  }

  generateSupplier(name) {
     this.filterBySupplier = this.supplierData.filter(supplier => supplier['Supplier name'] === name);
     this.supplierMonth = this.filterBySupplier.reduce((acc, supplier) => {
      if (acc[supplier['Document Date'].split('/')[1]]) {
        // tslint:disable-next-line:max-line-length
        acc[supplier['Document Date'].split('/')[1]] = acc[supplier['Document Date'].split('/')[1]] + parseFloat(supplier['Total with Tax']);
        return acc;
      }
      acc[supplier['Document Date'].split('/')[1]] = parseFloat(supplier['Total with Tax']);
      return acc;
    }, {});
  }

  // chart.js
  initPieChar() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: Object.keys(this.supplierMonth),
        datasets: [{
            label: Object.keys(this.supplierMonth),
            data: Object.values(this.supplierMonth),
            backgroundColor: Object.keys(this.supplierMonth).map(e => this.totalSuppliers.genereateRandomColor()),
        }]
    },
    options: {}
    });
  }

  changeName (event: any) {
    this.router.navigate(['/details/', event.target.value.replace(/ /g, '_')]);
    window.location.reload();
  }
  showData(evt: any) {
    const data = this.chart.getElementsAtEvent(evt);
    this.router.navigateByUrl('/dashboard');
    this.newMonth(data[0]._model.label);
   }

   newMonth(month) {
    this.totalSuppliers.changeMonth(month);
  }
}


