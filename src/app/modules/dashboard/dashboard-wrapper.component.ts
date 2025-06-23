import { Component, ElementRef, OnInit, OnDestroy, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="dashboard-container">
      <div #dashboardContainer class="w-full h-full min-h-screen"></div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      width: 100%;
      min-height: 100vh;
      background: #f8f9fa;
    }
  `]
})
export class DashboardWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('dashboardContainer', { static: true }) dashboardContainer!: ElementRef;
  
  private reactRoot: any = null;

  ngOnInit() {
    this.loadSimpleTest(); // Cambiado para probar SimpleTest primero
  }

  ngOnDestroy() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }

  private async loadSimpleTest() {
    try {
      console.log('[Shell] 🚀 Cargando SimpleTest MFE desde React + Vite (puerto 5173)...');
      
      // PROBANDO CON SIMPLETEST PRIMERO (SIN HOOKS)
      console.log('[Shell] 📦 Importando módulo mfeDashboard/SimpleTest...');
    //   const TestModule = await import('mfeDashboard/SimpleTest' as any);
      const TestModule = await import('mfeDashboard/Dashboard' as any);
      
      // Debugging exhaustivo del módulo
      console.log('[Shell] 🔍 Módulo completo recibido:', TestModule);
      console.log('[Shell] 🔍 Propiedades del módulo:', Object.keys(TestModule));
      console.log('[Shell] 🔍 TestModule.default:', TestModule.default);
      console.log('[Shell] 🔍 Tipo de default:', typeof TestModule.default);
      
      // Estrategias múltiples para extraer el componente
      let SimpleTest = null;
      
      // Estrategia 1: Usar default directamente
      if (typeof TestModule.default === 'function') {
        console.log('[Shell] ✅ Estrategia 1: default es función');
        SimpleTest = TestModule.default;
      }
      // Estrategia 2: Buscar en propiedades del default
      else if (TestModule.default && typeof TestModule.default === 'object') {
        console.log('[Shell] 🔍 Estrategia 2: default es objeto, explorando propiedades...');
        console.log('[Shell] 🔍 Propiedades de default:', Object.keys(TestModule.default));
        
        // Buscar propiedades comunes de componentes
        const possibleKeys = ['default', 'SimpleTest', 'component', 'Component'];
        for (const key of possibleKeys) {
          if (TestModule.default[key] && typeof TestModule.default[key] === 'function') {
            console.log(`[Shell] ✅ Encontrado componente en default.${key}`);
            SimpleTest = TestModule.default[key];
            break;
          }
        }
      }
      // Estrategia 3: Buscar directamente en el módulo (sin default)
      if (!SimpleTest) {
        console.log('[Shell] 🔍 Estrategia 3: Buscando directamente en el módulo...');
        const possibleKeys = ['SimpleTest', 'default', 'component', 'Component'];
        for (const key of possibleKeys) {
          if (TestModule[key] && typeof TestModule[key] === 'function') {
            console.log(`[Shell] ✅ Encontrado componente en módulo.${key}`);
            SimpleTest = TestModule[key];
            break;
          }
        }
      }

      // Validación final
      if (!SimpleTest || typeof SimpleTest !== 'function') {
        throw new Error(`No se pudo extraer SimpleTest válido. Tipo recibido: ${typeof SimpleTest}`);
      }

      console.log('[Shell] ✅ Componente SimpleTest extraído exitosamente:', SimpleTest);

      // Datos simples para SimpleTest (sin hooks)
      const props = {
        title: 'Test desde Angular Shell',
        message: '¡MFE funcionando sin hooks!',
        userInfo: {
          name: 'Luis Velito',
          role: 'Administrador'
        }
      };

      console.log('[Shell] 📝 Props que se enviarán a SimpleTest:', props);

      // Crear root si no existe
      if (!this.reactRoot) {
        console.log('[Shell] 🏗️ Creando React Root...');
        this.reactRoot = ReactDOM.createRoot(this.dashboardContainer.nativeElement);
      }

      // Montar el componente React
      console.log('[Shell] 🎯 Montando componente SimpleTest...');
      this.reactRoot.render(React.createElement(SimpleTest, props));

      console.log('[Shell] ✅ SimpleTest MFE montado exitosamente');
      
    } catch (error) {
      console.error('[Shell] ❌ Error loading SimpleTest MFE:', error);
      console.error('[Shell] ❌ Stack trace:', error);
      this.renderErrorState();
    }
  }

  // Método para cambiar a Dashboard cuando SimpleTest funcione
  private async loadDashboard() {
    try {
      console.log('[Shell] 🚀 Cargando Dashboard MFE desde React + Vite (puerto 5173)...');
      
      const DashboardModule = await import('mfeDashboard/Dashboard' as any);
      console.log('[Shell] 📦 Módulo Dashboard completo importado:', DashboardModule);
      
      let Dashboard = DashboardModule.default;
      
      // Si default es un objeto, intentar obtener el componente
      if (typeof Dashboard === 'object' && Dashboard !== null) {
        Dashboard = Dashboard.default || Dashboard.Dashboard || Dashboard;
      }
      
      if (typeof Dashboard !== 'function') {
        Dashboard = DashboardModule.Dashboard || DashboardModule;
      }
      
      if (typeof Dashboard !== 'function') {
        throw new Error(`Dashboard no es un componente válido. Tipo: ${typeof Dashboard}`);
      }

      const props = {
        title: 'Dashboard desde Angular Shell',
        userInfo: {
          name: 'Luis Velito',
          email: 'luis@example.com',
          role: 'Administrador',
          department: 'IT'
        },
        shellConfig: {
          theme: 'light',
          language: 'es',
          version: '1.0.0'
        },
        permissions: {
          canEdit: true,
          canDelete: false,
          canExport: true
        }
      };

      this.reactRoot = ReactDOM.createRoot(this.dashboardContainer.nativeElement);
      this.reactRoot.render(React.createElement(Dashboard, props));

      console.log('[Shell] ✅ Dashboard MFE montado exitosamente');
      
    } catch (error) {
      console.error('[Shell] ❌ Error loading Dashboard MFE:', error);
      this.renderErrorState();
    }
  }

  private renderErrorState() {
    this.dashboardContainer.nativeElement.innerHTML = `
      <div style="padding: 20px; text-align: center; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; margin: 20px;">
        <div style="color: #856404;">
          <h3 style="margin-bottom: 16px;">⚠️ SimpleTest MFE no disponible</h3>
          <p style="margin-bottom: 12px;">El microfrontend de SimpleTest (React + Vite) no pudo cargarse.</p>
          <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 14px;">
            <strong>Verificar:</strong><br>
            • MFE ejecutándose en: <code>http://localhost:5173</code><br>
            • Archivo remoteEntry.js disponible en: <code>http://localhost:5173/assets/remoteEntry.js</code><br>
            • SimpleTest está expuesto en vite.config.js<br>
            • Sin errores de CORS<br>
            • Revisar la consola para logs detallados
          </div>
          <p style="margin-top: 12px; font-size: 14px;">
            <strong>Para iniciarlo:</strong><br>
            <code style="background: #e9ecef; padding: 4px 8px; border-radius: 3px;">
              cd ../mfe-dashboard && npm run build:mfe
            </code>
          </p>
        </div>
      </div>
    `;
  }
} 