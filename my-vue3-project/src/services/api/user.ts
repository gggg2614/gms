import { request } from '@/utils/http';

export function findAllCompany() {
	return request.get('company');
}

export function findById(id: string) {
	return request.get(`company/${id}`);
}

export function findByName(comname?: string) {
	if (comname) {
		return request.get(`company/comname/${comname}`);
	} else return request.get(`company`);
}
