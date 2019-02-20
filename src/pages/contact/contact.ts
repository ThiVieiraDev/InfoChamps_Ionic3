import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AboutPage} from "../about/about";


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //rootPage = HomePage;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ContactPage');
  }

  abrirPerfil(){
    this.navCtrl.push(HomePage);
  }

  abrirSobre(){
    this.navCtrl.push(AboutPage);
  }
}
