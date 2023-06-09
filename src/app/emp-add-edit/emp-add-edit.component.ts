import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core'; 

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  education : string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  empForm : FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>
    ) { 
    this.empForm = this.fb.group({ 
      firstName : '',
      lastName : '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.data){
      if(this.empForm.valid) {
        this.employeeService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (res :any) => {
            this.empForm.reset();
            this.dialogRef.close(true);
            alert('Employee Updated');
          },
          error: (err : any) =>{
            alert('Something went wrong!');
            console.log(err);
          }
        })
      }
    } else {
      if(this.empForm.valid) {
        this.employeeService.addEmployee(this.empForm.value).subscribe({
          next: (res :any) => {
            this.empForm.reset();
            this.dialogRef.close(true);
            alert('Employee added Succesfully');
          },
          error: (err : any) =>{
            alert('Something went wrong!');
            console.log(err);
          }
        })
      }
    }
    
  }

}
