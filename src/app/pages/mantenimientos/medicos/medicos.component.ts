import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy{

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService, private busquedaService: BusquedasService){}

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        console.log(medicos);
      })
  }

  guardarCambios(medico: any){
    this.medicoService.actualizarMedico( medico.nombre)
        .subscribe(resp => {
          Swal.fire('Actualizando', medico.nombre, 'success');
        });
  }

  eliminarMedico(medico: Medico){
    this.medicoService.borrarMedico(medico._id!)
        .subscribe(resp => {
          this.cargarMedicos();
          Swal.fire('Borrado', medico.nombre, 'success');
        });
  }

  async abrirSweetAlert() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Médico',
      text: 'Ingrese el nombre del nuevo médico',
      input: 'text',
      inputPlaceholder: 'Nombre del médico',
      showCancelButton: true
    })

    if(value!.trim().length > 0){
      this.medicoService.crearMedico(value)
        .subscribe((resp: any) => {
          this.medicos.push(resp.hospital)
        })
    }
  }

  abrirModal(medico: Medico){
    console.log(medico);
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarMedicos();
      return (this.medicos = []);
    }

    this.busquedaService
      .buscar('medicos', termino)
      .subscribe((resultados: any) => {
        this.medicos = resultados;
      });
    return;

  }

}
