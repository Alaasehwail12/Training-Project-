import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private clicked = false;

  isReserveClicked() {
    return this.clicked;
  }

  reserve() {
    this.clicked = true;
  }

  unreserve() {
    this.clicked = false;
  }
}
