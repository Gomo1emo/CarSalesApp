import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
