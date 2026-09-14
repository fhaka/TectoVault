import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/content/projects";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HomeWork() {
  const featured = projects.slice(0, 4);

  return (
    <Section tone="muted" id="work">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          description="A look at the kind of products we build."
        />
        <Button asChild variant="outline">
          <Link href="/work">
            View all work <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <div>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.name} — screenshot`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <ProjectPlaceholderArt seed={i} />
                )}
                {project.isPlaceholder ? (
                  <Badge variant="outline" className="absolute left-4 top-4 bg-background/90 backdrop-blur">
                    Sample project
                  </Badge>
                ) : null}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.industry}</p>
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    aria-label={`Visit ${project.name}`}
                  >
                    Visit site <ArrowUpRight className="size-4" />
                  </a>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectPlaceholderArt({ seed }: { seed: number }) {
  const hues = [222, 260, 200, 280];
  const hue = hues[seed % hues.length];
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 60% 12%), hsl(${hue} 70% 22%))`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${seed}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>
    </div>
  );
}
