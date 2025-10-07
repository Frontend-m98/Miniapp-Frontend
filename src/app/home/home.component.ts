import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../components/product/product.component';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditComponent } from '../components/edit/edit.component';
import { ButtonDirective } from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MessageService],
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditComponent,
    ButtonDirective,
    ButtonModule,
    ToastModule,
    TranslateModule, // qo‘shildi
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private productsService: ProductsService, private messageService: MessageService) { }

  @ViewChild('paginator') paginator: Paginator | undefined;
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 25;
  displayEdit = false;
  displayAdd = false;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  toggleEdit(product: Product) {
    this.selectedProduct = { ...product };
    this.displayEdit = true;
  }

  toggleDelete(product: Product) {
    if (!product.id) return;
    this.deleteProduct(product.id);
  }

  toggleAdd() {
    this.displayAdd = true;
  }

  onConfirmEdit(product: Product) {
    if (!product.id) return;
    this.editProduct(product, product.id);
    this.displayEdit = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAdd = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts({ page, perPage }).subscribe({
      next: (data: Products) => {
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error) => console.log('Fetch error:', error),
    });
  }

  editProduct(product: Product, id: number) {
    this.productsService.editProduct(id, product).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Product updated successfully!',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product.',
        });
      },
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
        this.messageService.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'Product deleted successfully!',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete product.',
        });
      },
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product).subscribe({
      next: () => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Product successfully added!',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add product.',
        });
      },
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
