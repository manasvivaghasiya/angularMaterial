import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
// import { row } from '../material/material.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaterialComponent } from '../material/material.component';
import { error } from '@angular/compiler/src/util';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @inject(MAT_DIALOG_DATA)
  // categoryList=["Boys","girls"]
  formControl: any;
  productForm!:FormGroup;
  actionBtn : string ="save"
  // updateProduct: any;

  productdata:any;
  // id?:string;
  data:any;
  editData: any;

  constructor(private formBuilder:FormBuilder, 
    private http:HttpClient,
    public dialogRef: MatDialogRef<AddComponent>){ }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category:['',Validators.required],
      productName:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      clothSize:['',Validators.required],
      inStock:['',Validators.required],
      
    });
    if(this.editData){
      this.actionBtn="update"          
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['description'].setValue(this.editData.description);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['clothSize'].setValue(this.editData.clothSize);
      this.productForm.controls['inStock'].setValue(this.editData.inStock);


    }
   
  }
  submit(){

  }


 addProduct(){
      debugger
  //  console.log(this.productForm.value)
      //  this.http.post(`${environment.apiProduct}/product/add`,this.productForm.value)
      //  .subscribe((res:Data)=>{
         
      //  });
      //  this.dialogRef.close
      if(!this.editData){
        if(this.productForm.valid){
        
          this.http.post(`${environment.apiProduct}/product/add`,this.productForm.value)
           .subscribe({
            next:(res)=>{
              alert("product added successfully")
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("error while adding the product")
            }
  
        });
   }else{
     this.updateProduct();
   }
      }
     
}

updateProduct(id?:string){
  this.http.post(`${environment.apiProduct}/product/update?id=${id}`,this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("product updated successfully");
      this.productForm.reset();
      this.dialogRef.close('update');

    },
    error:()=>{
      alert("error while updating the record")
    }
  })
}

 
 getByProductId(id:string){
  this.http.get(`${environment.apiProduct}/product/get-product-by-id?id=${id}`).subscribe((res:any)=>{
         this.productdata =  new MatTableDataSource < row > (res.data);
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

