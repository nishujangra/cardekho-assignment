import { request } from './client';
import type { Recommendation, UserNeed } from '../types';

export const recommendations = {
  get: (need: UserNeed) =>
    request<Recommendation[]>('/api/recommendations', {
      method: 'POST',
      body: JSON.stringify(need),
    }),
};
