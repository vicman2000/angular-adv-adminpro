import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any; //Declaración de variable para enlace con Google

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('btnGoogle')
  btnGoogle!: ElementRef;

  formSubmmitted = false;
  loginForm: FormGroup; //Agregar el loginForm en un FormGroup, e importar 
  
  constructor(private router: Router, 
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) 
    {
      this.loginForm = this.fb.group(
        {
          email: [ (localStorage.getItem('email') || ''), [Validators.required, Validators.email] ],
          password: ['', Validators.required ],
          rememberMe: [(localStorage.getItem('remember') || false)]
        });
    }

  /******************************/
  /** FUNCIONES CONEXION GOOGLE */
  /******************************/
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "179552952214-d9c1akugj4fqvakri9538cob1rimcc7n.apps.googleusercontent.com",
      callback: (response:any) => this.ngZone.run( () => this.handleCredentialResponse( response ))
    });
    
    google.accounts.id.renderButton(
      this.btnGoogle.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );    
  }

  handleCredentialResponse( response: any ) {
    //console.log( 'Encoded Jwt Id Token: ' + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe({
        next: resp =>{          
          this.router.navigateByUrl('/'); // Si credenciales google bien, se crea token validado y se ingresa al sistema
        }
      });
  }

/** FIN FUNCIONES CONEXION GOOGLE */



  /** FUNCIONES DE login */
  login() {
    this.formSubmmitted = true;
    //console.log( this.registerForm.value );

    if (this.loginForm.invalid) {
      return;
    }

    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next: resp => {
          //tu codigo aqui
          if( this.loginForm.get('rememberMe')?.value ){
            localStorage.setItem('email', this.loginForm.get('email')?.value );
          }
          else {
            localStorage.removeItem('email');
          }

          localStorage.setItem('remember', this.loginForm.get('rememberMe')?.value );

          this.router.navigateByUrl('/'); // Si credenciales google bien, se crea token validado y se ingresa al sistema
          
        },
        error: err => {
          //tu codigo aqui
           Swal.fire('Logon', err.error.msg || 'Falla al autenticarse','error');
        }
      })
  }


  
  // Valida campos requeridos
  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmmitted) {
      return true;
    } else {
      return false;
    }
  }

}
