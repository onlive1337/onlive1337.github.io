"use client";
import { useEffect, useRef, useState, memo } from 'react';

const technologies = {
  languages: [
    { name: "TypeScript", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { name: "JavaScript", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    { name: "Python", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
  ],
  frontend: [
    { name: "React", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300" },
    { name: "Next.js", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
    { name: "TailwindCSS", color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300" },
    { name: "Redux", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" }
  ],
  backend: [
    { name: "Node.js", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
    { name: "Express", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
    { name: "FastAPI", color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
  ],
  databases: [
    { name: "PostgreSQL", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { name: "MongoDB", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  ],
  tools: [
    { name: "Git", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
    { name: "Docker", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { name: "VS Code", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { name: "Figma", color: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300" }
  ]
};

export const Technologies = memo(function Technologies() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoaded]);

  if (!isLoaded) {
    return <div className="h-96 opacity-0" />;
  }

  return (
    <section
      ref={ref}
      id="technologies"
      className="py-16 mt-32 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Technologies
        </h2>
        <div className="grid gap-6 grid-cols-1">
          {Object.entries(technologies).map(([category, items]) => (
            <div
              key={category}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-black/40 dark:hover:bg-black/60"
            >
              <h3 className="mb-4 text-xl font-semibold capitalize text-gray-900 dark:text-white">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item.name}
                    className={`rounded px-3 py-1 text-sm font-medium ${item.color}`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
