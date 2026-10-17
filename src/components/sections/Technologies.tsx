"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import { Ripple } from "@/components/ui/Ripple";

const technologies = {
  languages: {
    items: ["TypeScript", "JavaScript", "Python"],
    icon: Code2,
    iconStyle: "bg-md-primary-container text-md-on-primary-container",
    chipStyle: "bg-md-primary-container text-md-on-primary-container",
  },
  frontend: {
    items: ["React", "Next.js", "TailwindCSS", "Redux"],
    icon: Layout,
    iconStyle: "bg-md-secondary-container text-md-on-secondary-container",
    chipStyle: "bg-md-secondary-container text-md-on-secondary-container",
  },
  backend: {
    items: ["Node.js", "Express", "FastAPI"],
    icon: Server,
    iconStyle: "bg-md-tertiary-container text-md-on-tertiary-container",
    chipStyle: "bg-md-tertiary-container text-md-on-tertiary-container",
  },
  databases: {
    items: ["PostgreSQL", "MongoDB"],
    icon: Database,
    iconStyle: "bg-md-primary-container text-md-on-primary-container",
    chipStyle: "bg-md-surface-container-highest text-md-on-surface",
  },
  tools: {
    items: ["Git", "Docker", "VS Code", "Figma"],
    icon: Wrench,
    iconStyle: "bg-md-secondary-container text-md-on-secondary-container",
    chipStyle: "bg-md-surface-container-highest text-md-on-surface",
  }
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 75, damping: 20, mass: 1 }
  }
};

export const Technologies = memo(function Technologies() {
  return (
    <section id="technologies" className="py-12 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="mb-8 text-center type-headline text-md-on-background">
          Technologies
        </h2>
        
        <motion.div 
          className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {Object.entries(technologies).map(([category, { items, icon: Icon, iconStyle, chipStyle }]) => (
            <motion.div
              key={category}
              variants={cardVariants}
              className="group rounded-m3-xl hover:rounded-m3-2xl active:rounded-m3-lg bg-md-surface-container hover:bg-md-surface-container-high p-5 shape-morph relative overflow-hidden select-none"
            >
              <Ripple />
              <div className="flex items-center gap-3 mb-4">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl group-hover:rounded-[20px] shape-morph ${iconStyle}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-base type-title capitalize text-md-on-surface">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((name) => (
                  <span
                    key={name}
                    className={`rounded-m3-sm hover:rounded-m3-md px-3.5 py-1.5 text-xs font-semibold select-none shape-morph active:scale-95 ${chipStyle}`}
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
