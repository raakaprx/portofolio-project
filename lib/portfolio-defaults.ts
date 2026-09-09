export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureFlowStep {
  step: string;
  detail: string;
}

export interface DatabaseSchemaTable {
  table: string;
  fields: string[];
}

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  role: string;
  short_summary: string;
  full_description: string;
  thumbnail_url: string;
  gallery_urls: string[];
  tech_stacks: string[];
  live_url?: string;
  repo_url?: string;
  is_featured: boolean;
  display_order: number;

  // Backward-compatible properties
  subtitle?: string;
  description?: string;
  summary?: string;
  category?: "all" | "machine-learning" | "laravel" | "fullstack" | string;
  techStack?: string[];
  metrics?: ProjectMetric[];
  github?: string;
  demo?: string;
  thumbnailUrl?: string;
  featuredSpan?: string;
  architectureFlow?: ArchitectureFlowStep[];
  databaseSchema?: DatabaseSchemaTable[];
  codeSnippet?: CodeSnippet;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ExperienceItem {
  id?: string;
  company: string;
  role: string;
  duration: string;
  status: "Active" | "Completed";
  type: "Industry" | "Internship" | "Organization";
  highlights: string;
  deliverables: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  photos?: string[];
}

export interface CertificateItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  credentialId?: string;
  imageUrl?: string;
  skillsVerified: string[];
}

