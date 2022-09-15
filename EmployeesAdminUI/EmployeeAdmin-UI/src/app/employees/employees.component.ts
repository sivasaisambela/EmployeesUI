import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Employee } from '../models/ui-models/employee.model';
import { EmpserviceService } from './empservice.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

   employees : Employee[]=[];
   displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','department'];
   dataSource: MatTableDataSource<Employee>  = new MatTableDataSource<Employee>();
   @ViewChild(MatPaginator) matPaginator! : MatPaginator;
   @ViewChild(MatSort, { static: true }) matSort!: MatSort;
   filterString='';


  constructor(private empService: EmpserviceService) { }

  ngOnInit(): void {
    //fetch employees
    this.empService.getEmployees()
    .subscribe(
      (successResponse)=>{
        this.employees = successResponse;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);

        if(this.matPaginator)
        {
          this.dataSource.paginator = this.matPaginator;
        }

        if(this.matSort)
        {
          this.dataSource.sort = this.matSort;
        }
      },
      (errorResponse)=>{
        console.log(errorResponse)
      }
    );

  }

  filterEmployees(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();

  }

}
