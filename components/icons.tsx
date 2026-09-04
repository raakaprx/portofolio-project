import * as React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
  SiWhatsapp,
  SiGmail,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiRedis,
  SiSocketdotio,
  SiJsonwebtokens,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";

export function Github({ className = "w-5 h-5", ...props }: React.ComponentProps<typeof SiGithub>) {
  return <SiGithub className={`${className} transition-colors`} {...props} />;
}

export function Linkedin({ className = "w-5 h-5", ...props }: React.ComponentProps<typeof FaLinkedin>) {
  return <FaLinkedin className={`${className} text-[#0A66C2]`} {...props} />;
}

export function WhatsappLogo({ className = "w-5 h-5", ...props }: React.ComponentProps<typeof SiWhatsapp>) {
  return <SiWhatsapp className={`${className} text-[#25D366]`} {...props} />;
}

export function GmailLogo({ className = "w-5 h-5", ...props }: React.ComponentProps<typeof SiGmail>) {
  return <SiGmail className={`${className} text-[#EA4335]`} {...props} />;
}

export function ReactLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiReact>) {
  return <SiReact className={`${className} text-[#61DAFB]`} {...props} />;
}

export function NextjsLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiNextdotjs>) {
  return <SiNextdotjs className={`${className} text-zinc-900 dark:text-white`} {...props} />;
}

export function TypescriptLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiTypescript>) {
  return <SiTypescript className={`${className} text-[#3178C6]`} {...props} />;
}

export function JavascriptLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiJavascript>) {
  return <SiJavascript className={`${className} text-[#F7DF1E]`} {...props} />;
}

export function TailwindLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiTailwindcss>) {
  return <SiTailwindcss className={`${className} text-[#38BDF8]`} {...props} />;
}

export function LaravelLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiLaravel>) {
  return <SiLaravel className={`${className} text-[#FF2D20]`} {...props} />;
}

export function PhpLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPhp>) {
  return <SiPhp className={`${className} text-[#777BB4]`} {...props} />;
}

export function NodejsLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiNodedotjs>) {
  return <SiNodedotjs className={`${className} text-[#5FA04E]`} {...props} />;
}

export function ExpressLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiExpress>) {
  return <SiExpress className={`${className} text-zinc-800 dark:text-zinc-200`} {...props} />;
}

export function PythonLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPython>) {
  return <SiPython className={`${className} text-[#3776AB]`} {...props} />;
}

export function ScikitlearnLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiScikitlearn>) {
  return <SiScikitlearn className={`${className} text-[#F7931E]`} {...props} />;
}

export function PandasLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPandas>) {
  return <SiPandas className={`${className} text-[#150458] dark:text-[#58A6FF]`} {...props} />;
}

export function NumpyLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiNumpy>) {
  return <SiNumpy className={`${className} text-[#013243] dark:text-[#4DABCF]`} {...props} />;
}

export function PostgresqlLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPostgresql>) {
  return <SiPostgresql className={`${className} text-[#4169E1]`} {...props} />;
}

export function MysqlLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiMysql>) {
  return <SiMysql className={`${className} text-[#4479A1]`} {...props} />;
}

export function RedisLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiRedis>) {
  return <SiRedis className={`${className} text-[#DC382D]`} {...props} />;
}

export function SocketdotioLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiSocketdotio>) {
  return <SiSocketdotio className={`${className} text-zinc-900 dark:text-white`} {...props} />;
}

export function JwtLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiJsonwebtokens>) {
  return <SiJsonwebtokens className={`${className} text-[#FB015B]`} {...props} />;
}

export function DockerLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiDocker>) {
  return <SiDocker className={`${className} text-[#2496ED]`} {...props} />;
}

export function GitLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiGit>) {
  return <SiGit className={`${className} text-[#F05032]`} {...props} />;
}

export function PrismaLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPrisma>) {
  return <SiPrisma className={`${className} text-zinc-900 dark:text-white`} {...props} />;
}

export function RestApiLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof TbApi>) {
  return <TbApi className={`${className} text-[#38BDF8]`} {...props} />;
}

export function HtmlLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiHtml5>) {
  return <SiHtml5 className={`${className} text-[#E34F26]`} {...props} />;
}

export function CssLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiCss>) {
  return <SiCss className={`${className} text-[#1572B6]`} {...props} />;
}

export function MidtransLogo({ className = "w-7 h-7", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <title>Midtrans Payment Gateway</title>
      {/* Midtrans official geometric stylized folded M */}
      <rect x="16" y="24" width="14" height="52" rx="7" fill="#002B49" className="fill-[#002B49] dark:fill-[#00AEFF]" />
      <path
        d="M23 31L53 71C54.8 73.4 58.5 73.4 60.3 71L90 31"
        stroke="#0084C7"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#0084C7] dark:stroke-[#38BDF8]"
      />
      <rect x="70" y="24" width="14" height="52" rx="7" fill="#00AEFF" className="fill-[#0070BA] dark:fill-[#00C2FF]" />
    </svg>
  );
}

export function RakaLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="R/ Logo"
        className="w-full h-full object-contain invert dark:invert-0 transition-[filter] duration-200"
      />
    </div>
  );
}

export function getTechLogo(name: string, className = "w-5 h-5") {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes("midtrans")) return <MidtransLogo className={className} />;
  if (normalized.includes("react")) return <ReactLogo className={className} />;
  if (normalized.includes("next")) return <NextjsLogo className={className} />;
  if (normalized.includes("typescript") || normalized === "ts") return <TypescriptLogo className={className} />;
  if (normalized.includes("javascript") || normalized === "js") return <JavascriptLogo className={className} />;
  if (normalized.includes("tailwind")) return <TailwindLogo className={className} />;
  if (normalized.includes("laravel")) return <LaravelLogo className={className} />;
  if (normalized.includes("php")) return <PhpLogo className={className} />;
  if (normalized.includes("node")) return <NodejsLogo className={className} />;
  if (normalized.includes("express")) return <ExpressLogo className={className} />;
  if (normalized.includes("python")) return <PythonLogo className={className} />;
  if (normalized.includes("scikit")) return <ScikitlearnLogo className={className} />;
  if (normalized.includes("pandas")) return <PandasLogo className={className} />;
  if (normalized.includes("numpy")) return <NumpyLogo className={className} />;
  if (normalized.includes("postgres")) return <PostgresqlLogo className={className} />;
  if (normalized.includes("mysql")) return <MysqlLogo className={className} />;
  if (normalized.includes("redis")) return <RedisLogo className={className} />;
  if (normalized.includes("socket")) return <SocketdotioLogo className={className} />;
  if (normalized.includes("jwt") || normalized.includes("token")) return <JwtLogo className={className} />;
  if (normalized.includes("docker")) return <DockerLogo className={className} />;
  if (normalized.includes("git")) return <GitLogo className={className} />;
  if (normalized.includes("prisma")) return <PrismaLogo className={className} />;
  if (normalized.includes("html")) return <HtmlLogo className={className} />;
  if (normalized.includes("css")) return <CssLogo className={className} />;
  if (normalized.includes("rest") || normalized.includes("api")) return <RestApiLogo className={className} />;
  return null;
}

