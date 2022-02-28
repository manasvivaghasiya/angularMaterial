import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
// import { row } from '../material/material.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialComponent } from '../material/material.component';
import { error } from '@angular/compiler/src/util';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  // directives:[MaterialComponent]
})
export class AddComponent implements OnInit {
  // categoryList=["Boys","girls"]
  formControl: any;
  productForm!: FormGroup;
  actionBtn: string = "save"
  // updateProduct: any;

  productdata: any;
  // id?:string;
  data: any;
  // editData: any;

  // @ViewChild(MaterialComponent) child!:MaterialComponent;
  @ViewChild(MaterialComponent, { static: true }) child!: MaterialComponent;
  // ChangeDetector: any;

  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,

    private formBuilder: FormBuilder,
    private http: HttpClient,
    private ChangeDetector: ChangeDetectorRef
  ) { }
  // @Input()getData:any
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      clothSize: ['', Validators.required],
      inStock: ['', Validators.required],
      id:['']

    });
    if (this.editData) {
      this.actionBtn = "update"
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['description'].setValue(this.editData.description);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['clothSize'].setValue(this.editData.clothSize);
      this.productForm.controls['inStock'].setValue(this.editData.inStock);
      this.productForm.controls['id'].setValue(this.editData._id);



    }

  }
  submit() {

  }


  addProduct() {
    debugger
    if (!this.editData) {
      if (this.productForm.valid) {

        this.http.post(`${environment.apiProduct}/product/add`, this.productForm.value)
          .subscribe({
            next: (res) => {
              alert("product added successfully")
              // this.getProduct();
              // window.location.reload();
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("error while adding the product")
            }

          });
      }
    }
    else {
      this.updateProduct(this.editData._id);

    }

  }
  getProduct() {
    this.http.get(`${environment.apiProduct}/product/get`).subscribe((res: any) => {
      // this.dataSource =  new MatTableDataSource  (res.data);
      console.log(res);
      // console.log(this.dataSource)
      this.ChangeDetector.detectChanges();
    });
  }


  updateProduct(id: string) {
    debugger
    this.http.post(`${environment.apiProduct}/product/update?id=${id}`, this.productForm.value)
      .subscribe({
        next: (res) => {
          alert("product updated successfully");
          this.productForm.reset();
          this.dialogRef.close('update');
          this.getProduct();
        },
        error: () => {
          alert("error while updating the record")
        }
      })
  }


  getByProductId(id: string) {
    this.http.get(`${environment.apiProduct}/product/get-product-by-id?id=${id}`).subscribe((res: any) => {
      this.productdata = new MatTableDataSource<row>(res.data);
    });

  }
}

export interface row {
  category: string;
  productName: string;
  description: string;
  price: number;
  clothSize: string;
  inStock: string;
}

