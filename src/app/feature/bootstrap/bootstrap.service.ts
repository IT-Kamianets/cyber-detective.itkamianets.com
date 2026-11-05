import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID, Service, TransferState } from '@angular/core';
import { COMPANY_FALLBACK } from '../company/company.const';
import { Company } from '../company/company.interface';
import { CompanyService } from '../company/company.service';
import { BOOTSTRAP_STATE_KEY } from './bootstrap.const';
import { BootstrapData } from './bootstrap.interface';

@Service()
export class BootstrapService {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _transferState = inject(TransferState);
	private readonly _companyService = inject(CompanyService);

	async initialize() {
		this._companyService.loading.set(true);
		this._companyService.setFallbackCompany(COMPANY_FALLBACK);

		const transferData = this._transferState.get<BootstrapData | null>(
			BOOTSTRAP_STATE_KEY,
			null,
		);

		if (transferData) {
			this._apply(transferData);

			if (isPlatformBrowser(this._platformId)) {
				this._transferState.remove(BOOTSTRAP_STATE_KEY);
			}

			return;
		}

		if (isPlatformServer(this._platformId)) {
			const data = this._resolveBootstrapData(null);

			this._transferState.set(BOOTSTRAP_STATE_KEY, data);
			this._apply(data);

			return;
		}

		this._apply(this._resolveBootstrapData(null));
	}

	private _apply(data: BootstrapData) {
		this._companyService.setCompany(data.company);
		this._companyService.loading.set(false);
	}

	private _resolveBootstrapData(data: BootstrapData | null): BootstrapData {
		return {
			company: this._hasContent(data?.company) ? (data?.company as Partial<Company>) : null,
		};
	}

	private _hasContent(value: unknown): boolean {
		if (value == null) {
			return false;
		}

		if (typeof value === 'string') {
			return value.trim().length > 0;
		}

		if (Array.isArray(value)) {
			return value.length > 0;
		}

		if (typeof value === 'object') {
			return Object.values(value).some((entry) => this._hasContent(entry));
		}

		return true;
	}
}
