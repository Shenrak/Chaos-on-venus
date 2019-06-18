import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule,
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDividerModule, MatMenuModule, MatTableModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatIconModule],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatIconModule],
})
export class AppMaterialModule { }
