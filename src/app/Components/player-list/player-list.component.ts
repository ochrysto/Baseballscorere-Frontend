import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {
  @Input() players: any[] = [];
  @Output() modify = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  onModify(index: number) {
    this.modify.emit(index);
  }

  onDelete(index: number) {
    this.delete.emit(index);
  }
}
