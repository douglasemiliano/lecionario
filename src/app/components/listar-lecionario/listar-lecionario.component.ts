import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LecionarioResponse } from '../../model/Lecionario.model';
import { SupabaseService } from '../../services/supabase.service';


@Component({
  selector: 'app-listar-lecionario',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './listar-lecionario.component.html',
  styleUrl: './listar-lecionario.component.scss'
})
export class ListarLecionarioComponent {
  colunas: string[] = ['dia', 'nome', 'tempo'];
  dataSourceLecionario: MatTableDataSource<LecionarioResponse>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private supabaseService: SupabaseService) { 
    this.recuperarLecionario();
  }

  recuperarLecionario(){
    this.supabaseService.getLecionarioPorAnoLiturgico("C").then((response) => {
      console.log(response.data);
      this.dataSourceLecionario = new MatTableDataSource(response.data!)
      this.dataSourceLecionario.paginator = this.paginator;
      this.dataSourceLecionario.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLecionario.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceLecionario.paginator) {
      this.dataSourceLecionario.paginator.firstPage();
    }
  }
}
