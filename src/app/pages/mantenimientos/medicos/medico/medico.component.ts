import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital | undefined;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['casaXmore', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe(hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find(hospital => hospital._id === hospitalId);
          console.log(this.hospitalSeleccionado);
        })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      })
  }

  guardarMedico() {
    console.log(this.medicoForm.value);
  }
}
