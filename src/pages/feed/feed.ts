import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoovieProvider} from "../../providers/moovie/moovie";
import {LoadingController} from "ionic-angular";
import {FilmeDetalhesPage} from "../filme-detalhes/filme-detalhes";

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public objecto_feed = {
    titulo: "Thiago Vieira",
    data: "13 Janeiro, 1998",
    descricao: "Atualização já disponivel!",
    qntd_likes: 937,
    qntd_comments: 519,
    time_comment: "12h ago"
  }
  public lista_filmes = new Array<any>();
  public page = 1;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private movieProvider: MoovieProvider,
              public loadingCtrl: LoadingController
  ) {
  }

  abreCarregamento() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando ...",
      //duration: 3000
    });
    this.loader.present();
  }

  fechaCarregamento() {
    this.loader.dismiss();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);

    infiniteScroll.complete();
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregamento();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if (newpage) {
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = objeto_retorno.results;
        }

        this.fechaCarregamento();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fechaCarregamento();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
