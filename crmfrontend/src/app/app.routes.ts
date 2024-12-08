import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LeadsComponent } from './components/leads/leads.component';
import { SalesPipelineComponent } from './components/sales-pipeline/sales-pipeline.component';
import { CreateuserComponent } from './admin/createuser/createuser.component';
import { TasksComponent } from './sales/tasks/tasks.component';
import { SalesLayoutComponent } from './sales/sales-layout/sales-layout.component';

export const routes: Routes = [
  {
    path: '', // Default route to redirect to login
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'register',
    component: RegisterComponent, // register is jst path name
  },
  {
    path: 'login', // Route for the login page
    component: LoginComponent, // The component to load when this route is activated
    title: 'Login', // Page title
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin/dashboard', // Route for the dashboard page
        component: DashboardComponent, // The component to load when this route is activated
        canActivate: [authGuard], // The guard to run before this route is activated
        data: { roles: ['ADMIN'] }, // The roles allowed to access this route
      },
      {
        path: 'admin/customers',
        component: CustomersComponent,
        title: 'Customers',
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'admin/leads',
        component: LeadsComponent,
        title: 'Leads',
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'admin/salespipeline',
        component: SalesPipelineComponent,
        title: 'Sales Pipeline',
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'admin/createusers',
        component: CreateuserComponent,
        title: 'Create User',
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] }
      },
      
    ],
  },
  {
    path: '', // Parent route
    component: SalesLayoutComponent, // Wrapper component
    children: [
      {
        path: 'sales/tasks',
        component: TasksComponent,
        title: 'Tasks',
        canActivate: [authGuard],
        data: { roles: ['SALES'] }
      },
      
    ],
  },

  {
    path: '**', // wildcard
    redirectTo: '/login',
  },
];
