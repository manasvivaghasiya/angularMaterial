// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';



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
  row:any;
  productForm: any;
  dataSource!: MatTableDataSource<row>;


  constructor(public Add: MatDialog ,
       private http:HttpClient
    ) { }

  ngOnInit(): void {
  
   this.getProduct();
    

   
  }

  getProduct(){
    this.http.get(`${environment.apiProduct}/product/get`).subscribe((res:any)=>{
      this.dataSource =  new MatTableDataSource < row > (res.data);
      console.log(res);
      console.log(this.dataSource)
    });
  }

  openDialog(){
    this.Add.open(AddComponent,{
      width:'22%'
});
  
}
addProduct(){

}


 deleteProduct(id:string){
   debugger
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

  export interface row {
   category:string;
   productName:string;
   description:string;
   price:number;
   clothSize:string;
   inStock:string;
  }
