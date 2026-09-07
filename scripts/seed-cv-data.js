const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  console.log('Seeding portfolio data from CV into Supabase...');

  // 1. Experiences
  const experiences = [
    {
      company: 'PT Maxxima Innovative Engineering',
      role: 'Programmer',
      duration: 'Active / Current',
      start_date: '2026-09-01',
      status: 'Active',
      type: 'Industry',
      is_current: true,
      highlights: 'Developing scalable web systems, internal enterprise applications, and modern interactive modules.',
      deliverables: [
        'Mengembangkan dan memelihara fitur web aplikasi skala enterprise.',
        'Membangun modul frontend interaktif yang responsif dan terintegrasi dengan RESTful API backend.',
        'Mengoptimalkan arsitektur antarmuka dan alur navigasi aplikasi internal perusahaan.'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Git'],
      order_index: 1
    },
    {
      company: 'PT Sundaya',
      role: 'Frontend Developer Intern',
      duration: 'Aug 2024 – Nov 2024',
      start_date: '2024-08-01',
      status: 'Completed',
      type: 'Internship',
      is_current: false,
      highlights: 'Membangun antarmuka web monitoring solar energy, dashboard IoT perangkat energi, dan refactoring modul antarmuka pengguna.',
      deliverables: [
        'Merancang dan mengimplementasikan dashboard visualisasi telemetri solar energy secara real-time.',
        'Melakukan slicing UI/UX desain Figma ke komponen web responsif performa tinggi.',
        'Mengintegrasikan WebSocket dan REST API untuk pembacaan status baterai dan output inverter.'
      ],
      technologies: ['React.js', 'JavaScript', 'TailwindCSS', 'REST APIs', 'IoT Telemetry'],
      order_index: 2
    }
  ];

  for (const exp of experiences) {
    const { error } = await supabase.from('experiences').insert(exp);
    if (error) console.error('Error inserting experience:', exp.company, error.message);
    else console.log('✓ Experience inserted:', exp.company);
  }

  // 2. Projects
  const projects = [
    {
      title: 'SMMS - Social Media Monitoring System (Skripsi 2026)',
      slug: 'smms-system',
      subtitle: 'Sistem Analisis Sentimen Pilkada Jabar 2024 Multi-Model AI (IndoBERT, RoBERTa, LSTM)',
      category: 'machine-learning',
      description: 'Penelitian skripsi komprehensif yang menganalisis sentimen publik media sosial (X/Twitter) terkait Pilkada Jawa Barat 2024 dengan perbandingan akurasi model deep learning & transformer.',
      summary: 'Penelitian skripsi komprehensif analisis sentimen publik media sosial Pilkada Jabar 2024 dengan perbandingan akurasi IndoBERT, RoBERTa, dan LSTM.',
      tags: ['Python', 'IndoBERT', 'RoBERTa', 'LSTM', 'Flask', 'Next.js', 'NLP', 'PyTorch'],
      featured: true,
      demo_url: 'https://github.com/raakaprx',
      github_url: 'https://github.com/raakaprx',
      metrics: [
        { label: 'Data Tweet', value: '10.000+' },
        { label: 'IndoBERT Acc', value: '88.4%' },
        { label: 'RoBERTa Acc', value: '86.1%' },
        { label: 'LSTM Acc', value: '82.7%' }
      ],
      order_index: 1,
      featured_span: 'lg:col-span-8'
    },
    {
      title: 'Plastani - Marketplace Pertanian & Daur Ulang',
      slug: 'plastani-app',
      subtitle: 'Platform E-Commerce Agrikultur Berkelanjutan & Ekosistem Pupuk Organik',
      category: 'laravel',
      description: 'Platform e-commerce inovatif yang memberdayakan petani lokal memasarkan hasil panen langsung ke konsumen, terintegrasi dengan modul edukasi daur ulang sampah organik & plastik pertanian.',
      summary: 'Platform e-commerce agrikultur berkelanjutan menghubungkan petani langsung ke konsumen dengan integrasi sistem daur ulang.',
      tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Midtrans Payment', 'JavaScript'],
      featured: true,
      demo_url: 'https://github.com/raakaprx',
      github_url: 'https://github.com/raakaprx',
      metrics: [
        { label: 'Arsitektur', value: 'MVC Laravel' },
        { label: 'Payment', value: 'Midtrans Snap' },
        { label: 'User Roles', value: 'Petani & Buyer' }
      ],
      order_index: 2,
      featured_span: 'lg:col-span-4'
    },
    {
      title: 'JajanSepy - Platform Belanja Kuliner & UMKM',
      slug: 'jajansepy-app',
      subtitle: 'Aplikasi Web Order & Delivery Makanan Lokal UMKM Cepat Saji',
      category: 'fullstack',
      description: 'Aplikasi pemesanan makanan online yang dirancang khusus untuk mendigitalkan pedagang kaki lima dan UMKM kuliner lokal dengan pelacakan pesanan dan kalkulasi ongkos kirim dinamis.',
      summary: 'Aplikasi pemesanan kuliner online untuk UMKM dengan live ordering dan kalkulasi ongkir.',
      tags: ['Next.js', 'React', 'TailwindCSS', 'Node.js', 'PostgreSQL', 'Prisma'],
      featured: true,
      demo_url: 'https://github.com/raakaprx',
      github_url: 'https://github.com/raakaprx',
      metrics: [
        { label: 'Stack', value: 'Fullstack TS' },
        { label: 'Latency', value: '<150ms' }
      ],
      order_index: 3,
      featured_span: 'lg:col-span-4'
    },
    {
      title: 'Renbook - Perpustakaan & Manajemen Reservasi Buku',
      slug: 'renbook-app',
      subtitle: 'Sistem Informasi Manajemen Katalog & Peminjaman Buku Digital',
      category: 'fullstack',
      description: 'Sistem otomasi manajemen perpustakaan modern dengan fitur scan barcode buku, manajemen denda keterlambatan otomatis, dan portal pencarian judul terindeks cepat.',
      summary: 'Sistem otomasi perpustakaan dengan manajemen denda otomatis dan pencarian buku terindeks.',
      tags: ['Laravel', 'MySQL', 'TailwindCSS', 'Alpine.js', 'REST API'],
      featured: true,
      demo_url: 'https://github.com/raakaprx',
      github_url: 'https://github.com/raakaprx',
      metrics: [
        { label: 'Sirkulasi', value: 'Otomatis' },
        { label: 'Katalog', value: 'ISBN Indexed' }
      ],
      order_index: 4,
      featured_span: 'lg:col-span-4'
    },
    {
      title: 'Midtrans Payment Integration Microservice',
      slug: 'midtrans-service',
      subtitle: 'Layanan Gateway Transaksi Aman dengan Webhook Auto-Verification',
      category: 'fullstack',
      description: 'Modul arsitektur backend payment gateway mandiri yang mengelola siklus pembayaran mulai dari pembuatan Snap Token, notifikasi HTTP Webhook asinkron, hingga update status pesanan.',
      summary: 'Microservice payment gateway Midtrans dengan verifikasi webhook asinkron dan idempotency key.',
      tags: ['Node.js', 'Express', 'Midtrans Snap API', 'Webhooks', 'Security SHA512'],
      featured: false,
      demo_url: 'https://github.com/raakaprx',
      github_url: 'https://github.com/raakaprx',
      metrics: [
        { label: 'Security', value: 'SHA512 Signature' },
        { label: 'Reliability', value: 'Auto-Retry' }
      ],
      order_index: 5,
      featured_span: 'lg:col-span-4'
    },
    {
      title: 'Vehicle Price Prediction Model',
      slug: 'vehicle-prediction',
      subtitle: 'Model Regresi Machine Learning Estimasi Nilai Pasar Kendaraan Bekas',
      category: 'machine-learning',
      description: 'Model machine learning yang dilatih dengan regresi ensemble Random Forest & XGBoost untuk memprediksi harga wajar mobil/motor bekas berdasarkan tahun produksi, jarak tempuh, dan kondisi mesin.',
      summary: 'Model regresi ensemble Random Forest dan XGBoost untuk estimasi nilai pasar kendaraan bekas.',
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Random Forest', 'XGBoost', 'Flask API'],
      featured: false,
      demo_url: 'https://github.com/raakaprx',
      github_url: 'https://github.com/raakaprx',
      metrics: [
        { label: 'Algorithm', value: 'XGBoost' },
        { label: 'R2 Score', value: '0.91' }
      ],
      order_index: 6,
      featured_span: 'lg:col-span-4'
    }
  ];

  for (const proj of projects) {
    const { error } = await supabase.from('projects').insert(proj);
    if (error) console.error('Error inserting project:', proj.title, error.message);
    else console.log('✓ Project inserted:', proj.title);
  }

  // 3. Certificates
  const certificates = [
    {
      title: 'Certified Web Developer (CWDev)',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      date: '2024',
      issue_date: '2024-01-01',
      credential_id: 'BNSP-CWDEV-2024',
      credential_url: 'https://bnsp.go.id',
      image_url: '',
      skills_verified: [
        'Web Application Development',
        'Database Design & SQL Optimization',
        'Secure RESTful API Architecture',
        'Frontend Implementation & UI Standards'
      ],
      order_index: 1
    }
  ];

  for (const cert of certificates) {
    const { error } = await supabase.from('certificates').insert(cert);
    if (error) console.error('Error inserting certificate:', cert.title, error.message);
    else console.log('✓ Certificate inserted:', cert.title);
  }

  // 4. Tech Stacks
  const techStacks = [
    { name: 'Next.js 15 (App Router)', category: 'Frontend Development', proficiency: 'Advanced', order_index: 1 },
    { name: 'React 19', category: 'Frontend Development', proficiency: 'Advanced', order_index: 2 },
    { name: 'TypeScript', category: 'Frontend Development', proficiency: 'Advanced', order_index: 3 },
    { name: 'TailwindCSS', category: 'Frontend Development', proficiency: 'Advanced', order_index: 4 },
    { name: 'Vue.js', category: 'Frontend Development', proficiency: 'Proficient', order_index: 5 },
    { name: 'Node.js & Express', category: 'Backend & Systems', proficiency: 'Advanced', order_index: 6 },
    { name: 'Laravel (PHP)', category: 'Backend & Systems', proficiency: 'Advanced', order_index: 7 },
    { name: 'Go (Golang)', category: 'Backend & Systems', proficiency: 'Proficient', order_index: 8 },
    { name: 'PostgreSQL', category: 'Databases & Storage', proficiency: 'Advanced', order_index: 9 },
    { name: 'Supabase', category: 'Databases & Storage', proficiency: 'Advanced', order_index: 10 },
    { name: 'MySQL', category: 'Databases & Storage', proficiency: 'Advanced', order_index: 11 },
    { name: 'Python (PyTorch / Scikit-Learn)', category: 'AI / Data Science & Tools', proficiency: 'Advanced', order_index: 12 },
    { name: 'Docker & Git', category: 'AI / Data Science & Tools', proficiency: 'Advanced', order_index: 13 },
  ];

  for (const tech of techStacks) {
    const { error } = await supabase.from('tech_stacks').insert(tech);
    if (error) console.error('Error inserting tech stack:', tech.name, error.message);
    else console.log('✓ Tech stack inserted:', tech.name);
  }

  console.log('\nSeeding completed successfully!');
}

seed();
