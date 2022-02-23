// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { AddComponent } from '../add/add.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  displayedColumns: string[] = ['category', 'productName', 'description', 'price','clothSize','actions'];
  dataSource:any;
  submit:any;
  data:any;
  public form!:boolean;
  public productDialog!:boolean
  element: any;


  constructor(public dialog: MatDialog ,) { }

  ngOnInit(): void {
 
  }

  getProduct(){
    
  }

  openAddDialog(){
   

  }
  startEdit(){

  }
  deleteItem(){

  }
  onNoClick(){
        
  }
  stopEdit(){
  
  }

  confirmAdd(){
    
  }
  

}
function add(add: any, arg1: {}) {
  throw new Error('Function not implemented.');
}

