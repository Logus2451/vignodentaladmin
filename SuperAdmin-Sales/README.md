# ViDental Super Admin Portal

## Project Setup

To run this project, follow these steps:

1. Extract the zip file.
2. Run `npm install` to install dependencies.
3. Create `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run `npm run dev` to start the development server.

## Super Admin Access

- **Login URL**: `http://localhost:5173/super-admin-portal-xyz123/login`
- **Dashboard URL**: `http://localhost:5173/super-admin-portal-xyz123`

## Database Setup

Make sure you have created the `super_admins` table in your Supabase database:

```sql
CREATE TABLE super_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE POLICY "Super admins can access everything" ON clinics
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM super_admins 
    WHERE user_id = auth.uid() AND is_active = true
  )
);
```

This project was generated through Alpha. For more information, visit [dualite.dev](https://dualite.dev).