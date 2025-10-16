-- 1. Show all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 2. Show all table structures
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default,
  character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 3. Show foreign key relationships
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public';

-- 4. Show RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd,
  qual 
FROM pg_policies
WHERE schemaname = 'public';

-- 5. Show custom functions
SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines 
WHERE routine_schema = 'public';

-- 6. Sample data Query Generator
-- Generate individual SELECT queries for all tables
SELECT 
  'SELECT * FROM ' || table_name || ' LIMIT 3;'
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;




output:
1. [
  {
    "table_name": "patients"
  },
  {
    "table_name": "examinations"
  },
  {
    "table_name": "appointments"
  },
  {
    "table_name": "admin_users"
  },
  {
    "table_name": "super_admins"
  },
  {
    "table_name": "hospitals"
  },
  {
    "table_name": "staff"
  },
  {
    "table_name": "treatment_pricing"
  },
  {
    "table_name": "subscriptions"
  },
  {
    "table_name": "clinic_settings"
  },
  {
    "table_name": "subscription_templates"
  },
  {
    "table_name": "clinics"
  },
  {
    "table_name": "prescriptions"
  },
  {
    "table_name": "treatments"
  }
]


2.
[
  {
    "table_name": "admin_users",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "role",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'admin'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "admin_users",
    "column_name": "hospital_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "patient_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "service",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "appointment_date",
    "data_type": "date",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "appointment_time",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "status",
    "data_type": "USER-DEFINED",
    "is_nullable": "NO",
    "column_default": "'scheduled'::appointment_status",
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "duration_minutes",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "60",
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "appointments",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "currency_symbol",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'₹'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "currency_code",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'INR'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "date_format",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'DD/MM/YYYY'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "time_format",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'12h'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "clinic_settings",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "clinic_code",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "clinic_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "website",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "logo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "contact_person",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "license_number",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "registration_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": "CURRENT_DATE",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "subscription_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'trial'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "total_patients",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "last_login_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "billing_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "tax_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "timezone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'UTC'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "country",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'India'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "state",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "city",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "postal_code",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "clinics",
    "column_name": "hospital_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "patient_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "tooth_number",
    "data_type": "character varying",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": 2
  },
  {
    "table_name": "examinations",
    "column_name": "examination_type",
    "data_type": "character varying",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": 100
  },
  {
    "table_name": "examinations",
    "column_name": "findings",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "treatment_required",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "examined_by",
    "data_type": "character varying",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": 100
  },
  {
    "table_name": "examinations",
    "column_name": "examination_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "examinations",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "hospital_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "hospital_code",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "contact_person",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "hospitals",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "date_of_birth",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "emergency_contact",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "medical_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "insurance_provider",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "insurance_policy_number",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "allergies",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "current_medications",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "dental_history",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "preferred_dentist",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "last_visit_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "next_cleaning_due",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "salutation",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "patient_code",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "nationality",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "aadhar_card",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "gender",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "patients",
    "column_name": "age",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "patient_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "medication_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "dosage",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "frequency",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "duration",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "meal_instruction",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "prescribed_by",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "prescribed_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": "CURRENT_DATE",
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "prescriptions",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "hospital_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "role",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "can_switch_clinics",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "assigned_clinics",
    "data_type": "ARRAY",
    "is_nullable": "YES",
    "column_default": "'{}'::uuid[]",
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "staff",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "plan_key",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "monthly_price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "yearly_price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "features",
    "data_type": "ARRAY",
    "is_nullable": "NO",
    "column_default": "'{}'::text[]",
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscription_templates",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "plan_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'active'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "monthly_price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "yearly_price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "billing_cycle",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'monthly'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "start_date",
    "data_type": "date",
    "is_nullable": "NO",
    "column_default": "CURRENT_DATE",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "end_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "auto_renew",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "subscriptions",
    "column_name": "hospital_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "super_admins",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "treatment_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": "0",
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "currency",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'₹'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "patient_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "clinic_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "treatment_type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "teeth",
    "data_type": "ARRAY",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "cost",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": "0",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "discount",
    "data_type": "numeric",
    "is_nullable": "YES",
    "column_default": "0",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "total_cost",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": "0",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "treated_by",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "treatment_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": "CURRENT_DATE",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'planned'::text",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "table_name": "treatments",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  }
]

3.
[
  {
    "table_name": "appointments",
    "column_name": "patient_id",
    "foreign_table_name": "patients",
    "foreign_column_name": "id"
  },
  {
    "table_name": "patients",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "appointments",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "prescriptions",
    "column_name": "patient_id",
    "foreign_table_name": "patients",
    "foreign_column_name": "id"
  },
  {
    "table_name": "treatments",
    "column_name": "patient_id",
    "foreign_table_name": "patients",
    "foreign_column_name": "id"
  },
  {
    "table_name": "examinations",
    "column_name": "patient_id",
    "foreign_table_name": "patients",
    "foreign_column_name": "id"
  },
  {
    "table_name": "prescriptions",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "treatments",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "clinics",
    "column_name": "hospital_id",
    "foreign_table_name": "hospitals",
    "foreign_column_name": "id"
  },
  {
    "table_name": "staff",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "staff",
    "column_name": "hospital_id",
    "foreign_table_name": "hospitals",
    "foreign_column_name": "id"
  },
  {
    "table_name": "treatment_pricing",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "clinic_settings",
    "column_name": "clinic_id",
    "foreign_table_name": "clinics",
    "foreign_column_name": "id"
  },
  {
    "table_name": "subscriptions",
    "column_name": "hospital_id",
    "foreign_table_name": "hospitals",
    "foreign_column_name": "id"
  },
  {
    "table_name": "admin_users",
    "column_name": "hospital_id",
    "foreign_table_name": "hospitals",
    "foreign_column_name": "id"
  }
]

