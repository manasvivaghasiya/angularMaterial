// import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddComponent, row } from '../add/add.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  displayedColumns: string[] = ['category', 'productName', 'description', 'price','clothSize','inStock','action'];
  // dataSource:any;
  submit:any;
  data:any;
  public form!:boolean;
  // public productDialog!:boolean
  element: any;
  add: any;
  id:any;
  // row:any;
  productForm: any;
  dataSource!: MatTableDataSource<any>;
  // @ViewChild(MatSort) sort!:MatSort;


  constructor(public dialog: MatDialog ,
       private http:HttpClient,
       private ChangeDetector:ChangeDetectorRef
    ) { }

    // @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;

  ngOnInit(): void {
  
   this.getProduct();
  }

  getProduct(){
    this.http.get(`${environment.apiProduct}/product/get`).subscribe((res:any)=>{
      this.dataSource =  new MatTableDataSource  (res.data);
      console.log(res);
      console.log(this.dataSource)
      this.ChangeDetector.detectChanges();
    });
  }

  // getProduct(){
  //   this.http.get(`${environment.apiProduct}/product/get`).subscribe({
  //     next:(res)=>{
  //       this.dataSource= new MatTableDataSource(res)
  //     }
  //   })
  // }



  openDialog(){
    const dialogRef=this.dialog.open(AddComponent,{
      width:'30%'
}).afterClosed().subscribe(val=>{
  if(val == 'save'){
    this.getProduct();
  }
})

}

editProduct(row:any){
  debugger
  const dialogRef=this.dialog.open(AddComponent,{
    width:'30%',
      data:row
    // this.row.data;

}).afterClosed().subscribe(val=>{
  if(val==='update'){
    this.getProduct();
  }
})

}
getByProductId(id:string){
  this.http.get(`${environment.apiProduct}/product/get-product-by-id?id=${id}`).subscribe((res:any)=>{
        //  this.productdata =  new MatTableDataSource < row > (res.data);
  });

}

 deleteProduct(id:string){
 
  this.http.delete(`${environment.apiProduct}/product/delete?id=${id}`)
  .subscribe((res:any)=>{
    if(res.isSuccess){
      alert('data successfully delete')
      this.getProduct();
    }else{
      alert(res.message)
    }
  });
 }

 

  }




  // export interface row {
  //   category:string;
  //   productName:string;
  //   description:string;
  //   price:number;
  //   clothSize:string;
  //   inStock:string;
  //  }

 
