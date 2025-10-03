import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { ButtonDirective } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule, ButtonDirective],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  @Output() confirm = new EventEmitter<Product>();


  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
