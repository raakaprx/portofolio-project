"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ReactLogo,
  NextjsLogo,
  TypescriptLogo,
  JavascriptLogo,
  TailwindLogo,
  LaravelLogo,
  PhpLogo,
  NodejsLogo,
  ExpressLogo,
  PythonLogo,
  ScikitlearnLogo,
  PandasLogo,
  NumpyLogo,
  PostgresqlLogo,
  MysqlLogo,
  RedisLogo,
  DockerLogo,
  GitLogo,
  PrismaLogo,
  HtmlLogo,
  CssLogo,
  RestApiLogo,
  MidtransLogo,
} from "@/components/icons";

interface TechItem {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  proficiency: "Advanced" | "Proficient";
}

interface TechGroup {
  category: string;
  items: TechItem[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: "Frontend Development",
    items: [
      { name: "React.js", logo: ReactLogo, proficiency: "Advanced" },
      { name: "Next.js", logo: NextjsLogo, proficiency: "Advanced" },
      { name: "TypeScript", logo: TypescriptLogo, proficiency: "Advanced" },
      { name: "JavaScript", logo: JavascriptLogo, proficiency: "Advanced" },
      { name: "Tailwind CSS", logo: TailwindLogo, proficiency: "Advanced" },
      { name: "HTML5", logo: HtmlLogo, proficiency: "Advanced" },
      { name: "CSS3", logo: CssLogo, proficiency: "Advanced" },
    ],
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "Laravel", logo: LaravelLogo, proficiency: "Advanced" },
      { name: "PHP", logo: PhpLogo, proficiency: "Advanced" },
      { name: "Node.js", logo: NodejsLogo, proficiency: "Advanced" },
      { name: "Express.js", logo: ExpressLogo, proficiency: "Advanced" },
      { name: "Python", logo: PythonLogo, proficiency: "Proficient" },
      { name: "Midtrans Payment Gateway", logo: MidtransLogo, proficiency: "Advanced" },
      { name: "Redis", logo: RedisLogo, proficiency: "Proficient" },
      { name: "REST APIs", logo: RestApiLogo, proficiency: "Advanced" },
    ],
  },
  {
    category: "Databases & ORM",
    items: [
      { name: "PostgreSQL", logo: PostgresqlLogo, proficiency: "Advanced" },
      { name: "MySQL", logo: MysqlLogo, proficiency: "Advanced" },
      { name: "Prisma ORM", logo: PrismaLogo, proficiency: "Advanced" },
      { name: "Redis Cache", logo: RedisLogo, proficiency: "Proficient" },
    ],
  },
  {
    category: "Data Science & Applied ML",
    items: [
      { name: "Python", logo: PythonLogo, proficiency: "Advanced" },
      { name: "Scikit-Learn", logo: ScikitlearnLogo, proficiency: "Advanced" },
      { name: "Pandas", logo: PandasLogo, proficiency: "Advanced" },
      { name: "NumPy", logo: NumpyLogo, proficiency: "Advanced" },
      { name: "Docker", logo: DockerLogo, proficiency: "Proficient" },
      { name: "Git & GitHub", logo: GitLogo, proficiency: "Advanced" },
    ],
  },
];

export default function TechStack() {
  return (
    <TooltipProvider delayDuration={50}>
      <section id="techstack" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <Badge
              variant="outline"
              className="mb-3 px-3.5 py-1 font-mono text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs"
            >
              Technology Arsenal
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Technologies & Frameworks
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm max-w-md mt-3 font-normal">
              Standardized industry tooling utilized across production web platforms and data pipelines.
            </p>
          </div>

          {/* Categorized Logo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_GROUPS.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
                className="rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all"
              >
                {/* Clean Category Header */}
                <h3 className="text-sm font-mono font-bold text-zinc-950 dark:text-zinc-200 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {group.category}
                </h3>

                {/* Sleek Logo Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  {group.items.map((item) => {
                    const LogoComponent = item.logo;

                    return (
                      <Tooltip key={item.name}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={item.name}
                            className="group relative p-3 sm:p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-850 transition-all duration-200 cursor-pointer shadow-xs hover:scale-105 flex items-center justify-center"
                          >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                              <LogoComponent className="w-full h-full object-contain" />
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 shadow-xl font-mono text-xs"
                        >
                          <span className="font-bold text-zinc-950 dark:text-white">{item.name}</span>
                          <span className="text-zinc-600 dark:text-zinc-400 ml-2">({item.proficiency})</span>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
