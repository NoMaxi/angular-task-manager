import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SortByPipe } from './pipes/sort-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { FilterBySearchTextPipe } from './pipes/filter-by-search-text.pipe';

@NgModule({
  declarations: [
    SortByPipe,
    FilterByPipe,
    FilterBySearchTextPipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SortByPipe,
    FilterByPipe,
    FilterBySearchTextPipe
  ]
})
export class SharedModule { }
