import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TotalSupplierService } from './../../services/total-supplier.service';
import { SupplierData } from './../../supplier';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  private req: any;
  supplierData: [SupplierData];
  chart:any;
  supplierMonth = {};
  supplierName: any;
  filterBySupplier = [];

  constructor( 
    private totalSuppliers: TotalSupplierService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.supplierName = this.route.snapshot.paramMap.get("name").replace(/_/g, ' ');
    this.req = this.totalSuppliers.getData().subscribe( data => {
      this.supplierData = data;
      this.generateSupplier(this.supplierName); 
      
     }); 

     this.initPieChar();
  }

  generateSupplier(name) {
     this.filterBySupplier = this.supplierData.filter(supplier => supplier['Supplier name']=== name); 
     this.supplierMonth = this.filterBySupplier.reduce((acc, supplier) => {      
      acc[supplier['Document Date']] = parseFloat(supplier['Total with Tax']);
      return acc;
    }, {});

    console.log(this.supplierMonth);
     
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
      type: 'bar',
      data: {
        labels: Object.keys(this.supplierMonth),
        datasets: [{
            label: Object.keys(this.supplierMonth),
            data: Object.values(this.supplierMonth),
            backgroundColor: Object.keys(this.supplierMonth).map(e => this.genereateRandomColor ()),
        }]
    },
    options: {}
    });
  }

}