4.
[
  {
    "schemaname": "public",
    "tablename": "examinations",
    "policyname": "Users can access examinations from their clinic",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(clinic_id IN ( SELECT c.id\n   FROM (clinics c\n     JOIN admin_users au ON ((c.hospital_id = au.hospital_id)))\n  WHERE (au.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "patients",
    "policyname": "Clinic patients policy",
    "roles": "{anon,authenticated}",
    "cmd": "ALL",
    "qual": "(clinic_id = (((current_setting('request.headers'::text, true))::json ->> 'clinic-id'::text))::uuid)"
  },
  {
    "schemaname": "public",
    "tablename": "patients",
    "policyname": "Users can view patients in their clinic",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(clinic_id IN ( SELECT c.id\n   FROM (clinics c\n     JOIN admin_users au ON ((c.hospital_id = au.hospital_id)))\n  WHERE (au.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "appointments",
    "policyname": "Clinic appointments policy",
    "roles": "{anon,authenticated}",
    "cmd": "ALL",
    "qual": "(clinic_id = (((current_setting('request.headers'::text, true))::json ->> 'clinic-id'::text))::uuid)"
  },
  {
    "schemaname": "public",
    "tablename": "admin_users",
    "policyname": "Clinic admin users policy",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(hospital_id = (((current_setting('request.headers'::text, true))::json ->> 'clinic-id'::text))::uuid)"
  },
  {
    "schemaname": "public",
    "tablename": "hospitals",
    "policyname": "Users can view their hospital",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(id IN ( SELECT admin_users.hospital_id\n   FROM admin_users\n  WHERE (admin_users.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "staff",
    "policyname": "Hospital staff access",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(hospital_id = ( SELECT c.hospital_id\n   FROM (clinics c\n     JOIN admin_users au ON ((c.id = au.hospital_id)))\n  WHERE (au.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "staff",
    "policyname": "Users can manage staff in their clinic",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(clinic_id IN ( SELECT c.id\n   FROM (clinics c\n     JOIN admin_users au ON ((c.hospital_id = au.hospital_id)))\n  WHERE (au.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "clinic_settings",
    "policyname": "Clinic settings access",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(clinic_id = ( SELECT admin_users.hospital_id AS clinic_id\n   FROM admin_users\n  WHERE (admin_users.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "treatment_pricing",
    "policyname": "Treatment pricing access",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(clinic_id = ( SELECT admin_users.hospital_id AS clinic_id\n   FROM admin_users\n  WHERE (admin_users.user_id = auth.uid())))"
  },
  {
    "schemaname": "public",
    "tablename": "subscriptions",
    "policyname": "Super admins can manage subscriptions",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM super_admins\n  WHERE ((super_admins.user_id = auth.uid()) AND (super_admins.is_active = true))))"
  },
  {
    "schemaname": "public",
    "tablename": "subscription_templates",
    "policyname": "Super admins can manage templates",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM super_admins\n  WHERE ((super_admins.user_id = auth.uid()) AND (super_admins.is_active = true))))"
  },
  {
    "schemaname": "public",
    "tablename": "clinics",
    "policyname": "Allow read clinic info",
    "roles": "{anon,authenticated}",
    "cmd": "SELECT",
    "qual": "true"
  },
  {
    "schemaname": "public",
    "tablename": "clinics",
    "policyname": "Super admins can access everything",
    "roles": "{authenticated}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM super_admins\n  WHERE ((super_admins.user_id = auth.uid()) AND (super_admins.is_active = true))))"
  },
  {
    "schemaname": "public",
    "tablename": "clinics",
    "policyname": "Users can view their clinic",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(hospital_id IN ( SELECT admin_users.hospital_id\n   FROM admin_users\n  WHERE (admin_users.user_id = auth.uid())))"
  }
]

5.
[
  {
    "routine_name": "generate_patient_code",
    "routine_type": "FUNCTION",
    "data_type": "trigger"
  },
  {
    "routine_name": "update_appointment_status",
    "routine_type": "FUNCTION",
    "data_type": "void"
  },
  {
    "routine_name": "update_updated_at_column",
    "routine_type": "FUNCTION",
    "data_type": "trigger"
  },
  {
    "routine_name": "get_patient_stats",
    "routine_type": "FUNCTION",
    "data_type": "record"
  }
]




SELECT * FROM admin_users LIMIT3;
[
  {
    "id": "db5e33d7-1850-4aef-8b7f-8b4f9197f23f",
    "user_id": "db5e33d7-1850-4aef-8b7f-8b4f9197f23f",
    "email": "admin@gmail.com",
    "full_name": "Ganesh",
    "role": "admin",
    "is_active": true,
    "created_at": "2025-09-23 16:20:29.298239+00",
    "updated_at": "2025-10-03 12:07:22.729432+00",
    "hospital_id": "18e9d150-8c99-4161-bf9d-6eecf322548e"
  }
]


SELECT * FROM clinics LIMIT3;
[
  {
    "id": "4779b936-3315-4507-ac77-5bfa880cc158",
    "clinic_code": "GMS",
    "clinic_name": "GSM Dentistree kurumbaplayam",
    "address": null,
    "phone": null,
    "email": null,
    "website": null,
    "logo_url": null,
    "is_active": true,
    "created_at": "2025-09-23 16:19:14.485426+00",
    "updated_at": "2025-10-03 11:21:50.6994+00",
    "contact_person": null,
    "license_number": null,
    "registration_date": "2025-09-30",
    "subscription_status": "trial",
    "total_patients": 0,
    "last_login_date": null,
    "billing_address": null,
    "tax_id": null,
    "timezone": "UTC",
    "country": "India",
    "state": null,
    "city": null,
    "postal_code": null,
    "hospital_id": "18e9d150-8c99-4161-bf9d-6eecf322548e"
  }
]

SELECT * FROM hospitals LIMIT3;
[
  {
    "id": "18e9d150-8c99-4161-bf9d-6eecf322548e",
    "hospital_name": "Dr.G.M Healthcare Group",
    "hospital_code": "GMHG",
    "address": "Coimbatore, Tamil Nadu",
    "phone": "9952205380",
    "email": "dr.gmsdentistree@gmail.com",
    "contact_person": "Dr. Ganeshamoorthy",
    "is_active": true,
    "created_at": "2025-10-03 11:21:50.6994+00",
    "updated_at": "2025-10-03 11:21:50.6994+00"
  }
]


SELECT * FROM subscription_templates LIMIT3;
[
  {
    "id": "e71f31c5-0d55-427a-b97a-087a5c039632",
    "name": "Professional",
    "plan_key": "professional",
    "monthly_price": "99",
    "yearly_price": "990",
    "features": [
      "Up to 500 patients",
      "Advanced reporting",
      "Priority support",
      "Multi-location"
    ],
    "is_active": true,
    "created_at": "2025-09-29 18:34:29.544336+00",
    "updated_at": "2025-09-29 18:34:29.544336+00"
  },
  {
    "id": "3b683f9c-70f1-4268-b7ed-6dae10d898d6",
    "name": "Enterprise",
    "plan_key": "enterprise",
    "monthly_price": "199",
    "yearly_price": "1990",
    "features": [
      "Unlimited patients",
      "Custom reporting",
      "24/7 support",
      "API access",
      "White-label"
    ],
    "is_active": true,
    "created_at": "2025-09-29 18:34:29.544336+00",
    "updated_at": "2025-09-29 18:34:29.544336+00"
  },
  {
    "id": "2cd3c148-3203-4b60-8384-b36a502fc458",
    "name": "Starters",
    "plan_key": "starter",
    "monthly_price": "49",
    "yearly_price": "490",
    "features": [
      "Up to 100 patients",
      "Basic reporting",
      "Email support"
    ],
    "is_active": true,
    "created_at": "2025-09-29 18:34:29.544336+00",
    "updated_at": "2025-09-29 18:34:29.544336+00"
  }
]

SELECT * FROM subscriptions LIMIT3;
[
  {
    "id": "e4df6a90-e96d-4be2-8d59-5d2fb7abc211",
    "plan_name": "starter",
    "status": "active",
    "monthly_price": "49",
    "yearly_price": "490",
    "billing_cycle": "monthly",
    "start_date": "2025-09-30",
    "end_date": null,
    "auto_renew": true,
    "created_at": "2025-09-30 03:51:10.237671+00",
    "updated_at": "2025-09-30 03:51:10.237671+00",
    "hospital_id": "18e9d150-8c99-4161-bf9d-6eecf322548e"
  },
  {
    "id": "d545d14f-1c2f-4ef8-97d1-dea2dd5b141d",
    "plan_name": "enterprise",
    "status": "active",
    "monthly_price": "199",
    "yearly_price": "1990",
    "billing_cycle": "monthly",
    "start_date": "2025-09-30",
    "end_date": null,
    "auto_renew": true,
    "created_at": "2025-09-30 06:16:57.33176+00",
    "updated_at": "2025-09-30 06:16:57.33176+00",
    "hospital_id": null
  }
]


SELECT * FROM super_admins LIMIT3;

[
  {
    "id": "c4d3d449-c147-4243-9879-d31503322a4d",
    "user_id": "8e6c9585-2414-4741-a884-d95b30026d4c",
    "email": "hari@gmail.com",
    "full_name": "Harivignesh Jeeva",
    "is_active": true,
    "created_at": "2025-09-29 15:33:35.016053+00",
    "updated_at": "2025-09-29 15:33:35.016053+00"
  }
]