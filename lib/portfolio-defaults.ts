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
  title: string;
  slug?: string;
  subtitle: string;
  description: string;
  category: "all" | "machine-learning" | "laravel" | "fullstack";
  techStack: string[];
  metrics: ProjectMetric[];
  github: string;
  demo?: string;
  thumbnailUrl?: string;
  featuredSpan?: string;
  architectureFlow: ArchitectureFlowStep[];
  databaseSchema: DatabaseSchemaTable[];
  codeSnippet: CodeSnippet;
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
      { name: "Laravel", proficiency: "Advanced" },
      { name: "PHP", proficiency: "Advanced" },
      { name: "Node.js", proficiency: "Proficient" },
      { name: "Express.js", proficiency: "Proficient" },
      { name: "Python", proficiency: "Proficient" },
      { name: "RESTful APIs", proficiency: "Advanced" },
      { name: "JWT Auth", proficiency: "Advanced" },
      { name: "Midtrans Payment", proficiency: "Advanced" },
    ],
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "MySQL", proficiency: "Advanced" },
      { name: "Prisma ORM", proficiency: "Advanced" },
      { name: "Redis", proficiency: "Proficient" },
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
    ],
  },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "smart-material-management-system",
    title: "Smart Material Management System (SMMS)",
    subtitle: "Proyek Skripsi 2026 — PT. Sundaya Indonesia & Telkom University",
    description:
      "Merancang dan mengembangkan full-stack web system untuk digitisasi seluruh proses material request, approval, stock-monitoring, dan procurement workflows yang sebelumnya dikelola secara manual. Mengimplementasikan 9 modul terintegrasi dengan 5 level RBAC dan notifikasi real-time Socket.IO.",
    category: "fullstack",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.IO", "Docker", "JWT", "Tailwind CSS"],
    metrics: [
      { label: "Modul Terintegrasi", value: "9 Integrated Modules" },
      { label: "Hak Akses (RBAC)", value: "5 Distinct User Roles" },
      { label: "Notifikasi", value: "Real-Time Socket.IO" },
      { label: "Deployment", value: "Docker Containerized" },
    ],
    github: "https://github.com/raakaprx/warehouse-sundaya-v2",
    featuredSpan: "lg:col-span-12",
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
  // Broadcast instant status update across all connected distribution sites
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
    title: "Plastani",
    subtitle: "Platform E-Commerce untuk UMKM & Petani Lokal (2025)",
    description:
      "Membangun platform e-commerce digital yang dirancang untuk membantu UMKM, khususnya petani dan produsen lokal, dalam menyalurkan produknya secara online dengan katalog terorganisir, pencarian efektif, integrasi WhatsApp order, serta sistem administrasi analitik transaksi.",
    category: "laravel",
    techStack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Tailwind CSS", "Laravel Auth"],
    metrics: [
      { label: "Sasaran", value: "Petani & UMKM Lokal" },
      { label: "Checkout", value: "Direct WhatsApp Order" },
      { label: "Admin Panel", value: "Analitik & Laporan Penjualan" },
      { label: "Keamanan", value: "Laravel Auth RBAC" },
    ],
    github: "https://github.com/raakaprx/plastani-ecommerce",
    featuredSpan: "lg:col-span-6",
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
    title: "JajanSepy",
    subtitle: "Platform E-Commerce untuk Single Brand UMKM (2025)",
    description:
      "Mengembangkan platform e-commerce khusus untuk penjualan produk single brand dengan sistem komunikasi terintegrasi ke WhatsApp Admin. Fokus pada kemudahan pengelolaan produk, manajemen inventory yang efisien, dan proses checkout yang streamlined.",
    category: "laravel",
    techStack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "JavaScript", "WhatsApp Admin API"],
    metrics: [
      { label: "Fokus Model", value: "Single Brand UMKM" },
      { label: "Pemesanan", value: "WhatsApp Admin API" },
      { label: "Inventory", value: "Streamlined Stock Tracking" },
      { label: "Konversi", value: "Quick Checkout Flow" },
    ],
    github: "https://github.com/raakaprx/jajansepy-ecommerce",
    featuredSpan: "lg:col-span-6",
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
    title: "Renbook (Project Lead)",
    subtitle: "Platform Penyewaan Buku Online & Rental Management (2023)",
    description:
      "Memimpin perancangan dan implementasi platform sewa buku online dengan analisis kebutuhan komprehensif menggunakan UML diagrams (Use Case, Activity, Sequence, Class). Mendukung 25+ koleksi buku, alur peminjaman user-friendly, dan tracking status sewa.",
    category: "laravel",
    techStack: ["PHP", "Laravel", "MySQL", "Eloquent ORM", "Blade", "Bootstrap", "Laravel Auth"],
    metrics: [
      { label: "Katalog", value: "25+ Book Titles" },
      { label: "Analisis Sistem", value: "4 UML Diagram Types" },
      { label: "Pelacakan", value: "Tracking Status Sewa" },
      { label: "Peran", value: "Project Lead & Full Stack" },
    ],
    github: "https://github.com/raakaprx/renbook-platform",
    featuredSpan: "lg:col-span-6",
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
    title: "Midtrans Payment Gateway Integration",
    subtitle: "Integrasi Sistem Pembayaran Digital & Webhook Aman (2023)",
    description:
      "Mengintegrasikan payment processing menggunakan Midtrans dengan implementasi callback handling aman, verifikasi signature kriptografis SHA-512, dan comprehensive transaction logging yang memenuhi standar audit.",
    category: "fullstack",
    techStack: ["PHP", "Laravel", "Midtrans", "MySQL", "RESTful APIs", "JWT"],
    metrics: [
      { label: "Keamanan", value: "SHA-512 Signature Hash" },
      { label: "Kanal Bayar", value: "Multi Payment Channels" },
      { label: "Audit", value: "100% Transaction Logged" },
      { label: "Protokol", value: "Token-Based & HTTPS" },
    ],
    github: "https://github.com/raakaprx/midtrans-laravel-integration",
    featuredSpan: "lg:col-span-6",
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
    title: "Vehicle Price Prediction Model",
    subtitle: "Machine Learning Model untuk Prediksi Harga Kendaraan (2024)",
    description:
      "Membangun linear regression model menggunakan Python yang mencapai akurasi 87% dalam memprediksi harga kendaraan berdasarkan fitur-fitur spesifik. Meliputi exploratory data analysis (EDA), feature engineering, data scaling, dan cross-validation.",
    category: "machine-learning",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn"],
    metrics: [
      { label: "Akurasi Model", value: "87% Accuracy" },
      { label: "Algoritma", value: "Linear Regression" },
      { label: "Validasi", value: "Cross-Validation" },
      { label: "Teknik", value: "Feature Scaling & Cleaning" },
    ],
    github: "https://github.com/raakaprx/vehicle-price-prediction",
    featuredSpan: "lg:col-span-12",
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

# Train vehicle price regression model
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
score = model.score(X_test, y_test) # 87% accuracy`,
    },
  },
];
