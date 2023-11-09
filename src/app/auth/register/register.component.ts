import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmmitted = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private router: Router) {
    this.registerForm = this.fb.group(
      {
        nombre: [
          'Vicente Manriquez',
          [Validators.required, Validators.minLength(3)],
        ],
        email: [
          'test100@gmail.com',
          [Validators.required, Validators.minLength(3), Validators.email],
        ],
        password: ['123456', [Validators.required, Validators.minLength(6)]],
        password2: ['123456', [Validators.required, Validators.minLength(6)]],
        terminos: [true, Validators.required],
      },
      {
        validators: this.passwordsIguales('password', 'password2'),
      }
    );
  }

  crearUsuario() {
    this.formSubmmitted = true;
    //console.log( this.registerForm.value );

    if (this.registerForm.invalid) {
      return;
    }

    //Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (resp) => {
        console.log('Usuario creado');
        console.log(resp);
        this.router.navigateByUrl('/'); // Si credenciales google bien, se crea token validado y se ingresa al sistema
      },
      error: (err) => {
        Swal.fire('Registro', err.error.msg, 'error');
      },
    });
  
  }

  // Valida campos requeridos
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmmitted) {
      return true;
    } else {
      return false;
    }
  }

  // Valida CheckBox de terminos
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmmitted;
  }

  contrasenasValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 !== pass2 && this.formSubmmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}

