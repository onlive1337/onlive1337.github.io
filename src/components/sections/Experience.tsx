"use client";
import { memo } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Ripple } from "@/components/ui/Ripple";

const jobs = [
    {
        title: "System Administrator",
        company: "PROWEB",
        type: "Full-Time",
        period: "August 2025 — February 2026",
        nodeColor: "bg-md-primary",
        badgeStyle: "bg-md-primary-container text-md-on-primary-container",
    },
    {
        title: "Front-End Developer",
        company: "IT Academy",
        type: "Part-Time",
        period: "August 2024 — August 2025",
        nodeColor: "bg-md-secondary",
        badgeStyle: "bg-md-secondary-container text-md-on-secondary-container",
    },
];

const education = {
    title: "Bachelor, Software Engineer",
    place: "ITPU",
    period: "September 2025 — 2029",
    badgeStyle: "bg-md-tertiary-container text-md-on-tertiary-container",
};

export const Experience = memo(function Experience() {
    return (
        <section id="experience" className="py-16 scroll-mt-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight font-display text-md-on-background">
                    Experience
                </h2>

                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Work Experience */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-lg font-bold font-display text-md-on-background">
                            <span className="p-2 rounded-xl bg-md-primary/10 text-md-primary">
                                <Briefcase className="w-5 h-5" />
                            </span>
                            Work Experience
                        </h3>

                        <div className="relative">
                            {/* M3 styled timeline line */}
                            <div className="absolute left-4.5 sm:left-6.5 top-2 bottom-2 w-[2px] bg-md-outline-variant/30" />

                            <div className="flex flex-col gap-6">
                                {jobs.map((job, index) => (
                                    <div key={index} className="relative pl-12 sm:pl-16">
                                        {/* Dynamic color M3 node marker */}
                                        <div
                                            className={`absolute left-3 sm:left-5 top-7 w-3.5 h-3.5 rounded-full ${job.nodeColor} ring-4 ring-md-background z-10 shadow-sm`}
                                        />

                                        <div className="rounded-[28px] border border-md-outline-variant/30 bg-md-surface-container-low p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 relative overflow-hidden select-none">
                                            <Ripple />
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5">
                                                <div className="space-y-1">
                                                    <h4 className="text-lg font-bold font-display text-md-on-surface">
                                                        {job.title}
                                                    </h4>
                                                    <div className="flex items-center flex-wrap gap-2 text-xs">
                                                        <span className="font-semibold text-md-primary">
                                                            {job.company}
                                                        </span>
                                                        {job.type && (
                                                            <span className={`px-2 py-0.5 rounded-full font-semibold ${job.badgeStyle}`}>
                                                                {job.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-md-on-surface-variant font-medium shrink-0">
                                                    <Calendar className="w-3.5 h-3.5 text-md-primary" />
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
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-lg font-bold font-display text-md-on-background">
                            <span className="p-2 rounded-xl bg-md-secondary/10 text-md-secondary">
                                <GraduationCap className="w-5 h-5" />
                            </span>
                            Education
                        </h3>

                        <div className="rounded-[28px] border border-md-outline-variant/30 bg-md-surface-container-low p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 relative overflow-hidden select-none">
                            <Ripple />
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5">
                                <div className="space-y-1">
                                    <h4 className="text-lg font-bold font-display text-md-on-surface">
                                        {education.title}
                                    </h4>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${education.badgeStyle}`}>
                                        {education.place}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-md-on-surface-variant font-medium shrink-0">
                                    <Calendar className="w-3.5 h-3.5 text-md-secondary" />
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
