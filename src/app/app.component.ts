import { Component } from '@angular/core';
import data from './data.json';

interface Card {
  question: string;
  answers: string[];
  valid: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cards-by-heart';

  private alreadySelected: number[] = [];
  private allCards: Card[];
  currentCard: Card;
  chooseAnswer: boolean = false;
  validAnswer: number | null = null;
  selectedAnswer: number | null = null;

  private validAnswers: number = 0;
  validPercentage: number = 0;
  totalAnswers: number = 0;
  cardCount: number = 0;

  constructor() {
    this.allCards = data;
    this.cardCount = this.allCards.length;
    this.selectNextCard();
  }

  click(index: number): void {
    if (!this.chooseAnswer) {
      this.chooseAnswer = true;
      this.selectedAnswer = index;

      if (index === this.validAnswer) {
        this.validAnswers += 1;
      }

      this.totalAnswers += 1;
      this.validPercentage = Math.round(
        (this.validAnswers / this.totalAnswers) * 100
      );
    }
  }

  next(): void {
    this.chooseAnswer = false;
    this.selectedAnswer = null;
    this.selectNextCard();
  }

  private selectNextCard() {
    if (this.alreadySelected.length === this.allCards.length) {
      this.alreadySelected = [];
      this.totalAnswers = 0;
      this.validAnswers = 0;
      this.validPercentage = Math.round(
        (this.validAnswers / this.totalAnswers) * 100
      );
    }

    let next: number;
    do {
      next = Math.floor(Math.random() * this.allCards.length);
    } while (this.alreadySelected.includes(next));

    this.alreadySelected.push(next);
    this.currentCard = this.allCards[next];

    for (let i: number = 0; i !== this.currentCard.answers.length; ++i) {
      if (this.currentCard.valid === this.currentCard.answers[i]) {
        this.validAnswer = i;
        break;
      }
    }
  }
}
