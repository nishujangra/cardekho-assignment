import { request } from './client';
import type { Shortlist, ShortlistDetail } from '../types';

export const shortlists = {
  list: () => request<Shortlist[]>('/api/shortlists'),
  get: (id: string) => request<ShortlistDetail>(`/api/shortlists/${id}`),
  create: (name: string, carIds: string[]) =>
    request<Shortlist>('/api/shortlists', {
      method: 'POST',
      body: JSON.stringify({ name, car_ids: carIds }),
    }),
  update: (id: string, name: string, carIds: string[]) =>
    request<Shortlist>(`/api/shortlists/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, car_ids: carIds }),
    }),
  delete: (id: string) => request<void>(`/api/shortlists/${id}`, { method: 'DELETE' }),
};
