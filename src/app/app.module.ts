import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {AddQuestionPage} from '../pages/add-question/add-question'
import {ViewQuestionsPage} from '../pages/view-questions/view-questions'
import {TabsPage} from '../pages/tabs/tabs'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    AddQuestionPage,
    ViewQuestionsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddQuestionPage,
    ViewQuestionsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
