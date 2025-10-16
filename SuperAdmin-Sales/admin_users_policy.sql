-- Add RLS policy for super admins to manage admin_users table
CREATE POLICY "Super admins can manage admin users" ON admin_users
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM super_admins 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

-- Also add policy for super admins to access hospitals table (if not already exists)
CREATE POLICY "Super admins can access all hospitals" ON hospitals
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM super_admins 
    WHERE user_id = auth.uid() AND is_active = true
  )
);