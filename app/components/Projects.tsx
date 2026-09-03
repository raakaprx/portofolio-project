"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  BookOpenCheck,
  CreditCard,
  Layers,
  Code2,
  Database,
  Workflow,
  Search,
  CheckCircle,
  Copy,
  Maximize2,
  Activity,
} from "lucide-react";
import { Github, getTechLogo } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "all" | "machine-learning" | "laravel" | "fullstack";
  techStack: string[];
  github: string;
  demo?: string;
  icon: React.ComponentType<{ className?: string }>;
  featuredSpan?: string; // Bento grid span
  architectureFlow: string[];
  databaseSchema: { table: string; fields: string[] }[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "churn-prediction",
    title: "Churn Prediction Platform",
    subtitle: "End-to-End Machine Learning Analytics System",
    description:
      "Customer churn analysis and predictive modeling pipeline. Integrates data preprocessing, model inference, and an interactive dashboard for proactive customer retention strategies.",
    category: "machine-learning",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Web Integration", "Data Visualization"],
    github: "https://github.com/raakaprx/churn-app",
    demo: "https://github.com/raakaprx/churn-app",
    icon: Activity,
    featuredSpan: "lg:col-span-8",
    architectureFlow: [
      "Customer demographic and behavioral telemetry ingested via web interface",
      "Feature engineering pipeline: scaling numeric metrics and one-hot encoding categories",
      "Trained classification ensemble evaluating churn probability score (0.00 – 1.00)",
      "Interactive data visualization displaying risk factors and retention insights",
    ],
    databaseSchema: [
      {
        table: "customers",
        fields: ["id (UUID)", "tenure (INT)", "monthly_charges (DECIMAL)", "contract_type (VARCHAR)"],
      },
      {
        table: "churn_predictions",
        fields: ["id (UUID)", "customer_id (FK)", "probability (FLOAT)", "risk_level (ENUM)", "created_at (TIMESTAMP)"],
      },
      {
        table: "retention_actions",
        fields: ["id (UUID)", "prediction_id (FK)", "action_type (VARCHAR)", "status (VARCHAR)"],
      },
    ],
    codeSnippet: {
      language: "python",
      filename: "model_pipeline.py",
      code: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

def predict_customer_churn(model, customer_features: dict) -> dict:
    """Execute real-time churn inference with confidence intervals."""
    processed_vector = preprocess_input(customer_features)
    churn_prob = model.predict_proba([processed_vector])[0][1]
    
    return {
        "churn_probability": round(float(churn_prob), 4),
        "risk_category": "HIGH" if churn_prob > 0.65 else ("MEDIUM" if churn_prob > 0.35 else "LOW"),
        "retention_recommended": churn_prob > 0.45
    }`,
    },
  },
  {
    id: "rentbook-management",
    title: "Rentbook Management System",
    subtitle: "Enterprise Rental & Booking Infrastructure",
    description:
      "Structured rental and booking platform designed for seamless inventory scheduling, transaction auditing, automated availability checks, and role-based management.",
    category: "laravel",
    techStack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "Eloquent ORM"],
    github: "https://github.com/raakaprx/Rentbook-Laravel",
    demo: "https://github.com/raakaprx/Rentbook-Laravel",
    icon: BookOpenCheck,
    featuredSpan: "lg:col-span-4",
    architectureFlow: [
      "Client requests item reservation with start/end scheduling dates",
      "Atomic database transaction locks item slot to prevent double-booking",
      "Rental agreement and automated invoice generation with QR verification",
      "Return handling workflow with automatic late penalty assessment",
    ],
    databaseSchema: [
      {
        table: "books_inventory",
        fields: ["id (BIGINT PK)", "isbn (VARCHAR)", "title (VARCHAR)", "stock_available (INT)", "status (ENUM)"],
      },
      {
        table: "rentals",
        fields: ["id (BIGINT PK)", "user_id (FK)", "book_id (FK)", "borrow_date (DATE)", "due_date (DATE)", "returned_at (DATETIME)"],
      },
      {
        table: "penalty_logs",
        fields: ["id (BIGINT PK)", "rental_id (FK)", "fine_amount (DECIMAL)", "payment_status (VARCHAR)"],
      },
    ],
    codeSnippet: {
      language: "php",
      filename: "RentalService.php",
      code: `namespace App\\Services;

use App\\Models\\Book;
use App\\Models\\Rental;
use Illuminate\\Support\\Facades\\DB;

class RentalService
{
    public function createBooking(int $userId, int $bookId, string $startDate, string $dueDate): Rental
    {
        return DB::transaction(function () use ($userId, $bookId, $startDate, $dueDate) {
            $book = Book::where('id', $bookId)->lockForUpdate()->firstOrFail();
            
            if ($book->stock_available < 1) {
                throw new \\Exception("Selected inventory item is out of stock.");
            }
            
            $book->decrement('stock_available');
            
            return Rental::create([
                'user_id' => $userId,
                'book_id' => $bookId,
                'borrow_date' => $startDate,
                'due_date' => $dueDate,
                'status' => 'active'
            ]);
        });
    }
}`,
    },
  },
  {
    id: "ecommerce-payment-gateway",
    title: "E-Commerce & Payment Gateway Platform",
    subtitle: "Automated Checkout & Multi-Channel Transactions",
    description:
      "Full-featured e-commerce ecosystem integrated with automated payment gateway processing, webhook signature verification, dynamic inventory reconciliation, and order tracking.",
    category: "laravel",
    techStack: ["Laravel", "Payment Gateway", "RESTful API", "MySQL", "Midtrans SDK", "Redis"],
    github: "https://github.com/raakaprx/laravel-ecommerce-platform",
    demo: "https://github.com/raakaprx/laravel-ecommerce-platform",
    icon: CreditCard,
    featuredSpan: "lg:col-span-6",
    architectureFlow: [
      "Cart checkout initiates server-side cryptographic token with Payment Gateway",
      "Customer executes settlement via Virtual Account, QRIS, or Card",
      "Asynchronous webhook notification securely validated with SHA-512 signature",
      "Automated stock deduction, invoice emailing, and order status transition to 'Paid'",
    ],
    databaseSchema: [
      {
        table: "orders",
        fields: ["id (VARCHAR PK)", "user_id (FK)", "total_amount (DECIMAL)", "payment_status (ENUM)", "invoice_number (VARCHAR)"],
      },
      {
        table: "order_items",
        fields: ["id (BIGINT PK)", "order_id (FK)", "product_id (FK)", "quantity (INT)", "unit_price (DECIMAL)"],
      },
      {
        table: "payment_transactions",
        fields: ["id (BIGINT PK)", "order_id (FK)", "gateway_tx_id (VARCHAR)", "signature_key (VARCHAR)", "payload (JSON)"],
      },
    ],
    codeSnippet: {
      language: "php",
      filename: "PaymentWebhookController.php",
      code: `namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\Order;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();
        $serverKey = config('services.midtrans.server_key');
        $signature = hash('sha512', $payload['order_id'] . $payload['status_code'] . $payload['gross_amount'] . $serverKey);

        if ($signature !== $payload['signature_key']) {
            return response()->json(['message' => 'Invalid signature hash'], 403);
        }

        $order = Order::findOrFail($payload['order_id']);
        if ($payload['transaction_status'] === 'settlement') {
            $order->update(['payment_status' => 'PAID']);
            $order->dispatchFulfillmentJob();
        }

        return response()->json(['status' => 'success']);
    }
}`,
    },
  },
  {
    id: "warehouse-management-smms",
    title: "Smart Material Management System",
    subtitle: "Enterprise Distribution & Logistics Platform",
    description:
      "Real-time material request and multi-tier approval system. Replaced error-prone manual spreadsheets with audit trails and automated inventory updates.",
    category: "fullstack",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.IO", "Docker", "JWT"],
    github: "https://github.com/raakaprx/warehouse-sundaya-v2",
    demo: "https://github.com/raakaprx/warehouse-sundaya-v2",
    icon: Layers,
    featuredSpan: "lg:col-span-6",
    architectureFlow: [
      "Operator submits material procurement requisition with specifications",
      "Department supervisors review and authorize multi-level approvals in real time",
      "Socket.IO pushes immediate push notifications across all distribution hubs",
      "Automated PDF dispatch generation with barcoding and tamper-evident logs",
    ],
    databaseSchema: [
      {
        table: "material_requests",
        fields: ["id (INT PK)", "requester_id (FK)", "status (ENUM)", "priority (ENUM)", "created_at (TIMESTAMP)"],
      },
      {
        table: "request_approvals",
        fields: ["id (INT PK)", "request_id (FK)", "approver_id (FK)", "decision (ENUM)", "notes (TEXT)"],
      },
    ],
    codeSnippet: {
      language: "typescript",
      filename: "approvalHandler.ts",
      code: `import { io } from "../server";
