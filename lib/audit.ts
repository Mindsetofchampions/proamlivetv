import { supabase } from './supabase';

export async function createAuditLog(
  adminId: string,
  action: string,
  entity: string,
  entityId?: string,
  details?: any
) {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        admin_id: adminId,
        action,
        entity,
        entity_id: entityId,
        details
      });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw - audit logging should not block main operations
  }
}