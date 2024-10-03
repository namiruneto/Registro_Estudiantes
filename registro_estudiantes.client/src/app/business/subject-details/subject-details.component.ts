import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface Materia {
  matternId: number;
  name: string;
  credit: number;
  nameTeacher: string;
}

export interface MatterRegister {
  nameStudent: string;
}

export interface SubjectDetailsData {
  matter: Materia;
  additionalData: MatterRegister[]; 
}

@Component({
  selector: 'app-subject-details',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './subject-details.component.html', 
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<SubjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubjectDetailsData 
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
