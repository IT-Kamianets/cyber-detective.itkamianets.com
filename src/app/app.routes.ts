import { Routes } from '@angular/router';
import { buildRouteMeta } from '@wawjs/ngx-default';
import { companyProfile } from './feature/company/company.data';

export const routes: Routes = [
	{
		path: '',
		data: {
			pageTitle: 'Головна',
			meta: {
				...buildRouteMeta(companyProfile, '/'),
				titleSuffix: '',
			},
		},
		loadComponent: () =>
			import('./pages/blank-page/blank-page.component').then((m) => m.BlankPageComponent),
	},
	{
		path: 'practice',
		data: {
			pageTitle: 'Практика',
			meta: buildRouteMeta(companyProfile, '/practice'),
		},
		loadComponent: () =>
			import('./pages/blank-page/blank-page.component').then((m) => m.BlankPageComponent),
	},
	{
		path: 'progress',
		data: {
			pageTitle: 'Прогрес',
			meta: buildRouteMeta(companyProfile, '/progress'),
		},
		loadComponent: () =>
			import('./pages/blank-page/blank-page.component').then((m) => m.BlankPageComponent),
	},
	{
		path: 'admin',
		data: {
			pageTitle: 'Адмінпанель',
			meta: buildRouteMeta(companyProfile, '/admin'),
		},
		loadComponent: () =>
			import('./pages/blank-page/blank-page.component').then((m) => m.BlankPageComponent),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
