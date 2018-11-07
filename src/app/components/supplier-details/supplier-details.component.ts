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
  supplierName: any;
  filterBySupplier = [];
  suppliers: any;

  constructor(
    private totalSuppliers: TotalSupplierService,
    private route: ActivatedRoute,
    private router: Router ) {
      this.route.params.subscribe( params => console.log(params));
    }

  ngOnInit() {
    this.supplierName = this.route.snapshot.paramMap.get('name').replace(/_/g, ' ');
    this.req = this.totalSuppliers.getData().subscribe( data => {
      this.supplierData = data;
      this.generateSupplier(this.supplierName);
      this.initPieChar();
      this.getSuppliers();
     });

  }

  getSuppliers() {
    this.suppliers = new Set(...[this.supplierData.map(supplier => supplier['Supplier name'])]);
  }

  generateSupplier(name) {
     this.filterBySupplier = this.supplierData.filter(supplier => supplier['Supplier name'] === name);
     this.supplierMonth = this.filterBySupplier.reduce((acc, supplier) => {
      if (acc[supplier['Document Date']]) {
        acc[supplier['Document Date']] = acc[supplier['Document Date']] + parseFloat(supplier['Total with Tax']);
        return acc;
      }
      acc[supplier['Document Date']] = parseFloat(supplier['Total with Tax']);
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
            label: this.supplierName,
            data: Object.values(this.supplierMonth),
        }]
    },
    options: {}
    });
  }

  changeName (event: any) {
    this.router.navigate(['/details/', event.target.value.replace(/ /g, '_')]);
    window.location.reload();
  }
}


