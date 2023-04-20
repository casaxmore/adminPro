import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService){}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: any): any {
    var file: File;

    file = event.target.files[0];
    console.log(file);

    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        Swal.fire('Imagen guardada', 'Imagen de usuario actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch(err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
