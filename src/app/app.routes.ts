import { Routes } from '@angular/router';
import { PgInicioComponent } from './pg-inicio/pg-inicio.component';
import { PgFacturaComponent } from './pg-factura/pg-factura.component';
import { PgBusquedaComponent } from './pg-busqueda/pg-busqueda.component';

export const routes: Routes = [
    {
        path: '',
        component: PgInicioComponent,
        title: 'Inicio'
    },
    {
        path: 'factura',
        component: PgFacturaComponent,
        title: 'Facturas'
    },
    {
        path: 'buscar',
        component: PgBusquedaComponent,
        title: 'Buscar Factura'
    },
];
