import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginForm } from 'src/app/interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  login() {
    /* this.router.navigateByUrl('/'); */
    this.formSubmitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        if ( this.loginForm.get('remember')!.value) {
          localStorage.setItem('email', this.loginForm.get('email')!.value!);
        } else {
          localStorage.removeItem('email');
        }
      },
      (err) => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
