import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService){}

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
      console.log(reader.result);
    };
  }

}
