import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = false;
  public cantRegistros: number = 0;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe({
        next: () => {
          this.cargarHospitales();
        },
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargaHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.cantRegistros = hospitales.length || 0;
      this.cargando = false;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire(
          'Hospital',
          `${hospital.nombre} ha sido actualizado`,
          'success'
        );
      });
  }

  borrarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Hospital', `${hospital.nombre} ha sido eliminado`, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      inputValidator: (result) => !result && 'Error: valor requerido',
      title: 'Crear Hospital',
      inputLabel: 'Ingrese nombre del Hospital',
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputPlaceholder: 'Escriba nombre del hospital',
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      //return (this.hospitales = this.hospitalesTemp);
      return this.cargarHospitales();
    }

    return this.busquedasService
      .buscar('hospitales', termino )
      .subscribe((resultado: Hospital[]) => {
        this.hospitales = resultado;
      });
  }

  /** FIN DE LA CLASE */
}
