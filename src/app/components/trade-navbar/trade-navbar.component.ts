import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'trade-app-navbar',
  templateUrl: './trade-navbar.component.html',
  styleUrls: ['./trade-navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  toggleExpaned() {
    this.toggleEvent.emit('toggle');
  }
}
