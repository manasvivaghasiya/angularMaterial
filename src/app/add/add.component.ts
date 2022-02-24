import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  categoryList=["Boys","girls"]
  formControl: any;
  productForm!:FormGroup;
  actionBtn : string ="save"
  updateProduct: any;

  constructor(private formBuilder:FormBuilder, 
  private dialogRef:MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category:['',Validators.required],
      productName:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      clothSize:['',Validators.required],
      inStock:['',Validators.required],
      
    });
  }


 addProduct(){
         
 }
}
