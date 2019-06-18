import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './shared/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring/monitoring.component';

const appRoutes: Routes = [
  { path: 'home', component: AccueilComponent },
  { path: 'monitoring', component: MonitoringComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: AccueilComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    MonitoringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
