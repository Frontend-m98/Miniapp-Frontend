import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  dialogWidth = window.innerWidth < 600 ? '90vw' : '420px';

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
      id: [0],
      name: ['', [Validators.required, this.specialCharacterValidator()]],
      image: [''],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      rating: [0],
    });

    // Responsive dialog width listener
    window.addEventListener('resize', () => {
      this.dialogWidth = window.innerWidth < 600 ? '90vw' : '420px';
    });
  }

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      if (!control.value) return null;
      const hasSpecialCharacter = /[!@#$%^*_=+{}[\]|<>\/\\]/.test(control.value);
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.productForm) {
      this.productForm.patchValue(this.product);
    }
  }

  onConfirm() {
    if (this.productForm.invalid) return;
    const { id, name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      id,
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });

    this.display = false;
    this.displayChange.emit(false);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(false);
  }
}
