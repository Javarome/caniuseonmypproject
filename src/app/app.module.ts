import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckListComponent } from './list/check/CheckListComponent';
import { RadioListComponent } from './list/radio/RadioListComponent';
 
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CheckListComponent, RadioListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
  
 }
