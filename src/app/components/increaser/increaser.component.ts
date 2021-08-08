import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass =`btn ${ this.btnClass }`
  }

  // Decorador input, para resibir informacion del componente padre
  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';
  // @Input() progress: number = 50;

  // Emicion de eventos que recibira el componente padre
  @Output('value') valueOutput: EventEmitter<number> = new EventEmitter();

  cambiarValor(value: number) {

    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);

    if (this.progress >= 100 && this.progress >= 0) {
    this.valueOutput.emit(100);
      return this.progress = 100
    } 
    if (this.progress <= 0 && this.progress < 0) {
    this.valueOutput.emit(0);
    return this.progress = 0
    }

  }

  onChange(newValue: number) {
    
    if (newValue >= 100) {
      this.progress = 100
    } else if (newValue <= 0){
      this.progress = 0
    } else {
      this.progress = newValue
    }

    this.valueOutput.emit(this.progress);

  }

}
