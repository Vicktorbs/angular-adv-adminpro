import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _hideModal: boolean = true;

  constructor() { }

  get hideModal() {
    return this._hideModal
  }

  openModal() {
    this._hideModal = false;
  }

  closeModal() {
    this._hideModal = true;
  }

}
