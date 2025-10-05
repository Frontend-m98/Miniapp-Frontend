import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { ButtonDirective } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ButtonDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnChanges {

  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, this.specialCharacterValidator()]],
      image: [''],
      price: ['', [Validators.required]],
      rating: [0],
    });
  }

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      if (this.productForm) {
        this.productForm.patchValue(this.product);
      }
    }
  }

  onConfirm() {
    if (this.productForm.invalid) return;

    const { name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      id: this.product.id, // <-- MUHIM QO‘SHILDI
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
