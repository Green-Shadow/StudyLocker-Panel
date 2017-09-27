import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
options:Array<Object>;
syllabi:Array<Object>;
subjects:Array<any>;
topics:Array<Object>;
selected_syllabus:any
selected_subject:any
SERVER_URL = 'http://localhost:3000'

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  	this.http.get(this.SERVER_URL + '/syllabi/get').map(res => res.json()).subscribe(data =>{this.syllabi = data});
  	  	
  	this.options = [{text:""}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestionPage');
  }

  syllabus_selected(e){
  	this.http.get(this.SERVER_URL + '/subjects/get?syllabus_name=' + e).map(res => res.json()).subscribe(data =>{this.subjects = data});
  }

  subject_selected(val){
  	for (let subject of this.subjects){
  		if (subject.subject_name == val){
  			this.http.get(this.SERVER_URL + '/topics/get?subject_id=' + subject.id).map(res => res.json()).subscribe(data =>{this.topics = data});
  		}
  	}
  }

  topic_selected(val){
  	console.log(val)
  }

   

}
