"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  BookOpenCheck,
  CreditCard,
  Layers,
  Search,
  Copy,
  Maximize2,
  Activity,
  Check,
  Cpu,
  Workflow,
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
import type { ProjectItem } from "@/lib/portfolio-defaults";

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "churn-prediction",
    title: "Churn Prediction Platform",
    subtitle: "End-to-End Machine Learning Analytics System",
    description:
      "Customer churn analysis and predictive modeling pipeline. Integrates data preprocessing, ensemble model inference, and an interactive dashboard for proactive customer retention strategies.",
    category: "machine-learning",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
    metrics: [
      { label: "ROC-AUC Score", value: "94.2%" },
      { label: "Inference Time", value: "< 45ms" },
      { label: "Model Type", value: "Ensemble Pipeline" },
    ],
    github: "https://github.com/raakaprx/churn-app",
    demo: "https://github.com/raakaprx/churn-app",
    icon: Activity,
    featuredSpan: "lg:col-span-8",
    architectureFlow: [
      { step: "Data Telemetry", detail: "Customer demographic and usage data ingested via RESTful API" },
      { step: "Feature Engineering", detail: "Numeric scaling with StandardScaler & categorical one-hot encoding" },
      { step: "Model Inference", detail: "Trained classification ensemble generates calibrated churn score (0.00 – 1.00)" },
      { step: "Retention Actions", detail: "Actionable dashboard insights prioritized by automated churn probability" },
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
    """Execute real-time churn inference with calibrated probabilities."""
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
      "Structured rental and booking platform designed for seamless inventory scheduling, transaction auditing, automated availability checks, and role-based access management.",
    category: "laravel",
    techStack: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    metrics: [
      { label: "Concurrency", value: "Pessimistic Lock" },
      { label: "Atomicity", value: "100% DB Trans." },
      { label: "Audit Log", value: "Automated Tracing" },
    ],
    github: "https://github.com/raakaprx/Rentbook-Laravel",
    demo: "https://github.com/raakaprx/Rentbook-Laravel",
    icon: BookOpenCheck,
    featuredSpan: "lg:col-span-4",
    architectureFlow: [
      { step: "Inventory Query", detail: "Client verifies real-time book schedule and reservation availability" },
      { step: "Pessimistic Locking", detail: "Atomic row lock prevents race conditions and accidental double-booking" },
      { step: "Invoice & QR Issue", detail: "Automated billing agreement and digital receipt with QR tracking code" },
      { step: "Penalty Audit", detail: "Automated cron service reconciles returns and calculates overdue fees" },
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
                throw new \\Exception("Selected inventory item is currently out of stock.");
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
      "Full-featured e-commerce ecosystem integrated with automated Midtrans payment gateway processing, asynchronous webhook HMAC verification, dynamic inventory reconciliation, and order tracking.",
    category: "laravel",
    techStack: ["Laravel", "Midtrans SDK", "RESTful API", "MySQL", "Redis"],
    metrics: [
      { label: "Security", value: "HMAC SHA-512" },
      { label: "Gateway", value: "Midtrans Snap API" },
      { label: "Queue Handler", value: "Redis Async Jobs" },
    ],
    github: "https://github.com/raakaprx/laravel-ecommerce-platform",
    demo: "https://github.com/raakaprx/laravel-ecommerce-platform",
    icon: CreditCard,
    featuredSpan: "lg:col-span-6",
    architectureFlow: [
      { step: "Order Checkout", detail: "Initiates server-side payment token negotiation with Midtrans Snap" },
      { step: "Settlement", detail: "Customer fulfills transaction via QRIS, Virtual Account, or Credit Card" },
      { step: "Webhook Validation", detail: "Validates Midtrans SHA-512 signature hash to ensure payload integrity" },
      { step: "Fulfillment Job", detail: "Dispatches Redis background queue for stock reconciliation and receipts" },
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
        
        // Midtrans cryptographic signature verification
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
      "Real-time material request and multi-tier approval system. Replaced error-prone manual spreadsheets with audit trails and automated inventory updates across regional distribution hubs.",
    category: "fullstack",
    techStack: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.IO", "Docker", "JWT"],
    metrics: [
      { label: "Sync Engine", value: "WebSocket Latency <20ms" },
      { label: "Auth Model", value: "Stateless JWT + RBAC" },
      { label: "Deployment", value: "Docker Containerized" },
    ],
    github: "https://github.com/raakaprx/warehouse-sundaya-v2",
    demo: "https://github.com/raakaprx/warehouse-sundaya-v2",
    icon: Layers,
    featuredSpan: "lg:col-span-6",
    architectureFlow: [
      { step: "Requisition Entry", detail: "Material requisition submitted by warehouse operator with line-item specs" },
      { step: "Multi-tier Approval", detail: "Real-time socket events notify area supervisors for staged authorizations" },
      { step: "Inventory Sync", detail: "Real-time broadcast pushes stock updates to all connected desktop clients" },
      { step: "Dispatch Manifest", detail: "Generates tamper-evident dispatch manifest with automated barcodes" },
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
    
    // Broadcast live event across all connected warehouse monitors
    io.emit("request_status_updated", { requestId, status });
  } catch (err) {
    await connection.rollback();
    throw err;
  }
}`,
    },
  },
];

function InteractiveProjectCard({
  project,
  onExplore,
}: {
  project: ProjectItem;
  onExplore: () => void;
}) {
  const Icon = project.icon || Workflow;
  const [activeCardTab, setActiveCardTab] = useState<"overview" | "flow" | "metrics">("overview");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copiedClone, setCopiedClone] = useState(false);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoord({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${project.github}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2200);
  };

  // Strictly filter only technologies that have genuine logos ("jika tidak ada logo tidak usah")
  const validTechStack = project.techStack.filter((t) => Boolean(getTechLogo(t)));

  return (
    <Card
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full flex flex-col justify-between p-6 sm:p-7 group relative overflow-hidden border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 hover:border-zinc-500 dark:hover:border-zinc-650 transition-all duration-300 shadow-sm hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/50"
    >
      {/* 3D Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mouseCoord.x}px ${mouseCoord.y}px, rgba(59, 130, 246, 0.08), transparent 70%)`
            : "none",
        }}
      />

      <div className="relative z-10">
        {/* Card Header: Icon + Category Badge + Quick Actions */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <Badge
              variant="outline"
              className="text-[10px] font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
            >
              {project.category.replace("-", " ").toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Clone Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopyClone}
                  className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors cursor-pointer"
                  aria-label="Copy Git Clone Command"
                >
                  {copiedClone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-mono">
                {copiedClone ? "Copied git clone command!" : "Copy git clone"}
              </TooltipContent>
            </Tooltip>

            {/* GitHub Repo Link */}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-track-event="project_click"
              data-track-target={`GitHub: ${project.title}`}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
              title="View GitHub Repository"
              aria-label="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Project Title & Interactive Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 mt-0.5 font-medium">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Tab Selector Inside Card */}
        <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg mb-4 text-xs font-mono">
          <button
            onClick={() => setActiveCardTab("overview")}
            className={`flex-1 py-1 px-2 rounded-md font-semibold transition-colors cursor-pointer ${
              activeCardTab === "overview"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-2xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveCardTab("flow")}
            className={`flex-1 py-1 px-2 rounded-md font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeCardTab === "flow"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-2xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            <Workflow className="w-3 h-3 text-blue-500" />
            Flow
          </button>
          <button
            onClick={() => setActiveCardTab("metrics")}
            className={`flex-1 py-1 px-2 rounded-md font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeCardTab === "metrics"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-2xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            <Activity className="w-3 h-3 text-emerald-500" />
            Metrics
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="min-h-[140px] mb-5">
          <AnimatePresence mode="wait">
            {activeCardTab === "overview" && (
              <motion.p
                key="tab-overview"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal"
              >
                {project.description}
              </motion.p>
            )}

            {activeCardTab === "flow" && (
              <motion.div
                key="tab-flow"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {project.architectureFlow.map((step, idx) => (
                    <button
                      key={step.step}
                      onClick={() => setActiveStep(idx)}
                      className={`px-2 py-1 text-[11px] font-mono rounded-md shrink-0 transition-colors cursor-pointer ${
                        activeStep === idx
                          ? "bg-blue-600 text-white font-bold"
                          : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400"
                      }`}
                    >
                      {idx + 1}. {step.step}
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800/80 text-xs font-mono shadow-2xs">
                  <div className="font-bold text-zinc-950 dark:text-white mb-1">
                    Step {activeStep + 1}: {project.architectureFlow[activeStep]?.step}
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 text-[11px] leading-relaxed">
                    {project.architectureFlow[activeStep]?.detail}
                  </div>
                </div>
              </motion.div>
            )}

            {activeCardTab === "metrics" && (
              <motion.div
                key="tab-metrics"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-2"
              >
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800/80 shadow-2xs"
                  >
                    <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1 font-semibold truncate">
                      {m.label}
                    </div>
                    <div className="text-xs font-bold text-zinc-950 dark:text-white font-mono truncate">
                      {m.value}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10">
        {/* Tech Stack */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {validTechStack.map((tech) => {
            const logo = getTechLogo(tech, "w-5 h-5");
            if (!logo) return null;
            return (
              <div key={tech} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" title={tech}>
                {logo}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-850">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExplore}
            className="text-xs font-mono text-zinc-900 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-white gap-1.5 pl-0 hover:bg-transparent cursor-pointer font-bold"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Explore
          </Button>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            data-track-event="project_click"
            data-track-target={`GitHub: ${project.title}`}
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors font-semibold"
          >
            GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </Card>
  );
}

export default function Projects({
  initialProjects,
}: {
  initialProjects?: ProjectItem[];
}) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<"architecture" | "database" | "code">("architecture");
  const [copiedCode, setCopiedCode] = useState(false);

  const projectsList = useMemo(() => {
    return initialProjects && initialProjects.length > 0
      ? initialProjects.map((p) => ({
          ...p,
          icon:
            p.icon ||
            (p.category === "machine-learning"
              ? Cpu
              : p.category === "laravel"
              ? CreditCard
              : Layers),
        }))
      : PROJECTS_DATA;
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchTab = activeTab === "all" || p.category === activeTab;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTab && matchSearch;
    });
  }, [projectsList, activeTab, searchQuery]);

  const handleCopySnippet = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <TooltipProvider delayDuration={50}>
      <section id="projects" className="py-24 bg-background relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <Badge
              variant="outline"
              className="mb-3 px-3.5 py-1 font-mono text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs"
            >
              Interactive Portfolio Showcase
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Featured Systems & Applications
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm max-w-xl mt-3 font-normal">
              Explore interactive architectural flows, live engineering metrics, and verified production code across full-stack and machine learning systems.
            </p>
          </div>

          {/* Filter Controls: Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 p-1 rounded-xl flex overflow-x-auto max-w-full scrollbar-none w-full sm:w-auto justify-start sm:justify-center shadow-xs">
                <TabsTrigger value="all" className="whitespace-nowrap shrink-0 text-xs font-semibold text-zinc-800 dark:text-zinc-300 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-950 dark:data-[state=active]:text-white data-[state=active]:shadow-xs">
                  All Projects
                </TabsTrigger>
                <TabsTrigger value="machine-learning" className="whitespace-nowrap shrink-0 text-xs font-semibold text-zinc-800 dark:text-zinc-300 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-950 dark:data-[state=active]:text-white data-[state=active]:shadow-xs">
                  Machine Learning
                </TabsTrigger>
                <TabsTrigger value="laravel" className="whitespace-nowrap shrink-0 text-xs font-semibold text-zinc-800 dark:text-zinc-300 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-950 dark:data-[state=active]:text-white data-[state=active]:shadow-xs">
                  Laravel & Backend
                </TabsTrigger>
                <TabsTrigger value="fullstack" className="whitespace-nowrap shrink-0 text-xs font-semibold text-zinc-800 dark:text-zinc-300 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-950 dark:data-[state=active]:text-white data-[state=active]:shadow-xs">
                  Full-Stack
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search tech or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-950 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-600 transition-colors font-mono shadow-xs"
              />
            </div>
          </div>

          {/* Bento Grid */}
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col ${project.featuredSpan || "lg:col-span-6"}`}
                >
                  <InteractiveProjectCard
                    project={project}
                    onExplore={() => {
                      setSelectedProject(project);
                      setModalTab("architecture");
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-zinc-500 font-mono text-sm border border-zinc-200 dark:border-zinc-900 rounded-2xl">
              No projects matched your criteria.
            </div>
          )}

          {/* Interactive Deep-Dive Modal */}
          <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-3xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8">
              {selectedProject && (
                <div>
                  <DialogHeader className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                        {selectedProject.category.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-mono text-zinc-400">• Deep Dive Explorer</span>
                    </div>
                    <DialogTitle className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-600 dark:text-zinc-400 text-sm">
                      {selectedProject.subtitle}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Modal Navigation Tabs */}
                  <Tabs value={modalTab} onValueChange={(v) => setModalTab(v as "architecture" | "database" | "code")} className="w-full">
                    <TabsList className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl mb-6 flex overflow-x-auto">
                      <TabsTrigger value="architecture" className="text-xs font-mono">
                        Architecture Flow
                      </TabsTrigger>
                      <TabsTrigger value="database" className="text-xs font-mono">
                        Database Schema
                      </TabsTrigger>
                      <TabsTrigger value="code" className="text-xs font-mono">
                        Core Code Implementation
                      </TabsTrigger>
                    </TabsList>

                    {/* Architecture Flow Tab */}
                    {modalTab === "architecture" && (
                      <div className="space-y-4">
                        <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                          Data & Execution Pipeline
                        </p>
                        <div className="space-y-3">
                          {selectedProject.architectureFlow.map((flow, index) => (
                            <div
                              key={flow.step}
                              className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/40 flex items-start gap-4 shadow-2xs"
                            >
                              <span className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                                {index + 1}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-1">
                                  {flow.step}
                                </h4>
                                <p className="text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed">
                                  {flow.detail}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Database Schema Tab */}
                    {modalTab === "database" && (
                      <div className="space-y-4">
                        <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                          Relational Data Architecture
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProject.databaseSchema.map((schema) => (
                            <div
                              key={schema.table}
                              className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/40 shadow-2xs"
                            >
                              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                                <span className="text-zinc-600 dark:text-zinc-400">table:</span>
                                {schema.table}
                              </div>
                              <ul className="space-y-1 font-mono text-[11px] text-zinc-800 dark:text-zinc-300">
                                {schema.fields.map((field) => (
                                  <li key={field} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                                    {field}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Snippet Tab */}
                    {modalTab === "code" && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-zinc-500">
                            {selectedProject.codeSnippet.filename}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopySnippet(selectedProject.codeSnippet.code)}
                            className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white gap-1.5 cursor-pointer"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy Snippet
                              </>
                            )}
                          </Button>
                        </div>
                        <ScrollArea className="h-72 w-full rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-950 p-4">
                          <pre className="font-mono text-xs text-zinc-300 leading-relaxed">
                            <code>{selectedProject.codeSnippet.code}</code>
                          </pre>
                        </ScrollArea>
                      </div>
                    )}
                  </Tabs>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </TooltipProvider>
  );
}
