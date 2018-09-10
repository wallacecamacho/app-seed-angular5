import { Language } from 'angular-l10n';
import { Component, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { CadastroClienteService } from '../services/manter-cliente.service';

@Component({
    selector: 'app-dialog-message',
    template: `
  <div mat-dialog-title  >
    <div style="display: flex; align-content: flex-end; flex-direction: row-reverse;">
    <a href="javascript:;" (click)="onClose(this.$event)" class="ps-modal-close ps-modal-close-default">
      <span style="{cursor: pointer;}" class="ps-ico ps-ico-sm ps-ico-close"></span>
    </a>
    </div>
    <div style="display: flex; align-content: flex-end; flex-direction: row;">
    {{data.info}}
    </div>
  </div>
  <div mat-dialog-content>
    <div *ngIf="data.status === 'sucesso' ">
      <h4 ps-title ps-heading="4" ps-light>
      <ps-ico ps-type="ps-glyph" ps-size="md" ps-ico="information"></ps-ico>
      {{data.message}}
      </h4>
    </div>
    <div *ngIf="data.status === 'erro' ">
    <h4 ps-title ps-heading="4" ps-light>
    <ps-ico ps-type="ps-glyph" ps-size="md" ps-ico="information"></ps-ico>
    {{data.message}}
    </h4>
    </div>
    <div *ngIf="data.status === 'excluir' ">
    <h4 ps-title ps-heading="4" ps-light>
    <ps-ico ps-type="ps-glyph" ps-size="md" ps-ico="information"></ps-ico>
    {{data.message}}
    </h4>
    </div>
  </div>
  <mat-dialog-actions style="align-content: stretch; flex-direction: row;">
  </mat-dialog-actions>
  <mat-divider></mat-divider>
  <mat-dialog-actions style="align-content: stretch; flex-direction: row;" *ngIf="data.status !== 'excluir' ">
    <button mat-button (click)="closeAllDialogs()" [mat-dialog-close]="true">Fechar</button>
  </mat-dialog-actions>
  <mat-dialog-actions style="align-content: stretch; flex-direction: row;" *ngIf="data.status === 'excluir' ">
  <button mat-button (click)="excluirCliente(data.clienteEdit)" [mat-dialog-close]="true">Sim</button>
  <button mat-button (click)="closeAllDialogs()" [mat-dialog-close]="true">Não</button>
</mat-dialog-actions>`
  })
export class DialogMessageComponent {

  @Language()
  public lang: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public clienteService: CadastroClienteService) {
    }

    public closeAllDialogs() {
      this.dialog.closeAll();
    }

    @HostListener('click', ['$event'])
    onClose(e) {
      e.stopPropagation();
      // this.closeAllDialogs();
      this.dialog.closeAll();
    }

    excluirCliente(cliente: Cliente) {
      this.clienteService.removerCliente(cliente.id).subscribe(result => {
      });
    }

}
