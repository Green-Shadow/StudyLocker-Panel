import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AddQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-question',
  templateUrl: 'add-question.html',
})
export class AddQuestionPage {
qdata:Object;
options:any;
syllabi:Array<Object>;
subjects:Array<any>;
topics:Array<Object>;
selected_syllabus:any
selected_subject:any
text:any
SERVER_URL = 'http://localhost:3000' || 'http://studylocker.herokuapp.com'

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public loadCtrl:LoadingController) {
  	let loadingPopup = this.loadCtrl.create({content: 'Loading...'});
    loadingPopup.present();
  	this.http.get(this.SERVER_URL + '/syllabi/get').map(res => res.json()).subscribe(data =>{this.syllabi = data;loadingPopup.dismiss();});
  	  	
  	this.options = [{text:""}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestionPage');
  }

  syllabus_selected(e){
  	let loadingPopup = this.loadCtrl.create({content: 'Loading subjects...'});
    loadingPopup.present();
  	this.http.get(this.SERVER_URL + '/subjects/get?syllabus_name=' + e).map(res => res.json()).subscribe(data =>{this.subjects = data;loadingPopup.dismiss();});
  }

  subject_selected(val){
  	for (let subject of this.subjects){
  		if (subject.subject_name == val){
  			let loadingPopup = this.loadCtrl.create({content: 'Loading topics...'});
    		loadingPopup.present();
  			this.http.get(this.SERVER_URL + '/topics/get?subject_id=' + subject.id).map(res => res.json()).subscribe(data =>{this.topics = data;loadingPopup.dismiss()});
  		}
  	}
  }

  topic_selected(val){console.log(val)}
  add_option(){this.options.push({text:""});}
  remove_option(){if(this.options.length != 1){this.options.pop();}}
  update_option(text,index){this.options[index].text = text;}
  correct_ans(value){console.log(value)}
   

}
