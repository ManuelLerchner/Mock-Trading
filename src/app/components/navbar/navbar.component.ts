import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  toggleExpaned() {
    this.toggleEvent.emit('toggle');
  }
}
