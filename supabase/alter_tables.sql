-- ==============================================================================
-- OPSI CEPAT: TAMBAH SEMUA KOLOM YANG HILANG (ALTER TABLE)
-- Jalankan di SQL Editor Supabase jika tidak ingin menghapus tabel
-- ==============================================================================

-- 1. TAMBAH KOLOM PADA TABEL PROJECTS
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS subtitle TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'fullstack';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS thumbnail_url TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS architecture_flow JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS database_schema JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS code_snippet JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_span TEXT DEFAULT 'lg:col-span-6';

-- 2. TAMBAH KOLOM PADA TABEL EXPERIENCES
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '';
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS highlights TEXT DEFAULT '';
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS deliverables TEXT[] DEFAULT '{}';
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS technologies TEXT[] DEFAULT '{}';
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

-- 3. TAMBAH KOLOM PADA TABEL CERTIFICATES
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS date TEXT DEFAULT '';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS skills_verified TEXT[] DEFAULT '{}';
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

-- 4. TAMBAH KOLOM PADA TABEL TECH_STACKS
ALTER TABLE public.tech_stacks ADD COLUMN IF NOT EXISTS proficiency TEXT DEFAULT 'Proficient';
ALTER TABLE public.tech_stacks ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT '';
ALTER TABLE public.tech_stacks ADD COLUMN IF NOT EXISTS order_index INT DEFAULT 0;

-- 5. RELOAD POSTGREST SCHEMA CACHE SUPAYA KOLOM BARU LANGSUNG KEBACA
NOTIFY pgrst, 'reload schema';
