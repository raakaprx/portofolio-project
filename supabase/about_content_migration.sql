-- ==============================================================================
-- TABEL: ABOUT_CONTENT (CMS KONTEN ABOUT SECTION)
-- File: supabase/about_content_migration.sql
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.about_content (
    id TEXT PRIMARY KEY DEFAULT 'main',
    bio_paragraph_1 TEXT NOT NULL DEFAULT 'I am a passionate Full-Stack Web Developer and an Information Systems student (S1 Sistem Informasi) at Telkom University. My journey in technology is driven by a deep curiosity for system design and a focus on developing scalable frontend and backend web applications. I enjoy building efficient systems, integrating AI solutions, and constantly adapting to cutting-edge technologies.',
    bio_paragraph_2 TEXT DEFAULT 'With academic training in Software Engineering, Database Systems, OOP, and System Analysis & Design, I prioritize structural reliability, clean code, and intuitive user experiences.',
    years_experience INT DEFAULT 3,
    projects_count INT DEFAULT 10,
    gpa TEXT DEFAULT '3.75',
    education_degree TEXT DEFAULT 'S1 Sistem Informasi',
    education_university TEXT DEFAULT 'Telkom University',
    education_years TEXT DEFAULT '2022 – 2026',
    career_objective TEXT DEFAULT 'To engineer scalable full-stack web architectures, optimizing data-intensive backends, and delivering frictionless user interfaces for real-world enterprise applications.',
    current_focus TEXT DEFAULT 'Focusing on full-stack web architectures, optimizing database performance, and integrating secure payment processing and AI technologies.',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Policy: Publik dapat membaca konten About
DROP POLICY IF EXISTS "Public can view about content" ON public.about_content;
CREATE POLICY "Public can view about content" ON public.about_content
    FOR SELECT USING (true);

-- Policy: CMS / Admin memiliki akses penuh (Insert, Update, Delete)
DROP POLICY IF EXISTS "CMS full access about content" ON public.about_content;
CREATE POLICY "CMS full access about content" ON public.about_content
    FOR ALL USING (true) WITH CHECK (true);

-- Insert default row jika belum ada
INSERT INTO public.about_content (id)
VALUES ('main')
ON CONFLICT (id) DO NOTHING;
