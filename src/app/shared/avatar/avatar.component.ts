import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.sass']
})
export class AvatarComponent {
  @Input() name!: string;
  @Input() surname!: string;

  getBackgroundColor(letter: string): string {
    switch (letter.toUpperCase()) {
      case 'A':
      case 'B':
      case 'C':
        return 'bg-primary';
      case 'D':
      case 'E':
      case 'F':
        return 'bg-secondary';
      case 'G':
      case 'H':
      case 'I':
        return 'bg-success';
      case 'J':
      case 'K':
      case 'L':
        return 'bg-danger';
      case 'M':
      case 'N':
      case 'O':
        return 'bg-warning';
      case 'P':
      case 'Q':
      case 'R':
        return 'bg-info';
      case 'S':
      case 'T':
      case 'U':
        return 'bg-light';
      case 'V':
      case 'W':
      case 'X':
      case 'Y':
      case 'Z':
        return 'bg-dark';
      default:
        return 'bg-light';
    }
  }
}
