import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface RepairOrder {
  id: string;
  client: string;
  status: 'Pendiente' | 'En Proceso' | 'Completada' | 'Cancelada';
  date: string;
  description?: string;
  priority?: 'Baja' | 'Media' | 'Alta';
  assignedTo?: string;
}

@Component({
  selector: 'app-repair-orders-wrapper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="repair-orders-container p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Órdenes de Reparación</h1>
          <button 
            (click)="createNewOrder()"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Nueva Orden
          </button>
        </div>

        <!-- Estadísticas -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 class="font-semibold text-yellow-800">Pendientes</h3>
              <p class="text-2xl font-bold text-yellow-600">{{ getOrdersByStatus('Pendiente').length }}</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 class="font-semibold text-blue-800">En Proceso</h3>
              <p class="text-2xl font-bold text-blue-600">{{ getOrdersByStatus('En Proceso').length }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 class="font-semibold text-green-800">Completadas</h3>
              <p class="text-2xl font-bold text-green-600">{{ getOrdersByStatus('Completada').length }}</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 class="font-semibold text-red-800">Canceladas</h3>
              <p class="text-2xl font-bold text-red-600">{{ getOrdersByStatus('Cancelada').length }}</p>
            </div>
          </div>

          <!-- Filtros -->
          <div class="mb-6 flex flex-wrap gap-4">
            <select 
              [(ngModel)]="selectedStatus" 
              (change)="filterOrders()"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            
            <input 
              [(ngModel)]="searchTerm" 
              (input)="filterOrders()"
              placeholder="Buscar por cliente..."
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>

          <!-- Lista de órdenes -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-semibold mb-4">
              Órdenes ({{ filteredOrders.length }} de {{ recentOrders.length }})
            </h3>
            <div class="space-y-3">
              <div *ngFor="let order of filteredOrders; trackBy: trackByOrderId" 
                   class="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="flex-1">
                  <div class="flex items-center space-x-4">
                    <div>
                      <p class="font-medium text-gray-900">{{ order.id }}</p>
                      <p class="text-sm text-gray-600">{{ order.client }}</p>
                      <p *ngIf="order.description" class="text-xs text-gray-500 mt-1">
                        {{ order.description }}
                      </p>
                    </div>
                    <div *ngIf="order.priority" class="ml-4">
                      <span [class]="getPriorityClass(order.priority)" 
                            class="px-2 py-1 text-xs rounded-full">
                        {{ order.priority }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span [class]="getStatusClass(order.status)" 
                        class="px-2 py-1 text-xs rounded-full">
                    {{ order.status }}
                  </span>
                  <p class="text-sm text-gray-500 mt-1">{{ order.date }}</p>
                  <p *ngIf="order.assignedTo" class="text-xs text-gray-400">
                    Asignado a: {{ order.assignedTo }}
                  </p>
                </div>
                <div class="ml-4">
                  <button 
                    (click)="editOrder(order)"
                    class="text-blue-600 hover:text-blue-800 text-sm">
                    Editar
                  </button>
                </div>
              </div>
              
              <div *ngIf="filteredOrders.length === 0" 
                   class="text-center py-8 text-gray-500">
                No se encontraron órdenes con los filtros aplicados.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .repair-orders-container {
      min-height: calc(100vh - 64px);
      background-color: #f9fafb;
    }
  `]
})
export class RepairOrdersWrapperComponent implements OnInit {
  selectedStatus: string = '';
  searchTerm: string = '';
  
  recentOrders: RepairOrder[] = [
    { 
      id: 'RO-001', 
      client: 'Empresa ABC', 
      status: 'Pendiente', 
      date: '2024-03-15',
      description: 'Reparación de equipo industrial',
      priority: 'Alta',
      assignedTo: 'Juan Pérez'
    },
    { 
      id: 'RO-002', 
      client: 'Taller XYZ', 
      status: 'En Proceso', 
      date: '2024-03-14',
      description: 'Mantenimiento preventivo',
      priority: 'Media',
      assignedTo: 'María García'
    },
    { 
      id: 'RO-003', 
      client: 'Servicios 123', 
      status: 'Completada', 
      date: '2024-03-13',
      description: 'Instalación de componentes',
      priority: 'Baja',
      assignedTo: 'Carlos López'
    },
    { 
      id: 'RO-004', 
      client: 'Mantenimiento Pro', 
      status: 'En Proceso', 
      date: '2024-03-12',
      description: 'Diagnóstico completo',
      priority: 'Alta',
      assignedTo: 'Ana Martínez'
    },
    { 
      id: 'RO-005', 
      client: 'Industrias Delta', 
      status: 'Cancelada', 
      date: '2024-03-11',
      description: 'Proyecto cancelado por cliente',
      priority: 'Media'
    }
  ];

  filteredOrders: RepairOrder[] = [];

  ngOnInit() {
    console.log('RepairOrdersWrapperComponent initialized');
    this.filteredOrders = [...this.recentOrders];
  }

  getOrdersByStatus(status: string): RepairOrder[] {
    return this.recentOrders.filter(order => order.status === status);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-800';
      case 'Completada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-800';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  filterOrders() {
    this.filteredOrders = this.recentOrders.filter(order => {
      const matchesStatus = !this.selectedStatus || order.status === this.selectedStatus;
      const matchesSearch = !this.searchTerm || 
        order.client.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }

  createNewOrder() {
    console.log('Crear nueva orden');
    // Aquí implementarías la lógica para crear una nueva orden
  }

  editOrder(order: RepairOrder) {
    console.log('Editar orden:', order);
    // Aquí implementarías la lógica para editar una orden
  }

  trackByOrderId(index: number, order: RepairOrder): string {
    return order.id;
  }
} 