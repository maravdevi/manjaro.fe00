import { Routes } from '@angular/router';
import { PgInicioComponent } from './pg-inicio/pg-inicio.component';
import { PgEstudioComponent } from './pg-estudio/pg-estudio.component';
import { PgExperienciaComponent } from './pg-experiencia/pg-experiencia.component';

export const routes: Routes = [
    {
        path: '',
        component: PgInicioComponent,
        title: 'Inicio'
    },
    {
        path: 'estudios',
        component: PgEstudioComponent,
        title: 'Estudios'
    },
    {
        path: 'experiencia',
        component: PgExperienciaComponent,
        title: 'Experiencia'
    },
];
