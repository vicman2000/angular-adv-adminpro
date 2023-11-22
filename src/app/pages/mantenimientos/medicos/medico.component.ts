import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

import { MedicoService } from 'src/app/services/medico.service';
import { HospitalService } from '../../../services/hospital.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  public noImageFound: any;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /** OnInit */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.obtenerNoImage();

    this.cargarHospitales();

    /** Observable */
    // campo del form que se va a observar
    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (hosp) => hosp._id === hospitalId
      );
    });
  }

  /********************/
  /** Metodos         */
  /********************/

  cargarMedico(id: string) {
    if (id != 'nuevo') {
      this.medicoService.obtenerMedicoById(id)
      .pipe( delay(100))
      .subscribe({
        next: (medico) => {
          const {
            nombre,
            hospital: { _id },
          } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ nombre, hospital: _id });
        },
        error: (err: any) => {
          this.router.navigateByUrl(`/dashboard/medicos`);
        },
      });
    }
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //Actualizar médico

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };

      this.medicoService.actualizarMedico(data)
          .subscribe( resp=> {
            Swal.fire('Médico', `${data.nombre} ha sido actualizado`, 'success');
            //this.router.navigateByUrl(`/dashboard/medicos`);
          });


    } else {
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Médico', `${nombre} ha sido creado`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }

  obtenerNoImage() {
    //Obtengo imagen de relleno
    this.noImageFound = this.medicoService.obtieneNoImage();
  }

  cargarHospitales() {
    this.hospitalService
      .cargaHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }
}
