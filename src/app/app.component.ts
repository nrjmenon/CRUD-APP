import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = 
    [
      'firstName', 
      'lastName', 
      'email', 
      'dob',
      'gender',
      'education',
      'company',
      'experience',
      'package',
      'actions'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
      this.getEmployeeList();
    }

  addEmployeeFrom(){
    const dialog = this.dialog.open(EmpAddEditComponent, {
      width: '500px'
    });
    dialog.afterClosed().subscribe({
      next: (data :any) =>{
        if(data){
          this.getEmployeeList();
        }
      },
      error: (err :any) => {
        alert(err);
      }

    })
  }

  editEmployeeFrom(data :any){
    this.dialog.open(EmpAddEditComponent, {
      width: '500px',
      data: data
    });  
  }

  getEmployeeList(){
    this.employeeService.getEmployeeList().subscribe({
      next: (data :any) =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err :any) => {
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number){
    if(confirm('Are you sure to delete?')){
      this.employeeService.deleteEmployee(id).subscribe({
        next: (data :any) =>{
          this.getEmployeeList();
          alert('Employee deleted successfully');
        },
        error: (err :any) => {
          alert(err);
        }
      })
    }
  } 
}
