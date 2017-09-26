import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQuestionsPage } from './view-questions';

@NgModule({
  declarations: [
    ViewQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQuestionsPage),
  ],
})
export class ViewQuestionsPageModule {}
