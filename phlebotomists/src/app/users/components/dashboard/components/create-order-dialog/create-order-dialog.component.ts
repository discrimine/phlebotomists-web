import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {

  public order: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    // TODO: provide type if needed
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.order = this.formBuilder.group({
      doctor: ['', Validators.required],
      analysisType: ['', Validators.required],
      patients: [[]],
      facility: ['', Validators.required],
      location: ['', Validators.required],
      equipment: [[]],
    });
  }

  ngOnInit() {

  }

  public submitOrder(): void {
    console.log(this.order.getRawValue());
  }

}
