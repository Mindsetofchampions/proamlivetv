import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { PATCH } from '@/app/api/admin/videos/[id]/approve/route';
import { POST } from '@/app/api/admin/videos/[id]/sponsor/route';

jest.mock('@clerk/nextjs', () => ({
  auth: () => ({ userId: 'test_user_id' })
}));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { id: 'test_id', role: { name: 'admin' } },
            error: null
          }))
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => ({
              data: { id: 'test_video_id', status: 'APPROVED' },
              error: null
            }))
          }))
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { id: 'test_sponsor_id' },
            error: null
          }))
        }))
      }))
    }))
  }
}));

describe('Admin Video API Routes', () => {
  describe('PATCH /api/admin/videos/[id]/approve', () => {
    it('should approve a video', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
        params: { id: 'test_video_id' }
      });

      await PATCH(req, { params: { id: 'test_video_id' } });

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.status).toBe('APPROVED');
    });
  });

  describe('POST /api/admin/videos/[id]/sponsor', () => {
    it('should assign a sponsor to a video', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        params: { id: 'test_video_id' },
        body: {
          sponsorId: 'test_sponsor_id',
          placement: 'PRE_ROLL'
        }
      });

      await POST(req, { params: { id: 'test_video_id' } });

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.id).toBe('test_sponsor_id');
    });
  });
});