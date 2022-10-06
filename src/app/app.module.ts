import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";


const routes: Routes = [
     { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
     {
          path: 'contactmanager',
          loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule)
     },
     { path: '**', redirectTo: 'contactmanager' }
]

@NgModule({
     declarations: [
          AppComponent
     ],
     imports: [
          BrowserModule,
          BrowserAnimationsModule,
          RouterModule.forRoot(routes),
          HttpClientModule
     ],
     bootstrap: [AppComponent]
})
export class AppModule {}