export interface TechItem {
  name: string;
  proficiency: "Advanced" | "Proficient";
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export interface ProfileHighlightCard {
  label: string;
  title: string;
  subtitle: string;
  icon?: "briefcase" | "layers" | "database" | string;
}

export interface ProfileData {
  id?: string;
  name: string;
  role: string;
  tagline: string;
  avatar_url: string;
  avatar_position?: string;
  avatar_scale?: number;
  avatar_offset_y?: number;
  avatar_offset_x?: number;
  status_badge: string;
  is_available: boolean;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_cv_text: string;
  cta_cv_url: string;
  cta_contact_text: string;
  cta_contact_url: string;
  github_url: string;
  linkedin_url: string;
  whatsapp_url: string;
  email: string;
  highlights: ProfileHighlightCard[];
}

export function parseAvatarUrl(url?: string): {
  cleanUrl: string;
  position?: string;
  scale?: number;
  offsetY?: number;
  offsetX?: number;
} {
  const raw = url || "/profile-raka.jpg";
  if (!raw.includes("?") && !raw.includes("#")) {
    return { cleanUrl: raw };
  }

  try {
    const [base, query] = raw.split(/[?#]/);
    const params = new URLSearchParams(query);
    const result: {
      cleanUrl: string;
      position?: string;
      scale?: number;
      offsetY?: number;
      offsetX?: number;
    } = { cleanUrl: base || "/profile-raka.jpg" };

    if (params.has("pos")) result.position = params.get("pos") || undefined;
    if (params.has("scale")) result.scale = Number(params.get("scale")) || undefined;
    if (params.has("y")) result.offsetY = Number(params.get("y")) || undefined;
    if (params.has("x")) result.offsetX = Number(params.get("x")) || undefined;
    return result;
  } catch {
    return { cleanUrl: raw };
  }
}

export function buildAvatarUrl(
  baseCleanUrl: string,
  config: { position?: string; scale?: number; offsetY?: number; offsetX?: number }
): string {
  const clean = (baseCleanUrl || "/profile-raka.jpg").split(/[?#]/)[0];
  const params = new URLSearchParams();
  if (config.position && config.position !== "center 20%") params.set("pos", config.position);
  if (typeof config.scale === "number" && config.scale !== 100) params.set("scale", String(config.scale));
  if (typeof config.offsetY === "number" && config.offsetY !== 0) params.set("y", String(config.offsetY));
  if (typeof config.offsetX === "number" && config.offsetX !== 0) params.set("x", String(config.offsetX));

  const qs = params.toString();
  return qs ? `${clean}?${qs}` : clean;
}

export const DEFAULT_PROFILE: ProfileData = {
  id: "main",
  name: "Muhammad Raka Pradana",
  role: "Full-Stack Web Developer",
  tagline:
    "Crafting scalable web architectures, robust transactional backends, and data-driven systems. Focused on clean system design, database query efficiency, and high-performance user experiences.",
  avatar_url: "/profile-raka.jpg",
  avatar_position: "center 20%",
  avatar_scale: 100,
  avatar_offset_y: 0,
  avatar_offset_x: 0,
  status_badge: "Available for Engineering Projects",
  is_available: true,
  cta_primary_text: "Explore Projects",
  cta_primary_url: "#projects",
  cta_cv_text: "Download CV",
  cta_cv_url: "/cv.pdf",
  cta_contact_text: "Contact Me",
  cta_contact_url: "#contact",
  github_url: "https://github.com/raakaprx",
  linkedin_url: "https://linkedin.com/in/rakaprx",
  whatsapp_url: "https://wa.me/6285156000636",
  email: "rakapradana.work@gmail.com",
  highlights: [
    {
      label: "CURRENT ROLE",
      title: "Web Developer",
      subtitle: "PT Maxxima Innovative Engineering",
      icon: "briefcase",
    },
    {
      label: "CORE SPECIALTIES",
      title: "Laravel & Next.js",
      subtitle: "REST APIs & ML Pipelines",
      icon: "layers",
    },
    {
      label: "DATABASE FOCUS",
      title: "PostgreSQL & MySQL",
      subtitle: "ACID & Index Tuning",
      icon: "database",
    },
  ],
};

export const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    company: "PT Maxxima Innovative Engineering",
    role: "Web Developer",
    duration: "2026 – Present",
    status: "Active",
    type: "Industry",
    highlights:
      "Mengembangkan sistem web berkinerja tinggi, optimalisasi database, dan fitur full-stack yang skalabel untuk platform digital tingkat enterprise.",
    deliverables: [
      "Merancang dan mengoptimalkan sistem web modern dan antarmuka data spasial menggunakan Next.js, React, dan TypeScript.",
      "Melakukan optimasi query database, indexing, dan perancangan skema untuk operasi multi-tenant yang kompleks di PostgreSQL.",
      "Membangun layanan backend andal dan RESTful API throughput tinggi dengan penanganan error ketat dan validasi otomatis.",
      "Berkolaborasi dengan tim rekayasa lintas fungsi dalam implementasi komponen UI skalabel dan pipeline state management.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "RESTful APIs",
    ],
    metrics: [
      { label: "Status Posisi", value: "Aktif / Bekerja Saat Ini" },
      { label: "Fokus Inti", value: "Sistem Web & Database" },
      { label: "Core Stack", value: "Next.js & PostgreSQL" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    company: "PT. Sundaya",
    role: "Frontend Developer Intern",
    duration: "Jan – Mar 2025",
    status: "Completed",
    type: "Internship",
    highlights:
      "Mengembangkan dan merancang responsive warehouse management web application (SMMS) yang mendukung 50+ concurrent users di seluruh site distribusi.",
    deliverables: [
      "Membangun reusable React.js components dengan optimized state management serta mengimplementasikan lazy loading dan code-splitting techniques yang berhasil mengurangi page load times.",
      "Mengintegrasikan fungsionalitas frontend dengan REST APIs untuk enable real-time inventory tracking dan mengurangi manual data-entry errors.",
      "Berkolaborasi dengan warehouse stakeholders dan tim operasional untuk menciptakan intuitive UI/UX.",
      "Membantu transisi alur kerja pergudangan dari pencatatan manual berbasis spreadsheet menuju platform digital terpusat.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "RESTful APIs",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Pengguna Aktif", value: "50+ Concurrent Users" },
      { label: "Performa", value: "Lazy Loading & Code Splitting" },
      { label: "Tracking", value: "Real-Time Inventory" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    title: "Sertifikat Kompetensi - Pengembang Web Bersertifikat (CWDev)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "Jun 2026",
    credentialId: "BNSP-CWDEV-62026",
    credentialUrl: "https://bnsp.go.id",
    skillsVerified: [
      "Pengembangan Perangkat Lunak dan Pemrograman",
      "Pengembangan Web (CWDev)",
      "Web Architecture & Best Practices",
    ],
  },
];

export const DEFAULT_TECH_GROUPS: TechGroup[] = [
  {
    category: "Frontend Development",
    items: [
      { name: "React", proficiency: "Advanced" },
      { name: "Next.js", proficiency: "Advanced" },
      { name: "TypeScript", proficiency: "Advanced" },
      { name: "JavaScript", proficiency: "Advanced" },
      { name: "Tailwind CSS", proficiency: "Advanced" },
      { name: "HTML5", proficiency: "Advanced" },
      { name: "CSS3", proficiency: "Advanced" },
    ],
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "Node.js", proficiency: "Advanced" },
      { name: "Express", proficiency: "Advanced" },
      { name: "PHP", proficiency: "Advanced" },
      { name: "Laravel", proficiency: "Advanced" },
      { name: "RESTful APIs", proficiency: "Advanced" },
      { name: "Midtrans Payment Gateway", proficiency: "Advanced" },
    ],
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "Supabase", proficiency: "Advanced" },
      { name: "MySQL", proficiency: "Advanced" },
      { name: "Prisma ORM", proficiency: "Advanced" },
      { name: "Redis", proficiency: "Proficient" },
      { name: "Neon DB", proficiency: "Proficient" },
    ],
  },
  {
    category: "AI / Data Science & Tools",
    items: [
      { name: "Scikit-Learn", proficiency: "Proficient" },
      { name: "Pandas", proficiency: "Proficient" },
      { name: "NumPy", proficiency: "Proficient" },
      { name: "Docker", proficiency: "Proficient" },
      { name: "Git", proficiency: "Advanced" },
      { name: "GitHub", proficiency: "Advanced" },
      { name: "Midtrans Payment Gateway", proficiency: "Advanced" },
      { name: "DOKU Payment", proficiency: "Proficient" },
      { name: "Laragon", proficiency: "Advanced" },
      { name: "Antigravity IDE", proficiency: "Advanced" },
    ],
  },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "smart-material-management-system",
    slug: "smart-material-management-system",
    title: "Smart Material Management System (SMMS)",
    role: "Lead Full-Stack Developer",
    short_summary:
      "Aplikasi web pergudangan full-stack terintegrasi dengan 9 modul operasional, otentikasi RBAC 5 role, dan notifikasi real-time Socket.IO.",
    full_description: `## Ringkasan Proyek
Proyek Skripsi 2026 yang dikembangkan untuk PT. Sundaya Indonesia bekerja sama dengan Telkom University. Sistem ini mendigitalisasi seluruh alur kerja permintaan material (*material request*), persetujuan multi-level (*multi-tier approval*), pemantauan stok pergudangan (*stock monitoring*), dan pengadaan (*procurement*) yang sebelumnya dikelola secara manual berbasis spreadsheet.

## Masalah & Kebutuhan Bisnis
- Pencatatan stok material di berbagai site distribusi masih manual sehingga sering terjadi inkonsistensi data barang masuk dan keluar.
- Alur persetujuan (*approval*) permintaan material memakan waktu lama karena tidak tersedianya sistem notifikasi instan lintas hierarki manajemen.
- Ketiadaan audit trail transparan untuk setiap perpindahan material antar gudang.

## Solusi Arsitektur
- **9 Modul Terintegrasi**: Mengelola siklus material dari request awal, verifikasi teknis, approval bertingkat, hingga update kartu stok gudang.
- **5 Tingkat Hak Akses (RBAC)**: Pembagian akses tegas antara Admin, NOC, Operations Manager, General Manager, dan Tim Gudang.
- **Notifikasi Real-Time Socket.IO**: Sinkronisasi instan saat status request disetujui atau ditolak tanpa perlu refresh halaman.
- **Containerized Deployment**: Pengemasan seluruh service menggunakan Docker untuk konsistensi di environment staging dan production.

## Fitur Utama
- **Real-Time Stock Monitoring**: Dashboard interaktif yang menampilkan ketersediaan komponen inverter, baterai solar, dan aksesoris secara langsung.
- **Multi-Level Approval Pipeline**: Alur delegasi approval terstruktur dengan tracking timestamp dan identitas penyetujui.
- **Automated Audit Logging**: Riwayat lengkap seluruh tindakan inventaris untuk kebutuhan compliance perusahaan.`,
    thumbnail_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    gallery_urls: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
    ],
    tech_stacks: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.IO", "Docker", "JWT", "JavaScript (ES6+)", "HTML5", "CSS3", "RESTful APIs"],
    live_url: "https://github.com/raakaprx/warehouse-sundaya-v2",
    repo_url: "https://github.com/raakaprx/warehouse-sundaya-v2",
    is_featured: true,
    display_order: 1,

    // Backward-compatible fields
    subtitle: "Proyek Skripsi 2026 — PT. Sundaya Indonesia & Telkom University",
    description:
      "Merancang dan mengembangkan full-stack web system untuk digitisasi seluruh proses material request, approval, stock-monitoring, dan procurement workflows yang sebelumnya dikelola secara manual. Mengimplementasikan 9 modul terintegrasi dengan 5 level RBAC dan notifikasi real-time Socket.IO.",
    category: "fullstack",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.IO", "Docker", "JWT", "JavaScript (ES6+)", "HTML5", "CSS3", "RESTful APIs"],
    github: "https://github.com/raakaprx/warehouse-sundaya-v2",
    demo: "https://github.com/raakaprx/warehouse-sundaya-v2",
    thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    featuredSpan: "lg:col-span-12",
    metrics: [
      { label: "Modul Terintegrasi", value: "9 Integrated Modules" },
      { label: "Hak Akses (RBAC)", value: "5 Distinct User Roles" },
      { label: "Notifikasi", value: "Real-Time Socket.IO" },
      { label: "Deployment", value: "Docker Containerized" },
    ],
    architectureFlow: [
      { step: "Requirements Analysis", detail: "Metodologi Waterfall SDLC mendalam untuk pemetaan 9 modul operasional pergudangan" },
      { step: "Role-Based Access", detail: "JWT Auth untuk 5 role: Admin, NOC, Operations Manager, GM, dan Warehouse" },
      { step: "Real-Time Telemetry", detail: "Socket.IO menyiarkan perubahan status stok dan approval seketika ke dashboard monitoring" },
      { step: "Container Deployment", detail: "Kontainerisasi Docker multi-stage memastikan konsistensi staging dan production" },
    ],
    databaseSchema: [
      { table: "material_requests", fields: ["id (PK)", "user_id (FK)", "status", "priority", "created_at"] },
      { table: "inventory_stocks", fields: ["id (PK)", "item_code", "quantity", "warehouse_location"] },
      { table: "approval_logs", fields: ["id (PK)", "request_id (FK)", "approver_id (FK)", "action", "timestamp"] },
    ],
    codeSnippet: {
      language: "typescript",
      filename: "socketApprovalHandler.ts",
      code: `import { Server } from "socket.io";

export function handleMaterialApproval(io: Server, payload: { requestId: string; approverRole: string; status: string }) {
  io.emit("material_request:updated", {
    id: payload.requestId,
    status: payload.status,
    updatedBy: payload.approverRole,
    timestamp: new Date().toISOString(),
  });
}`,
    },
  },
  {
    id: "plastani-umkm-ecommerce",
    slug: "plastani-umkm-ecommerce",
    title: "Plastani",
    role: "Full-Stack Laravel Developer",
    short_summary:
      "Platform e-commerce agrikultur untuk UMKM dan petani lokal dengan katalog produk terorganisir, integrasi order WhatsApp, dan analitik penjualan.",
    full_description: `## Ringkasan Proyek
Plastani merupakan platform e-commerce digital yang dirancang untuk memberdayakan UMKM dan kelompok tani lokal agar dapat memasarkan produk hasil panen dan olahan pertanian secara mandiri ke konsumen luas.

## Masalah & Kebutuhan
- Rantai pasok konvensional yang panjang sering memotong margin keuntungan petani lokal.
- Pembeli di daerah rural lebih nyaman melakukan konfirmasi pesanan secara personal melalui pesan instan daripada alur checkout yang rumit.

## Solusi & Arsitektur
- Dibangun menggunakan framework **Laravel MVC** dengan performa render cepat berbasis Blade dan Tailwind CSS.
- Integrasi **WhatsApp Direct Order Link** yang secara otomatis mengonversi keranjang belanja menjadi pesan terstruktur berisi daftar produk, kuantitas, dan total harga.
- Panel admin mandiri untuk memantau performa penjualan, menambahkan artikel panduan bertani, dan mengelola stok produk.

## Fitur Utama
- **Katalog Produk Dinamis**: Filter kategori produk pertanian, harga, dan ketersediaan stok real-time.
- **Seamless WhatsApp Checkout**: Kemudahan transaksi langsung ke kontak WhatsApp resmi petani atau admin.
- **Admin Analytics Dashboard**: Rekapitulasi transaksi, performa katalog terlaris, dan manajemen inventaris.`,
    thumbnail_url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop",
    gallery_urls: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200&auto=format&fit=crop"
    ],
    tech_stacks: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "WhatsApp API", "Laravel Auth"],
    live_url: "https://github.com/raakaprx/plastani-ecommerce",
    repo_url: "https://github.com/raakaprx/plastani-ecommerce",
    is_featured: true,
    display_order: 2,

    // Backward-compatible fields
    subtitle: "Platform E-Commerce untuk UMKM & Petani Lokal (2025)",
    description:
      "Membangun platform e-commerce digital yang dirancang untuk membantu UMKM, khususnya petani dan produsen lokal, dalam menyalurkan produknya secara online dengan katalog terorganisir, pencarian efektif, integrasi WhatsApp order, serta sistem administrasi analitik transaksi.",
    category: "laravel",
    techStack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "WhatsApp API", "Laravel Auth"],
    github: "https://github.com/raakaprx/plastani-ecommerce",
    demo: "https://github.com/raakaprx/plastani-ecommerce",
    thumbnailUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop",
    featuredSpan: "lg:col-span-6",
    metrics: [
      { label: "Sasaran", value: "Petani & UMKM Lokal" },
      { label: "Checkout", value: "Direct WhatsApp Order" },
      { label: "Admin Panel", value: "Analitik & Laporan Penjualan" },
      { label: "Keamanan", value: "Laravel Auth RBAC" },
    ],
    architectureFlow: [
      { step: "Katalog & Pencarian", detail: "Katalog responsif berbasis kategori produk pertanian dan UMKM" },
      { step: "WhatsApp Gateway", detail: "Penerusan pesanan instan dengan parameter produk ke nomor WhatsApp penjual" },
      { step: "Admin CMS", detail: "Pengelolaan artikel, katalog, produk, dan pemantauan analitik performa penjualan" },
      { step: "Autentikasi", detail: "Sistem RBAC Laravel Auth memastikan akses aman bagi admin dan pembeli" },
    ],
    databaseSchema: [
      { table: "products", fields: ["id (PK)", "seller_id (FK)", "name", "price", "stock", "category_id"] },
      { table: "transactions", fields: ["id (PK)", "buyer_name", "total_amount", "status", "created_at"] },
    ],
    codeSnippet: {
      language: "php",
      filename: "WhatsAppOrderService.php",
      code: `public function generateOrderLink(Product $product, int $qty): string
{
    $text = urlencode("Halo, saya ingin memesan {$product->name} sebanyak {$qty} unit.");
    return "https://wa.me/{$product->seller->phone}?text={$text}";
}`,
    },
  },
  {
    id: "jajansepy-single-brand",
    slug: "jajansepy-single-brand",
    title: "JajanSepy",
    role: "Full-Stack Laravel Developer",
    short_summary:
      "Web store single-brand UMKM kuliner dengan integrasi komunikasi WhatsApp Admin dan manajemen inventaris stok terpadu.",
    full_description: `## Ringkasan Proyek
Platform penjualan online yang dikembangkan khusus untuk lini produk single-brand UMKM kuliner. Mengutamakan kemudahan navigasi bagi pelanggan dan pengelolaan stok yang efisien bagi pemilik usaha.

## Solusi Teknis
- Arsitektur berbasis Laravel dengan sistem inventory tracking otomatis.
- Format checkout yang ringkas dan memicu pembuatan order payload ke WhatsApp Admin secara instan.
- Tampilan responsif dengan visualisasi produk beresolusi tinggi untuk memaksimalkan daya tarik pelanggan.`,
    thumbnail_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    gallery_urls: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
    ],
    tech_stacks: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "JavaScript", "HTML5", "CSS3", "WhatsApp Admin API", "Laravel Auth"],
    live_url: "https://github.com/raakaprx/jajansepy-ecommerce",
    repo_url: "https://github.com/raakaprx/jajansepy-ecommerce",
    is_featured: true,
    display_order: 3,

    // Backward-compatible fields
    subtitle: "Platform E-Commerce untuk Single Brand UMKM (2025)",
    description:
      "Mengembangkan platform e-commerce khusus untuk penjualan produk single brand dengan sistem komunikasi terintegrasi ke WhatsApp Admin. Fokus pada kemudahan pengelolaan produk, manajemen inventory yang efisien, dan proses checkout yang streamlined.",
    category: "laravel",
    techStack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "JavaScript", "HTML5", "CSS3", "WhatsApp Admin API", "Laravel Auth"],
    github: "https://github.com/raakaprx/jajansepy-ecommerce",
    demo: "https://github.com/raakaprx/jajansepy-ecommerce",
    thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    featuredSpan: "lg:col-span-6",
    metrics: [
      { label: "Fokus Model", value: "Single Brand UMKM" },
      { label: "Pemesanan", value: "WhatsApp Admin API" },
      { label: "Inventory", value: "Streamlined Stock Tracking" },
      { label: "Konversi", value: "Quick Checkout Flow" },
    ],
    architectureFlow: [
      { step: "Product Display", detail: "Showcase varian produk single-brand dengan gambar beresolusi tinggi" },
      { step: "Cart & Checkout", detail: "Form pemesanan ringkas yang langsung mentransformasikan item ke WhatsApp payload" },
      { step: "Inventory Sync", detail: "Pengecekan ketersediaan stok secara otomatis sebelum pesan diteruskan" },
    ],
    databaseSchema: [
      { table: "products", fields: ["id (PK)", "sku", "title", "price", "stock"] },
      { table: "orders", fields: ["id (PK)", "customer_phone", "order_data", "created_at"] },
    ],
    codeSnippet: {
      language: "php",
      filename: "OrderController.php",
      code: `public function checkout(Request $request)
{
    $order = Order::create($request->validated());
    $adminWa = config('app.admin_whatsapp');
    return redirect("https://wa.me/{$adminWa}?text=" . urlencode($order->summary));
}`,
    },
  },
  {
    id: "renbook-online-rental",
    slug: "renbook-online-rental",
    title: "Renbook",
    role: "Project Lead & Full-Stack Developer",
    short_summary:
      "Sistem informasi peminjaman dan rental buku online dengan pemodelan 4 diagram UML, manajemen denda, dan pelacakan status sewa.",
    full_description: `## Ringkasan Proyek
Memimpin perancangan dan implementasi platform sewa buku online dari tahap pemodelan kebutuhan sistem hingga siap digunakan. Mendukung katalog 25+ buku, pembatasan kuota peminjaman per akun, dan kalkulasi denda otomatis.

## Pemodelan Rekayasa Perangkat Lunak
- Menggunakan 4 diagram UML: Use Case Diagram, Activity Diagram, Sequence Diagram, dan Class Diagram.
- Arsitektur modular memisahkan business logic sewa dengan sistem pelaporan admin.

## Fitur Utama
- **Katalog & Status Eksemplar**: Menampilkan stok ketersediaan eksemplar buku secara real-time.
- **Rental Life-Cycle**: Pencatatan tanggal pinjam, batas waktu pengembalian, dan histori peminjam.
- **Overdue Tracking**: Peringatan otomatis untuk buku yang melewati tanggal jatuh tempo.`,
    thumbnail_url: "https://images.unsplash.com/photo-1507842229451-79b1be8d62a2?q=80&w=1200&auto=format&fit=crop",
    gallery_urls: [
      "https://images.unsplash.com/photo-1507842229451-79b1be8d62a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop"
    ],
    tech_stacks: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Bootstrap", "JavaScript", "HTML5", "CSS3", "Laravel Auth", "UML Modeling"],
    live_url: "https://github.com/raakaprx/renbook-platform",
    repo_url: "https://github.com/raakaprx/renbook-platform",
    is_featured: true,
    display_order: 4,

    // Backward-compatible fields
    subtitle: "Platform Penyewaan Buku Online & Rental Management (2023)",
    description:
      "Memimpin perancangan dan implementasi platform sewa buku online dengan analisis kebutuhan komprehensif menggunakan UML diagrams (Use Case, Activity, Sequence, Class). Mendukung 25+ koleksi buku, alur peminjaman user-friendly, dan tracking status sewa.",
    category: "laravel",
    techStack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Bootstrap", "JavaScript", "HTML5", "CSS3", "Laravel Auth", "UML Modeling"],
    github: "https://github.com/raakaprx/renbook-platform",
    demo: "https://github.com/raakaprx/renbook-platform",
    thumbnailUrl: "https://images.unsplash.com/photo-1507842229451-79b1be8d62a2?q=80&w=1200&auto=format&fit=crop",
    featuredSpan: "lg:col-span-6",
    metrics: [
      { label: "Katalog", value: "25+ Book Titles" },
      { label: "Analisis Sistem", value: "4 UML Diagram Types" },
      { label: "Pelacakan", value: "Tracking Status Sewa" },
      { label: "Peran", value: "Project Lead & Full Stack" },
    ],
    architectureFlow: [
      { step: "UML Modeling", detail: "Pemodelan use-case, sequence, dan class diagram sebelum implementasi kode" },
      { step: "Rental Pipeline", detail: "Sistem reservasi, batas kuota pinjam per pengguna, dan verifikasi ketersediaan buku" },
      { step: "Return & Tracking", detail: "Pencatatan tanggal jatuh tempo dan pemantauan status pengembalian otomatis" },
    ],
    databaseSchema: [
      { table: "books", fields: ["id (PK)", "isbn", "title", "author", "available_copies"] },
      { table: "rentals", fields: ["id (PK)", "user_id (FK)", "book_id (FK)", "rent_date", "return_due"] },
    ],
    codeSnippet: {
      language: "php",
      filename: "RentalService.php",
      code: `public function createRental(User $user, Book $book): Rental
{
    abort_if($book->available_copies < 1, 400, "Stok buku sedang habis.");
    $book->decrement('available_copies');
    return Rental::create([
        'user_id' => $user->id,
        'book_id' => $book->id,
        'rent_date' => now(),
        'return_due' => now()->addDays(7),
    ]);
}`,
    },
  },
  {
    id: "midtrans-payment-integration",
    slug: "midtrans-payment-integration",
    title: "Midtrans Payment Gateway Integration",
    role: "Backend & Systems Engineer",
    short_summary:
      "Microservice pembayaran digital dengan verifikasi signature kriptografis SHA-512, webhook callback asinkron, dan transaction audit log.",
    full_description: `## Ringkasan Proyek
Implementasi modul pembayaran digital menyeluruh menggunakan Midtrans API. Menjamin integritas data transaksi keuangan dengan validasi signature kriptografis SHA-512 dan audit logging komprehensif.

## Arsitektur Keamanan Transaksi
- **Snap Token Generation**: Token pembayaran dibuat secara aman di server tanpa mengekspos server-key ke frontend.
- **Asynchronous Webhook Callback**: Menerima HTTP POST notification dari Midtrans dan memverifikasi kesesuaian signature key sebelum mengubah status settlement.
- **Idempotent Handling**: Mencegah duplikasi kredit atau pengiriman barang ganda saat callback diterima berulang kali.`,
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop",
    gallery_urls: [
      "https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop"
    ],
    tech_stacks: ["PHP", "Laravel", "Midtrans", "MySQL", "RESTful APIs", "Token-based Auth", "SHA-512 Encryption"],
    live_url: "https://github.com/raakaprx/midtrans-laravel-integration",
    repo_url: "https://github.com/raakaprx/midtrans-laravel-integration",
    is_featured: false,
    display_order: 5,

    // Backward-compatible fields
    subtitle: "Integrasi Sistem Pembayaran Digital & Webhook Aman (2023)",
    description:
      "Mengintegrasikan payment processing menggunakan Midtrans dengan implementasi callback handling aman, verifikasi signature kriptografis SHA-512, dan comprehensive transaction logging yang memenuhi standar audit.",
    category: "fullstack",
    techStack: ["PHP", "Laravel", "Midtrans", "MySQL", "RESTful APIs", "Token-based Auth", "SHA-512 Encryption"],
    github: "https://github.com/raakaprx/midtrans-laravel-integration",
    demo: "https://github.com/raakaprx/midtrans-laravel-integration",
    thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1200&auto=format&fit=crop",
    featuredSpan: "lg:col-span-6",
    metrics: [
      { label: "Keamanan", value: "SHA-512 Signature Hash" },
      { label: "Kanal Bayar", value: "Multi Payment Channels" },
      { label: "Audit", value: "100% Transaction Logged" },
      { label: "Protokol", value: "Token-Based & HTTPS" },
    ],
    architectureFlow: [
      { step: "Snap Token Generation", detail: "Backend membuat payload transaksi dan meminta Snap Token dari Midtrans API" },
      { step: "Customer Checkout", detail: "Modal pembayaran responsif Midtrans memproses pembayaran user" },
      { step: "Webhook Callback", detail: "Midtrans mengirim HTTP POST callback yang diverifikasi dengan SHA-512 signature" },
      { step: "Database Settlement", detail: "Update status transaksi secara atomic dalam database transaction" },
    ],
    databaseSchema: [
      { table: "orders", fields: ["id (PK)", "user_id", "total_price", "payment_status"] },
      { table: "payment_logs", fields: ["id (PK)", "order_id", "transaction_id", "status_code", "raw_response"] },
    ],
    codeSnippet: {
      language: "php",
      filename: "PaymentWebhookController.php",
      code: `public function handleNotification(Request $request)
{
    $serverKey = config('midtrans.server_key');
    $hashed = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);
    
    if ($hashed !== $request->signature_key) {
        return response()->json(['message' => 'Invalid signature'], 403);
    }
    
    Order::where('id', $request->order_id)->update(['payment_status' => $request->transaction_status]);
    return response()->json(['status' => 'ok']);
}`,
    },
  },
  {
    id: "vehicle-price-prediction-model",
    slug: "vehicle-price-prediction-model",
    title: "Vehicle Price Prediction Model",
    role: "Machine Learning Engineer",
    short_summary:
      "Model regresi machine learning berbasis Python dengan akurasi 87% untuk estimasi harga kendaraan berdasarkan spesifikasi teknis dan kondisi.",
    full_description: `## Ringkasan Proyek
Pengembangan model estimasi harga wajar kendaraan menggunakan teknik machine learning regresi. Model ini mencapai akurasi sebesar 87% dalam memprediksi nilai pasar berdasarkan kombinasi parameter teknis dan historis.

## Alur Data Science Pipeline
1. **Exploratory Data Analysis (EDA)**: Analisis distribusi harga, korelasi fitur mesin dan usia kendaraan, serta deteksi nilai pencilan (*outlier*).
2. **Data Preprocessing & Cleaning**: Penanganan nilai kosong (*missing values*) dan standarisasi format data.
3. **Feature Scaling**: Penerapan StandardScaler untuk fitur numerik serta One-Hot Encoding untuk fitur kategori (*brand* dan tipe transmisi).
4. **Model Training & Evaluation**: Pelatihan algoritma Linear Regression yang divalidasi menggunakan k-fold cross-validation.`,
    thumbnail_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    gallery_urls: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
    ],
    tech_stacks: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Linear Regression", "Cross-Validation"],
    live_url: "https://github.com/raakaprx/vehicle-price-prediction",
    repo_url: "https://github.com/raakaprx/vehicle-price-prediction",
    is_featured: false,
    display_order: 6,

    // Backward-compatible fields
    subtitle: "Machine Learning Model untuk Prediksi Harga Kendaraan (2024)",
    description:
      "Membangun linear regression model menggunakan Python yang mencapai akurasi 87% dalam memprediksi harga kendaraan berdasarkan fitur-fitur spesifik. Meliputi exploratory data analysis (EDA), feature engineering, data scaling, dan cross-validation.",
    category: "machine-learning",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Linear Regression", "Cross-Validation"],
    github: "https://github.com/raakaprx/vehicle-price-prediction",
    demo: "https://github.com/raakaprx/vehicle-price-prediction",
    thumbnailUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    featuredSpan: "lg:col-span-12",
    metrics: [
      { label: "Akurasi Model", value: "87% Accuracy" },
      { label: "Algoritma", value: "Linear Regression" },
      { label: "Validasi", value: "Cross-Validation" },
      { label: "Teknik", value: "Feature Scaling & Cleaning" },
    ],
    architectureFlow: [
      { step: "Data Harvesting & EDA", detail: "Analisis distribusi fitur kendaraan, korelasi variabel, dan visualisasi distribusi" },
      { step: "Data Cleaning", detail: "Penanganan missing values, deteksi outlier, dan standardisasi fitur" },
      { step: "Feature Engineering", detail: "Penskalaan nilai numerik (StandardScaler) dan one-hot encoding variabel kategori" },
      { step: "Model Evaluation", detail: "Pelatihan Linear Regression dengan evaluasi k-fold cross-validation menghasilkan akurasi 87%" },
    ],
    databaseSchema: [
      { table: "vehicle_dataset", fields: ["id", "brand", "year", "mileage", "engine_size", "price"] },
      { table: "model_metrics", fields: ["model_name", "r2_score", "mae", "rmse", "trained_at"] },
    ],
    codeSnippet: {
      language: "python",
      filename: "train_price_model.py",
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
score = model.score(X_test, y_test) # 87% accuracy`,
    },
  },
];
