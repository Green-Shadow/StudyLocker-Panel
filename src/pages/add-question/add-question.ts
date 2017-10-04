import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  } from 'ionic-angular';

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
topics:Array<any>;
selected_syllabus:any
selected_subject:any
selected_topic:any
correct_option:any
text:any
q_text:any
imageSrc:any
ph:any
SERVER_URL = 'http://localhost:3000'

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public loadCtrl:LoadingController,public toastCtrl:ToastController) {
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
    this.selected_syllabus = e;
  	this.http.get(this.SERVER_URL + '/subjects/get?syllabus_name=' + e).map(res => res.json()).subscribe(data =>{this.subjects = data;loadingPopup.dismiss();});
  }

  subject_selected(val){
  	this.selected_subject = val;
  	for (let subject of this.subjects){
  		if (subject.subject_name == val){
  			let loadingPopup = this.loadCtrl.create({content: 'Loading topics...'});
    		loadingPopup.present();
  			this.http.get(this.SERVER_URL + '/topics/get?subject_id=' + subject.id).map(res => res.json()).subscribe(data =>{this.topics = data;loadingPopup.dismiss()});
  		}
  	}
  }

  topic_selected(val){
  	this.selected_topic = val;
  	for (let topic of this.topics){
  		if (topic.name == val){
  			this.selected_topic = topic.id;
  		}
  	}
  }

  add_option(){this.options.push({text:""});}
  remove_option(){if(this.options.length != 1){this.options.pop();}}
  update_option(text,index){this.options[index].text = text;}
  correct_ans(value){this.correct_option =value;}
  upd_q_text(text){this.q_text = text;}
  uploadImage(e){
  	if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
         reader.onload = ((e) => {
    		this.imageSrc = e.target['result'];
  		});	
        reader.readAsDataURL(e.target.files[0]);
    }
  }
  add_question(){
  	console.log("Add question called")
  	let loadingPopup = this.loadCtrl.create({content: 'Adding question...'});
  	loadingPopup.present();
  	let final_json={
  		"syllabus":this.selected_syllabus,
  		"subject":this.selected_subject,
  		"topic":this.selected_topic,
  		"text":this.q_text,
  		"options":this.options,
  		"correct_option":this.correct_option,
  		"image":this.imageSrc};
  	console.log(final_json);	
  	this.http.post(this.SERVER_URL+ '/questions/add',final_json).subscribe(data =>{
  		console.log(data);
  		loadingPopup.dismiss();
  		const toast = this.toastCtrl.create({
    		message: 'Question added',
   			duration: 3000,
    		position: 'bottom'
  		});
  		toast.present();
  	});
  	}
  }