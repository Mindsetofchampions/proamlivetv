import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { randomBytes } from 'crypto';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    const adminEmail = 'admin@proamtv.com';
    // Generate a secure random password
    const password = randomBytes(16).toString('hex');

    // Create the user in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (authError) throw authError;
    
    if (!authData.user) throw new Error('Failed to create auth user');

    // Create user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        auth_id: authData.user.id,
        username: 'admin',
        display_name: 'System Admin'
      })
      .select()
      .single();

    if (userError) throw userError;

    // Get admin role ID
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'admin')
      .single();

    if (roleError) throw roleError;

    // Assign admin role
    const { error: roleAssignError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.id,
        role_id: roleData.id
      });

    if (roleAssignError) throw roleAssignError;

    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', password);
    console.log('\nPlease change this password immediately after first login.');

  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();