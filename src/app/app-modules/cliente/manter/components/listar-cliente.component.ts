import { PsModalComponent, PsNotifyService } from 'porto-seguro-guide';
import { ResponseServer } from './../models/response';
import { Cliente } from './../models/cliente';
import { Language, TranslationService } from 'angular-l10n';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  Inject,
  ViewContainerRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CadastroClienteService } from '../services/manter-cliente.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogEditarClienteComponent } from './dialog-editar-cliente.component';
import { DialogExcluirClienteComponent } from './dialog-excluir-cliente.component';
import { DialogMessageComponent } from './dialog-message.component';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-listarr-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class ListarClienteComponent implements OnInit {
  @Language() public lang: string;
  p = 1;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 8,
    currentPage: 1
  };

  @ViewChild('editTemplateDataGrid')
  private editTemplateDataGrid: TemplateRef<any>;
  @ViewChild('removeTemplateDataGrid')
  private removeTemplateDataGrid: TemplateRef<any>;
  @ViewChild('activeTemplateDataGrid')
  private activeTemplateDataGrid: TemplateRef<any>;
  @ViewChild('modalEditar') modalEditar: PsModalComponent;
  @ViewChild('modalRemover') modalRemover: PsModalComponent;

  public labels: any = {
    previousLabel: this.translation.translate('Paginator.Previous'),
    nextLabel: this.translation.translate('Paginator.Next'),
    screenReaderPaginationLabel: this.translation.translate(
      'Paginator.Pagination'
    ),
    screenReaderPageLabel: this.translation.translate('Paginator.Page'),
    screenReaderCurrentLabel: this.translation.translate('Paginator.YouAre')
  };

  response: Response[];
  clientes: Cliente[];
  clienteEdit: Cliente;
  responseServer: ResponseServer;
  loadingLista = true;
  source = [];
  columnsTemplate = [];
  mensagem = {
    cabecalho: '',
    conteudo: '',
  };
  form: FormGroup;
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

  private submitted = false;
  private statusNotify = 'pending';

  constructor(
    public formBuilder: FormBuilder,
    public clienteService: CadastroClienteService,
    public dialog: MatDialog,
    public translation: TranslationService,
    public _viewContainerRef: ViewContainerRef,
    @Inject(PsNotifyService) public _psNotifyService: PsNotifyService
  ) {}

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

    this.clienteService.getClientes().subscribe(result => {
      this.clientes = result;
      this.loadingLista = false;
    });
    this.columnsTemplate = [
      { name: 'Nome', label: this.translation.translate('Cliente.Nome'), sortable: true },
      { name: 'Endereco', label: this.translation.translate('Cliente.Endereco'), filter: false, sortable: false },
      { name: 'Telefone', label: this.translation.translate('Cliente.Telefone'), sortable: true },
      {
        name: 'Edit',
        filter: false,
        sortable: false,
        label: this.translation.translate('Cliente.Edit'),
        template: this.editTemplateDataGrid
      },
      {
        name: 'Remove',
        filter: false,
        sortable: false,
        label: this.translation.translate('Dialog.Remover'),
        template: this.removeTemplateDataGrid
      }
    ];
  }

  loadForm() {
    this.form.reset({
      id: this.clienteEdit.id,
      nome: this.clienteEdit.nome,
      endereco: this.clienteEdit.endereco,
      telefone: this.clienteEdit.telefone,
      dataNascimento: this.clienteEdit.dataNascimento,
      sexo: this.clienteEdit.sexo,
      cidade: this.clienteEdit.cidade,
      uf: this.clienteEdit.uf
    });
  }

  public openDialogEditarCliente(cliente: Cliente) {
    this.dialog
      .open(DialogEditarClienteComponent, {
        width: '650px',
        data: {
          header: this.translation.translate('Cliente.Edit'),
          clienteEdit: cliente
        }
      })
      .afterClosed()
      .subscribe(() =>
        this.clienteService.getClientes().subscribe(clientes => {
          this.clientes = clientes;
        })
      );
  }

  public openDialogExcluirCliente(status: string, cliente: Cliente) {
    this.dialog
      .open(DialogMessageComponent, {
        data: {
          header: this.translation.translate('Cliente.Edit'),
          status: status,
          message: this.translation.translate('Cliente.Excluir'),
          clienteEdit: cliente,
          info: this.translation.translate('Message.Info')
        }
      })
      .afterClosed()
      .subscribe(() =>
        this.clienteService.getClientes().subscribe(clientes => {
          this.clientes = clientes;
        })
      );
  }

  excluirCliente(clienteId: number) {
    this.clienteService.removerCliente(clienteId).subscribe(result => {
      this.listarClientes();
    });
  }

  public listarClientes() {
    this.ngOnInit();
  }

  openModalEditar($event, row) {
    this.mensagem.cabecalho = row.nome;
    this.clienteEdit =  row;
    this.loadForm();
    this.modalEditar.open($event);
  }

  remover() {
    this.excluirCliente(this.clienteEdit.id);
    this.listarClientes();
    this.modalRemover.close();
  }

  public submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.form.value.dataNascimento = this.parseDate(
        this.form.value.dataNascimento
      );
      this.clienteService
        .atualizarCliente(this.form.value)
        .do(() => {
          this.submitted = true;
        })
        .subscribe(
          result => {
            this.submitted = false;
            this.modalEditar.close();
            this.createNotify( this.translation.translate('Cliente.Cliente') + this.translation.translate('Dialog.Sucesso'), 'success' );
          },
          err => {
            this.statusNotify = 'erro';
          },
          () => {
            this.statusNotify = '';
            this.listarClientes();
          }
        );
    }
  }

  public getSubmittedForm() {
    return this.submitted;
  }

  createNotify(msg: any, type: any, duration?: number) {
    console.log('createNotify');
    this._psNotifyService.showNotify(msg, type, this._viewContainerRef);
  }

  openModalRemover($event, row) {
    this.clienteEdit =  row;
    this.modalRemover.open($event);
  }

  log($event) {
    console.log($event);
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
