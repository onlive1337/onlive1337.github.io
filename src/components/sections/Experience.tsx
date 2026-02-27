"use client";
import { memo } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const jobs = [
    {
        title: "System Administrator",
        company: "PROWEB",
        type: "Full-Time",
        period: "August 2025 — February 2026",
        color: "bg-emerald-500",
    },
    {
        title: "Front-End Developer",
        company: "IT Academy",
        type: "Part-Time",
        period: "August 2024 — August 2025",
        color: "bg-blue-500",
    },
];

const education = {
    title: "Bachelor, Software Engineer",
    place: "ITPU",
    period: "September 2025 — 2029",
};

export const Experience = memo(function Experience() {
    return (
        <section id="experience" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    Experience
                </h2>

                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Work Experience */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
                            <Briefcase className="w-5 h-5" />
                            Work
                        </h3>

                        <div className="relative">
                            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

                            <div className="flex flex-col gap-6">
                                {jobs.map((job, index) => (
                                    <div key={index} className="relative pl-12 sm:pl-16">
                                        <div
                                            className={`absolute left-2.5 sm:left-4.5 top-6 w-3 h-3 rounded-full ${job.color} ring-4 ring-white dark:ring-black z-10`}
                                        />

                                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-black/40 dark:hover:bg-black/60">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {job.title}
                                                    </h4>
                                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                        {job.company}
                                                        {job.type && (
                                                            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                                                                · {job.type}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {job.period}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-6">
                            <GraduationCap className="w-5 h-5" />
                            Education
                        </h3>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-black/40 dark:hover:bg-black/60">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {education.title}
                                    </h4>
                                    <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                                        {education.place}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {education.period}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
