import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
  active?: boolean;
}

interface UserInfo {
  name: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo y título -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-xl font-bold text-gray-900">MicroFrontends App</h1>
            </div>
          </div>

          <!-- Menú de navegación -->
          <div class="flex items-center space-x-8">
            <div class="flex space-x-4">
              <button 
                *ngFor="let item of menuItems" 
                (click)="navigateTo(item.path)"
                [class]="getButtonClass(item)"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                <span [innerHTML]="item.icon"></span>
                <span>{{ item.label }}</span>
              </button>
            </div>

            <!-- Info del usuario -->
            <div class="flex items-center space-x-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ userInfo.name }}</p>
                <p class="text-xs text-gray-500">{{ userInfo.role }}</p>
              </div>
              <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-xs font-medium text-gray-700">{{ userInfo.name.charAt(0) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavigationComponent implements OnInit {
  userInfo: UserInfo = {
    name: 'Luis Velito',
    role: 'Administrador'
  };

  menuItems: MenuItem[] = [
    {
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
      label: 'Dashboard',
      path: '/dashboard',
      active: false
    },
    {
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path></svg>',
      label: 'Repair Orders',
      path: '/repair-orders',
      active: false
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateActiveMenuItem();
  }

  navigateTo(path: string) {
    this.router.navigate([path]).then(() => {
      this.updateActiveMenuItem();
    });
  }

  getButtonClass(item: MenuItem): string {
    const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2";
    const activeClass = "bg-blue-100 text-blue-700 border border-blue-200";
    const inactiveClass = "text-gray-500 hover:text-gray-700 hover:bg-gray-100";
    
    return `${baseClass} ${item.active ? activeClass : inactiveClass}`;
  }

  private updateActiveMenuItem() {
    const currentPath = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentPath.includes(item.path);
    });
  }
} 