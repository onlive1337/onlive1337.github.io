"use client";
import { memo } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Ripple } from "@/components/ui/Ripple";

const jobs = [
    {
        title: "Customer Tech Support Engineer",
        company: "Uzum Bank",
        type: "Full-Time",
        period: "July 2026 — Present",
        iconStyle: "bg-md-tertiary-container text-md-on-tertiary-container",
        badgeStyle: "bg-md-tertiary-container text-md-on-tertiary-container",
    },
    {
        title: "System Administrator",
        company: "PROWEB",
        type: "Full-Time",
        period: "August 2025 — February 2026",
        iconStyle: "bg-md-primary-container text-md-on-primary-container",
        badgeStyle: "bg-md-primary-container text-md-on-primary-container",
    },
    {
        title: "Front-End Developer",
        company: "IT Academy",
        type: "Part-Time",
        period: "August 2024 — August 2025",
        iconStyle: "bg-md-secondary-container text-md-on-secondary-container",
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
        <section id="experience" className="py-12 scroll-mt-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="mb-8 text-center type-headline text-md-on-background">
                    Experience
                </h2>

                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Work Experience — Android 16 Segmented List */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5 px-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-md-primary-container text-md-on-primary-container">
                                <Briefcase className="w-4 h-4" />
                            </span>
                            <h3 className="text-base type-title text-md-on-background">
                                Work Experience
                            </h3>
                        </div>

                        <div className="flex flex-col gap-1">
                            {jobs.map((job) => (
                                <div
                                    key={`${job.company}-${job.title}`}
                                    className="group m3-segmented-item bg-md-surface-container hover:bg-md-surface-container-high p-5 sm:p-6 relative overflow-hidden select-none"
                                >
                                    <Ripple />
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="space-y-1.5">
                                            <h4 className="text-base sm:text-lg type-title text-md-on-surface group-hover:text-md-primary">
                                                {job.title}
                                            </h4>
                                            <div className="flex items-center flex-wrap gap-2 text-xs">
                                                <span className="font-bold text-md-on-surface-variant">
                                                    {job.company}
                                                </span>
                                                {job.type && (
                                                    <span className={`px-2.5 py-0.5 rounded-full font-semibold ${job.badgeStyle}`}>
                                                        {job.type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 text-xs bg-md-surface-container-highest text-md-on-surface-variant px-3 py-1.5 rounded-full font-medium shrink-0 self-start sm:self-center">
                                            <Calendar className="w-3.5 h-3.5 text-md-primary" />
                                            {job.period}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5 px-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-md-secondary-container text-md-on-secondary-container">
                                <GraduationCap className="w-4 h-4" />
                            </span>
                            <h3 className="text-base type-title text-md-on-background">
                                Education
                            </h3>
                        </div>

                        <div className="group rounded-m3-xl hover:rounded-m3-2xl active:rounded-m3-lg bg-md-surface-container hover:bg-md-surface-container-high p-5 sm:p-6 shape-morph relative overflow-hidden select-none">
                            <Ripple />
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="space-y-1.5">
                                    <h4 className="text-base sm:text-lg type-title text-md-on-surface group-hover:text-md-secondary">
                                        {education.title}
                                    </h4>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${education.badgeStyle}`}>
                                        {education.place}
                                    </span>
                                </div>
                                <div className="inline-flex items-center gap-1.5 text-xs bg-md-surface-container-highest text-md-on-surface-variant px-3 py-1.5 rounded-full font-medium shrink-0 self-start sm:self-center">
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