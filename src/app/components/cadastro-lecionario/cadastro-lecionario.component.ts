import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-cadastro-lecionario',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatOptionModule, MatDatepickerModule, MatButtonModule, MatInputModule],
  templateUrl: './cadastro-lecionario.component.html',
  styleUrl: './cadastro-lecionario.component.scss'
})
export class CadastroLecionarioComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      ano_liturgico: ['C', Validators.required],
      tempo: ['', Validators.required],
      dia: [new Date(), Validators.required],
      nome: ['', Validators.required],
      oracoes: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      leituras: this.fb.array([
        this.createLeituraFormGroup()
      ])
    });
  }

 async ngOnInit(){
  let { lecionario, error } = await this.supabaseService.getTodos()

  console.log(lecionario);

  
  
  }

  get oracoes(): FormArray {
    return this.form.get('oracoes') as FormArray;
  }

  get leituras(): FormArray {
    return this.form.get('leituras') as FormArray;
  }

  addOracao() {
    this.oracoes.push(this.fb.control('', Validators.required));
  }

  removeOracao(index: number) {
    this.oracoes.removeAt(index);
  }

  addLeitura() {
    this.leituras.push(this.createLeituraFormGroup());
  }

  removeLeitura(index: number) {
    this.leituras.removeAt(index);
  }

  createLeituraFormGroup(): FormGroup {
    return this.fb.group({
      tipo: ['', Validators.required],
      texto: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.supabaseService.insertLectionary(this.form.value).then((data) => {
        if(data.error && data.error.details.includes("already exists")) {
          this.snackBar.open('Já existe um registro para esse dia. Por favor, escolha outra data.', 'Fechar', 
            { duration: 3000,
              panelClass: ['snackbar-error']
             });
          return
        }

        this.snackBar.open('Registro cadastrado com sucesso!', 'Fechar',
           { duration: 3000,
            panelClass: ['snackbar-success']
           });
        this.form.reset();
        // reiniciar arrays
        this.form.setControl('oracoes', this.fb.array([this.fb.control('')]));
        this.form.setControl('leituras', this.fb.array([this.createLeituraFormGroup()]));
      });
    }
  }
}