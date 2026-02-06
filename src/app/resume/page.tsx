import type { Metadata } from 'next';
import Resume from '@/components/Resume';

export const metadata: Metadata = {
    title: "Bobur Xamidov - Resume",
    description: "Front-End Developer Resume",
};

export default function ResumePage() {
    return <Resume />;
}