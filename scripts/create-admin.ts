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

    // First check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', 'admin')
      .single();

    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Create the user in Auth with email already confirmed
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: password,
      email_confirmed: true,
      user_metadata: {
        role: 'admin'
      },
      app_metadata: {
        email_confirmed_at: new Date().toISOString()
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }
    
    if (!authData.user) {
      throw new Error('Failed to create auth user - no user data returned');
    }

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

    if (userError) {
      console.error('User creation error:', userError);
      throw userError;
    }

    if (!userData) {
      throw new Error('Failed to create user record - no data returned');
    }

    // Get admin role ID
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'admin')
      .single();

    if (roleError) {
      console.error('Role lookup error:', roleError);
      throw roleError;
    }

    if (!roleData) {
      throw new Error('Admin role not found');
    }

    // Assign admin role
    const { error: roleAssignError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.id,
        role_id: roleData.id
      });

    if (roleAssignError) {
      console.error('Role assignment error:', roleAssignError);
      throw roleAssignError;
    }

    console.log('\n=== Admin User Created Successfully ===');
    console.log('Email:', adminEmail);
    console.log('Password:', password);
    console.log('\nIMPORTANT: Change this password after first login!\n');

  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();