import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {

  }
  ngOnInit(): void {
    this.usuarioService.cargarUsuarios(0)
      .subscribe(({total, usuarios}) => {
        this.totalUsuarios = total,
        this.usuarios = usuarios;
        console.log(usuarios);
      })
  }



}