import { db } from "../config/db";

export async function processApproval(requestId: number, approverId: number, status: string) {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    await connection.execute(
      "UPDATE material_requests SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, requestId]
    );
    await connection.commit();
    io.emit("request_status_updated", { requestId, status });
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}`,
    },
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<"architecture" | "database" | "code">("architecture");
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchTab = activeTab === "all" || p.category === activeTab;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  const handleCopySnippet = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <TooltipProvider delayDuration={50}>
      <section id="projects" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="outline" className="mb-3 px-3 py-1 font-mono text-zinc-400">
            Portfolio Showcase
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Systems & Applications
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mt-3">
            A curated selection of machine learning platforms, transactional backend architectures,
            and scalable full-stack web applications.
          </p>
        </div>

        {/* Filter Controls: Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-zinc-950 border border-zinc-800/80 p-1 rounded-xl flex overflow-x-auto max-w-full scrollbar-none w-full sm:w-auto justify-start sm:justify-center">
              <TabsTrigger value="all" className="whitespace-nowrap shrink-0 text-xs">All Projects</TabsTrigger>
              <TabsTrigger value="machine-learning" className="whitespace-nowrap shrink-0 text-xs">Machine Learning</TabsTrigger>
              <TabsTrigger value="laravel" className="whitespace-nowrap shrink-0 text-xs">Laravel & Backend</TabsTrigger>
              <TabsTrigger value="fullstack" className="whitespace-nowrap shrink-0 text-xs">Full-Stack</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tech or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col ${project.featuredSpan || "lg:col-span-6"}`}
                >
                  <Card className="h-full flex flex-col justify-between p-6 sm:p-7 group relative overflow-hidden border-zinc-800/80 bg-zinc-950/70 hover:border-zinc-600 transition-all duration-300">
                    {/* Subtle Corner Glow on Hover */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* Top Bar: Icon + External Action */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[11px] font-mono text-zinc-400">
                            {project.category.replace("-", " ").toUpperCase()}
                          </Badge>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                            title="View GitHub Repository"
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Titles */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-zinc-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-500 mb-3">{project.subtitle}</p>

                      {/* Description */}
                      <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack - Large Official Logos with Tooltips */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-6">
                        {project.techStack.map((tech) => {
                          const logo = getTechLogo(tech, "w-6 h-6 sm:w-7 sm:h-7");
                          return (
                            <Tooltip key={tech}>
                              <TooltipTrigger asChild>
                                <div
                                  aria-label={tech}
                                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-850 hover:scale-110 transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center"
                                >
                                  {logo || <span className="text-xs font-mono text-zinc-400">{tech}</span>}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs font-mono text-white">
                                {tech}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProject(project);
                            setModalTab("architecture");
                          }}
                          className="text-xs font-mono text-zinc-300 hover:text-white gap-1.5 pl-0 hover:bg-transparent"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          Explore Architecture & Code
                        </Button>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                        >
                          GitHub
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-zinc-500 font-mono text-sm border border-zinc-900 rounded-2xl">
            No projects matched your criteria.
          </div>
        )}

        {/* Interactive Architecture & Code Preview Modal (shadcn Dialog) */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-3xl border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            {selectedProject && (
              <>
                <DialogHeader className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {selectedProject.category.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-mono text-zinc-500">• Technical Deep-Dive</span>
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-zinc-400 text-sm mt-1">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Modal Sub-Tabs: Architecture, Schema, Code */}
                <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 mb-4">
                  <button
                    onClick={() => setModalTab("architecture")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      modalTab === "architecture"
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    System Architecture
                  </button>

                  <button
                    onClick={() => setModalTab("database")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      modalTab === "database"
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    Database Schema
                  </button>

                  <button
                    onClick={() => setModalTab("code")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      modalTab === "code"
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Code Highlight
                  </button>
                </div>

                {/* Tab Content Area */}
                <div className="min-h-[260px]">
                  {modalTab === "architecture" && (
                    <div className="space-y-3">
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                        Core System Pipeline & Data Flow:
                      </p>
                      <div className="grid grid-cols-1 gap-2.5">
                        {selectedProject.architectureFlow.map((step, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/70 text-zinc-300 text-xs sm:text-sm"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-400 font-bold">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {modalTab === "database" && (
                    <div className="space-y-4">
                      <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                        Key Entities & Relations:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.databaseSchema.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 font-mono text-xs"
                          >
                            <div className="text-white font-bold pb-2 mb-2 border-b border-zinc-800 flex items-center gap-1.5">
                              <Database className="w-3.5 h-3.5 text-zinc-400" />
                              {item.table}
                            </div>
                            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
                              {item.fields.map((f, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-1.5">
                                  <span className="text-zinc-600">→</span>
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {modalTab === "code" && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/40 text-xs font-mono text-zinc-400">
                        <span>{selectedProject.codeSnippet.filename}</span>
                        <button
                          onClick={() => handleCopySnippet(selectedProject.codeSnippet.code)}
                          className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
                        >
                          {copiedCode ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <ScrollArea className="h-64 p-4 text-xs font-mono text-zinc-300 leading-relaxed">
                        <pre>
                          <code>{selectedProject.codeSnippet.code}</code>
                        </pre>
                      </ScrollArea>
                    </div>
                  )}
                </div>

                {/* Modal Footer Links */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-900 mt-6">
                  <span className="text-xs font-mono text-zinc-500">
                    Repo: github.com/raakaprx
                  </span>
                  <div className="flex items-center gap-3">
                    <Button
                      asChild
                      size="sm"
                      className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-1.5"
                    >
                      <a href={selectedProject.github} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4" />
                        View Repository
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  </TooltipProvider>
  );
}
