import Swal from 'sweetalert2';

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

    // Si es edición, copia los datos del producto al formulario
    if (product) {
      this.form = { ...product };
    } else {
      // Si es nuevo producto, reinicia el formulario
      this.form = {
        name: '',
        description: '',
        price: 0
      };
    }

    this.showModal.set(true);
  }


  closeModal(): void {
    this.showModal.set(false);
    this.selectedProduct = null;
    this.form = {
      name: '',
      description: '',
      price: 0
    };
  }


  saveProduct(): void {
    if (!this.form.name || !this.form.description || this.form.price <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }

    const action = this.selectedProduct?.id
      ? this.productService.update(this.selectedProduct.id, this.form)
      : this.productService.create(this.form);

    action.subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.selectedProduct?.id ? 'Producto actualizado' : 'Producto creado',
          timer: 1500,
          showConfirmButton: false,
        });
        this.loadProducts();
        this.closeModal();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
        });
      }
    });
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              timer: 1500,
              showConfirmButton: false,
            });
            this.loadProducts();
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.message,
            });
          }
        });
      }
    });
  }

}