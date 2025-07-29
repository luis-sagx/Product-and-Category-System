import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../services/category';
import { Category } from '../../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  categories: Category[] = [];
  showModal = signal(false);
  selectedCategory: Category | null = null;

  // Modelo del formulario
  form: Category = {
    name: '',
    description: '',
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        console.log('Categorías recibidas:', data);
      },
      error: error => {
        console.error('Error al cargar categorías', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err.message),
    });
  }

  openModal(category?: Category): void {
    this.selectedCategory = category || null;
    this.form = category ? { ...category } : { name: '', description: '' };
    this.showModal.set(true);

  }

  closeModal(): void {
    this.showModal.set(false);
    this.selectedCategory = null;
    this.form = { name: '', description: '' };
  }

  saveCategory(): void {
    if (this.selectedCategory?.id) {
      // Actualizar
      this.categoryService.update(this.selectedCategory.id, this.form).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (err) => alert(err.message),
      });
    } else {
      // Crear
      this.categoryService.create(this.form).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (err) => alert(err.message),
      });
    }
  }

  deleteCategory(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return;

    this.categoryService.delete(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => alert(err.message),
    });
  }
}
