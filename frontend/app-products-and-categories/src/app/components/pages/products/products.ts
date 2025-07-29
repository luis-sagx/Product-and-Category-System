import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})

export class Products implements OnInit {
  products: Product[] = [];
  showModal = signal(false);
  selectedProduct: Product | null = null;

  form: Product = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: data => {
        this.products = data;
        console.log('Productos recibidos:', data);
      },
      error: error => {
        console.error('Error al cargar productos', error);
      }
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: data => this.products = data,
      error: err => console.error(err.message)
    });
  }

  openModal(product?: Product): void {
    this.selectedProduct = product || null;
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.selectedProduct = null;
  }

  saveProduct(): void {
    if (this.selectedProduct?.id) {
      this.productService.update(this.selectedProduct.id, this.form).subscribe({
        next: () => {
          console.log('Producto actualizado');
          this.loadProducts();
          this.closeModal();
        },
        error: err => console.error(err.message)
      });
    } else {
      this.productService.create(this.form).subscribe({
        next: () => {
          console.log('Producto creado');
          this.loadProducts();
          this.closeModal();
        },
        error: err => console.error(err.message)
      });
    }
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        console.log('Producto eliminado');
        this.loadProducts();
      },
      error: err => console.error(err.message)
    });
  }
}
