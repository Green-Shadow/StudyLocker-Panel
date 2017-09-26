import { Component } from '@angular/core';

import {AddQuestionPage} from '../add-question/add-question'
import {ViewQuestionsPage} from '../view-questions/view-questions'



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddQuestionPage;
  tab2Root = ViewQuestionsPage;

  constructor() {

  }
}
