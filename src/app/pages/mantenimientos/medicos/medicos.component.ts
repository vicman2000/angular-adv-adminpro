import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = false;
  public cantRegistros: number = 0;
  private imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe({
        next: () => {
          this.cargarMedicos();
        },
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargaMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
      this.cantRegistros = medicos.length || 0;
    });
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.cargarMedicos();
    }

    return this.busquedasService
      .buscar('medicos', termino)
      .subscribe((resultado: Medico[]) => {
        this.medicos = resultado;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico(medico: Medico) {
    return Swal.fire({
      title: 'Eliminar Médico?',
      text: `Esta a punto de eliminar el Médico ${medico.nombre}.  Esta acción no es reversible, desea continuar?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'El Médico',
            `${medico.nombre} ha sido eliminado`,
            'success'
          );
        });
      }
    });
  }

  /** FIN DE LA CLASE */
}
