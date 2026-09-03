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
  SiPython,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";

export function Github({ className = "w-5 h-5", ...props }: React.ComponentProps<typeof SiGithub>) {
  return <SiGithub className={className} {...props} />;
}

export function Linkedin({ className = "w-5 h-5", ...props }: React.ComponentProps<typeof FaLinkedin>) {
  return <FaLinkedin className={`${className} text-[#0A66C2]`} {...props} />;
}

export function ReactLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiReact>) {
  return <SiReact className={`${className} text-[#61DAFB]`} {...props} />;
}

export function NextjsLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiNextdotjs>) {
  return <SiNextdotjs className={`${className} text-white`} {...props} />;
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

export function PythonLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPython>) {
  return <SiPython className={`${className} text-[#3776AB]`} {...props} />;
}

export function PostgresqlLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPostgresql>) {
  return <SiPostgresql className={`${className} text-[#4169E1]`} {...props} />;
}

export function MysqlLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiMysql>) {
  return <SiMysql className={`${className} text-[#4479A1]`} {...props} />;
}

export function DockerLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiDocker>) {
  return <SiDocker className={`${className} text-[#2496ED]`} {...props} />;
}

export function GitLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiGit>) {
  return <SiGit className={`${className} text-[#F05032]`} {...props} />;
}

export function PrismaLogo({ className = "w-7 h-7", ...props }: React.ComponentProps<typeof SiPrisma>) {
  return <SiPrisma className={`${className} text-white`} {...props} />;
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

export function getTechLogo(name: string, className = "w-5 h-5") {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes("react")) return <ReactLogo className={className} />;
  if (normalized.includes("next")) return <NextjsLogo className={className} />;
  if (normalized.includes("typescript") || normalized === "ts") return <TypescriptLogo className={className} />;
  if (normalized.includes("javascript") || normalized === "js") return <JavascriptLogo className={className} />;
  if (normalized.includes("tailwind")) return <TailwindLogo className={className} />;
  if (normalized.includes("laravel")) return <LaravelLogo className={className} />;
  if (normalized.includes("php")) return <PhpLogo className={className} />;
  if (normalized.includes("node")) return <NodejsLogo className={className} />;
  if (normalized.includes("express")) return <NodejsLogo className={className} />;
  if (normalized.includes("python")) return <PythonLogo className={className} />;
  if (normalized.includes("postgres")) return <PostgresqlLogo className={className} />;
  if (normalized.includes("mysql")) return <MysqlLogo className={className} />;
  if (normalized.includes("docker")) return <DockerLogo className={className} />;
  if (normalized.includes("git")) return <GitLogo className={className} />;
  if (normalized.includes("prisma")) return <PrismaLogo className={className} />;
  if (normalized.includes("html")) return <HtmlLogo className={className} />;
  if (normalized.includes("css")) return <CssLogo className={className} />;
  if (normalized.includes("rest") || normalized.includes("api")) return <RestApiLogo className={className} />;
  return null;
}
