import { request } from '@/utils/http';

export function findAllCompany() {
	return request.get('company');
}

export function findById(id: string) {
	return request.get(`company/${id}`);
}
