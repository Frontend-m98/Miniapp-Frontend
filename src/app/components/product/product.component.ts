import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    PricePipe,
    TruncateNamePipe,
    TranslateModule,
    Toast,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @ViewChild('deleteButton') deleteButton!: any;

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private messageService: MessageService
  ) { }

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('CONFIRM_DELETE'),
      header: this.translate.instant('DELETE_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deleteProduct();
        this.messageService.add({
          severity: 'info',
          summary: this.translate.instant('DELETED'),
          detail: this.translate.instant('DELETE_SUCCESS'),
        });
      },
      reject: (type: ConfirmEventType) => {
        if (type === ConfirmEventType.REJECT) {
          this.messageService.add({
            severity: 'warn',
            summary: this.translate.instant('CANCELLED'),
            detail: this.translate.instant('DELETE_CANCELLED'),
          });
        }
      },
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  getTranslatedProductName(): string {
    const key = `PRODUCTS.${this.product.name.toUpperCase().replace(' ', '_')}`;
    const translation = this.translate.instant(key);
    return translation !== key ? translation : this.product.name;
  }
}
