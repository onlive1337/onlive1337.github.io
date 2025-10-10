"use client"
import { Download, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export default function Resume() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [html2pdf, setHtml2pdf] = useState<typeof import('html2pdf.js').default | null>(null);

    useEffect(() => {
        import('html2pdf.js').then((module) => {
            setHtml2pdf(() => module.default);
        });
    }, []);

    const handleDownloadPDF = async () => {
        if (!resumeRef.current || !html2pdf) return;

        setIsGenerating(true);

        try {
            const element = resumeRef.current;

            const opt = {
                margin: 10,
                filename: 'Bobur_Xamidov_Resume.pdf',
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: 'mm' as const,
                    format: 'a4' as const,
                    orientation: 'portrait' as const
                }
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Actions */}
                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Portfolio</span>
                    </Link>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating || !html2pdf}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                <span>Download PDF</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Resume Content */}
                <div
                    ref={resumeRef}
                    className="bg-white shadow-lg"
                    style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}
                >
                    {/* Header */}
                    <div className="border-b-4 border-gray-800 p-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Bobur Xamidov
                        </h1>
                        <p className="text-xl text-gray-600">
                            Front-End Developer
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 p-8">
                        {/* Left Column */}
                        <div className="col-span-1 space-y-6">
                            {/* Personal Info */}
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                    Personal Info
                                </h2>
                                <div className="flex items-start gap-2 text-xs text-gray-700">
                                    <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                    <span className="break-all">onswix@gmail.com</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                    Skills
                                </h2>
                                <div className="space-y-2.5">
                                    {[
                                        { name: 'HTML/CSS', level: 90 },
                                        { name: 'React/Vue', level: 75 },
                                        { name: 'Bootstrap', level: 80 },
                                        { name: 'Git/GitHub', level: 85 },
                                        { name: 'JavaScript', level: 70 },
                                        { name: 'Web Optimization', level: 85 },
                                        { name: 'Responsive Design', level: 80 },
                                        { name: 'Teamwork', level: 70 },
                                        { name: 'Cross-Browser', level: 85 },
                                        { name: 'TypeScript', level: 40 },
                                    ].map((skill) => (
                                        <div key={skill.name}>
                                            <div className="text-xs font-medium text-gray-700 mb-1">
                                                {skill.name}
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className="bg-gray-800 h-1.5 rounded-full"
                                                    style={{ width: `${skill.level}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-span-2 space-y-6">
                            {/* Summary */}
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                    Summary
                                </h2>
                                <p className="text-xs text-gray-700 leading-relaxed text-justify">
                                    Dynamic Front-end Developer with over a year of experience in creating engaging and responsive web applications, dedicated to enhancing user experiences through innovative solutions. Proficiency in JavaScript and React, coupled with a strong focus on responsive design, enables the delivery of visually appealing and functional interfaces. Actively involved in open-source projects, demonstrating a commitment to collaborative development and continuous improvement. Eager to contribute to a creative team environment that values innovation and autonomy, while tackling complex challenges and advancing technical skills in impact projects.
                                </p>
                            </div>

                            {/* Work Experience */}
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                    Work Experience
                                </h2>

                                {/* Job 1 */}
                                <div className="mb-4">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Front-End Developer, IT Academy (Part-Time)
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        August 2024 - August 2025
                                    </p>
                                    <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-700 ml-2">
                                        <li>Created custom UI components and implemented layouts using HTML5, CSS3, and JavaScript.</li>
                                        <li>Participated in code reviews, feature planning, and design reviews.</li>
                                        <li>Developed front-end user interfaces for several complex web applications with HTML, CSS, and JavaScript.</li>
                                    </ul>
                                </div>

                                {/* Job 2 */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        System Administrator, PROWEB
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                        August 2025 - Present
                                    </p>
                                    <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-700 ml-2">
                                        <li>Experienced in implementing, configuring and troubleshooting a variety of hardware and software systems.</li>
                                        <li>Provided 24/7 technical support for all computer systems and networks.</li>
                                        <li>Performed system patches and upgrades in a timely manner.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">
                                    Education
                                </h2>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Bachelor, ITPU (Software Engineer)
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        September 2025 - Present
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}