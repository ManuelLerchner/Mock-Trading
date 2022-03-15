import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-response',
  templateUrl: './trade-response.component.html',
  styleUrls: ['./trade-response.component.scss'],
})
export class TradeResponseComponent implements OnInit {
  @Input() succesfull: boolean = true;
  @Input() message!: string;

  constructor() {}

  ngOnInit(): void {}
}
