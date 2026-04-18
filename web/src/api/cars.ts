import { request } from './client';
import type { Car } from '../types';

export const cars = {
  list: () => request<Car[]>('/api/cars'),
  get: (id: string) => request<Car>(`/api/cars/${id}`),
  add: (car: Car) => request<Car>('/api/cars', { method: 'POST', body: JSON.stringify(car) }),
};
