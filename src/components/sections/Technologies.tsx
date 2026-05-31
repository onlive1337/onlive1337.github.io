"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Ripple } from "@/components/ui/Ripple";

const technologies = {
  languages: {
    items: ["TypeScript", "JavaScript", "Python"],
    chipStyle: "bg-md-primary-container text-md-on-primary-container border-md-primary/10",
  },
  frontend: {
    items: ["React", "Next.js", "TailwindCSS", "Redux"],
    chipStyle: "bg-md-secondary-container text-md-on-secondary-container border-md-secondary/10",
  },
  backend: {
    items: ["Node.js", "Express", "FastAPI"],
    chipStyle: "bg-md-tertiary-container text-md-on-tertiary-container border-md-tertiary/10",
  },
  databases: {
    items: ["PostgreSQL", "MongoDB"],
    chipStyle: "bg-md-primary-container/80 text-md-on-primary-container border-md-primary/10",
  },
  tools: {
    items: ["Git", "Docker", "VS Code", "Figma"],
    chipStyle: "bg-md-surface-variant text-md-on-surface-variant border-md-outline-variant/30",
  }
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

export const Technologies = memo(function Technologies() {
  return (
    <section id="technologies" className="py-16 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="mb-10 text-center type-headline text-md-on-background">
          Technologies
        </h2>
        
        <motion.div 
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {Object.entries(technologies).map(([category, { items, chipStyle }]) => (
            <motion.div
              key={category}
              variants={cardVariants}
              className="rounded-m3-xl hover:rounded-m3-2xl border border-md-outline-variant/30 bg-md-surface-container p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] shape-morph relative overflow-hidden select-none"
            >
              <Ripple />
              <h3 className="mb-5 text-lg type-title capitalize text-md-on-surface">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {items.map((name) => (
                  <span
                    key={name}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold select-none shadow-sm transition-all duration-200 hover:brightness-95 dark:hover:brightness-110 active:scale-95 ${chipStyle}`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
