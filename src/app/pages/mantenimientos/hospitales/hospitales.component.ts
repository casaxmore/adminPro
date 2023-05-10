import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedaHospitalService } from '../../../services/busqueda-hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit{

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedaHospitalService: BusquedaHospitalService){}


  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarHospitales());

  /*   this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
      }) */
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        console.log(hospitales);
      })
  }

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospitales(hospital._id!, hospital.nombre)
        .subscribe(resp => {
          Swal.fire('Actualizando', hospital.nombre, 'success');
        });
  }

  eliminarHospital(hospital: Hospital){
    this.hospitalService.borrarHospitales(hospital._id!)
        .subscribe(resp => {
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.nombre, 'success');
        });
  }

  async abrirSweetAlert() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if(value!.trim().length > 0){
      this.hospitalService.crearHospitales(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital)
        })
    }
  }

  abrirModal(hospital:Hospital){
    console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img);

  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales();
    }

    this.busquedaHospitalService
      .buscar('hospitales', termino)
      .subscribe((resultados: any) => {
        this.hospitales = resultados;
      });
    return;
  }


}
