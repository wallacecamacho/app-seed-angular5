import { ListarClienteComponent } from './listar-cliente.component';
import { PaginationInstance } from 'ngx-pagination';
import { Cliente } from './../models/cliente';
import { Language, TranslationService } from 'angular-l10n';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  Inject,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CadastroClienteService } from '../services/manter-cliente.service';
import { MatDialog } from '@angular/material';
import { DialogMessageComponent } from './dialog-message.component';
import { PsNotifyService, PsModalComponent } from 'porto-seguro-guide';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent extends ListarClienteComponent
  implements OnInit {
  @Language()
  public lang: string;

  form: FormGroup;
  @Input() errorMessage: string | null;
  @ViewChild('modalDialog') modalDialog: PsModalComponent;

  private _submitted = false;
  private result = null;

  sucesso = false;
  statusNotifyEditar = 'pending';
  loading = true;
  error = false;
  loadingEditar = true;

  listUf = [
    ' ',
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO'
  ];

  columnsTemplate = [];
  source = [];
  columns = [
  { name: 'Nome', label: 'Nome', sortable: true },
  {name: 'Endereco', label: 'Endereco', filter: false, sortable: false },
  {name: 'Telefone', label: 'Telefone', sortable: true }
  ];

  constructor(
    public formBuilder: FormBuilder,
    public clienteService: CadastroClienteService,
    public dialog: MatDialog,
    public translation: TranslationService,
    public _viewContainerRef: ViewContainerRef,
    @Inject(PsNotifyService) public _psNotifyService: PsNotifyService
  ) {
    super(formBuilder, clienteService, dialog, translation, _viewContainerRef, _psNotifyService);
  }

  pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      nome: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)])
      ],
      endereco: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)])
      ],
      telefone: ['', Validators.compose([Validators.required])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      uf: ['', Validators.compose([Validators.required])]
    });

    this.loadingEditar = true;
    this.clienteService.getClientes().subscribe(result => {
      this.clientes = result;
      this.loadingEditar = false;
    });

  }

  public getSubmitted() {
    return this._submitted;
  }

  public submit() {
    this._submitted = true;
    this.statusNotifyEditar = 'pending';
    if (this.form.valid) {
      this.form.value.dataNascimento = this.parseDate(this.form.value.dataNascimento);
      this.clienteService
        .adicionarCliente(this.form.value)
        .do(() => {
          this.result = [];
          this.loading = true;
          this.error = false;
        })
        .subscribe(
          result => {
            this.result = result;
            this.statusNotifyEditar = 'sucesso';
            this._submitted = false;
           /* this.openDialogMessage(
              this.statusNotifyEditar,
              this.translation.translate('Cliente.Cliente') +
                this.translation.translate('Message.Success')
            );  */
            this.modalDialog.open(null);

          },
          err => {
            this.error = err;
            this.statusNotifyEditar = 'erro';
          },
          () => {
            this.statusNotifyEditar = '';
            this.form.reset();
          }
        );
    }

    return this.statusNotifyEditar;
  }

  private openDialogMessage(status: string, message: string) {
    this.dialog.open(DialogMessageComponent, {
      data: {
        status: status,
        message: message,
        info: this.translation.translate('Message.Info')
      }
    });
  }

  parseDate(dateString: any): Date {
    if (dateString) {
      const date = dateString.split('-');
     // date = date[2] + '-' + date[1] + '-' + date[0];
      this.form.value.dataNascimento = dateString;
      return dateString;
    } else {
      return null;
    }
  }
}
