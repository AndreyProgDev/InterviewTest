import { Component } from '@angular/core';
import { interval, Observable, PartialObserver} from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'numTest';
  words : string[] = new Array();
  checkClass: boolean[][] = new Array();

  timer: Observable<number>;
  timerObserver: PartialObserver<number>;

  constructor(){
    this.timer = interval(1000)
      .pipe(
        filter( v => (v / 3) % 1 == 0 && v != 0)
      );

    this.timerObserver = {
      next: () => {  
        this.getRandomArr();    
      }
    };

    this.timer.subscribe(this.timerObserver);
  }
  
  getRandomArr(): void{
    this.words = new Array('','','');
    this.checkClass = new Array(new Array(false, false, false),
     new Array(false, false, false), new Array(false, false, false));

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (let i = 0; i < 3; i++){
      for(let j = 0; j < 5; j++)
        this.words[i] += alphabet[Math.floor(1 + Math.random() * (alphabet.length - 1))];


        if(this.words[i] == this.words[i].split('').reverse().join(''))
          this.checkClass[i][0] = true;

        if(/^[0-9]+$/.test(this.words[i]))
          this.checkClass[i][1] = true;

        if(this.words[i].includes('0'))
          this.checkClass[i][2] = true;
   }
  }
}
