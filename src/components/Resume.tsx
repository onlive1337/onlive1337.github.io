"use client"
import { Download, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export default function Resume() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isHtml2pdfReady, setIsHtml2pdfReady] = useState(false);

    useEffect(() => {
        import('html2pdf.js').then(() => {
            setIsHtml2pdfReady(true);
        });
    }, []);

    const handleDownloadPDF = async () => {
        if (!resumeRef.current || !isHtml2pdfReady) return;

        setIsGenerating(true);

        try {
            const html2pdfModule = await import('html2pdf.js');
            const html2pdf = html2pdfModule.default || html2pdfModule;

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
                        disabled={isGenerating || !isHtml2pdfReady}
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
                    className="shadow-lg"
                    style={{
                        width: '210mm',
                        minHeight: '297mm',
                        margin: '0 auto',
                        backgroundColor: '#ffffff',
                        color: '#111827'
                    }}
                >
                    {/* Header */}
                    <div style={{ borderBottom: '4px solid #1f2937', padding: '2rem' }}>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                            Bobur Xamidov
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#4b5563' }}>
                            Front-End Developer
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', padding: '2rem' }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Personal Info */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Personal Info
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#374151' }}>
                                    <span style={{ fontSize: '0.875rem' }}>✉</span>
                                    <span style={{ wordBreak: 'break-all' }}>onswix@gmail.com</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Skills
                                </h2>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
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
                                            <tr key={skill.name}>
                                                <td style={{ paddingBottom: '8px', verticalAlign: 'top' }}>
                                                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                                                        {skill.name}
                                                    </div>
                                                    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '6px', position: 'relative' }}>
                                                        <div
                                                            style={{
                                                                backgroundColor: '#1f2937',
                                                                height: '6px',
                                                                borderRadius: '9999px',
                                                                width: `${skill.level}%`,
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Summary */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Summary
                                </h2>
                                <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: '1.625', textAlign: 'justify' }}>
                                    Dynamic Front-end Developer with over a year of experience in creating engaging and responsive web applications, dedicated to enhancing user experiences through innovative solutions. Proficiency in JavaScript and React, coupled with a strong focus on responsive design, enables the delivery of visually appealing and functional interfaces. Actively involved in open-source projects, demonstrating a commitment to collaborative development and continuous improvement. Eager to contribute to a creative team environment that values innovation and autonomy, while tackling complex challenges and advancing technical skills in impact projects.
                                </p>
                            </div>

                            {/* Work Experience */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Work Experience
                                </h2>

                                {/* Job 1 */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                                        Front-End Developer, IT Academy (Part-Time)
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                        August 2024 - August 2025
                                    </p>
                                    <div style={{ fontSize: '0.75rem', color: '#374151', marginLeft: '0.5rem' }}>
                                        <p style={{ marginBottom: '0.125rem' }}>• Created custom UI components and implemented layouts using HTML5, CSS3, and JavaScript.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Participated in code reviews, feature planning, and design reviews.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Developed front-end user interfaces for several complex web applications with HTML, CSS, and JavaScript.</p>
                                    </div>
                                </div>

                                {/* Job 2 */}
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                                        System Administrator, PROWEB
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                        August 2025 - February 2026
                                    </p>
                                    <div style={{ fontSize: '0.75rem', color: '#374151', marginLeft: '0.5rem' }}>
                                        <p style={{ marginBottom: '0.125rem' }}>• Experienced in implementing, configuring and troubleshooting a variety of hardware and software systems.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Provided 24/7 technical support for all computer systems and networks.</p>
                                        <p style={{ marginBottom: '0.125rem' }}>• Performed system patches and upgrades in a timely manner.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid #d1d5db' }}>
                                    Education
                                </h2>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                                        Bachelor, ITPU (Software Engineer)
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
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