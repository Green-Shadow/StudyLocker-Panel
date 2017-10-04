import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the ViewQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-questions',
  templateUrl: 'view-questions.html',
})
export class ViewQuestionsPage {
questions:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public loadCtrl:LoadingController) {
  	const SERVER_URL = "http://localhost:3000";
  	let loadingPopup = this.loadCtrl.create({content: 'Loading...'});
    loadingPopup.present();
  	this.http.get(SERVER_URL + '/questions/get/all').map(res => res.json()).subscribe(data => {this.questions = data;console.log(data);loadingPopup.dismiss()});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewQuestionsPage');
  }

}
