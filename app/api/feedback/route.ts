import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is present to avoid build errors
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(req: Request) {
    try {
        if (!resend) {
            console.error('Resend API key is missing');
            return NextResponse.json(
                { error: 'Server configuration error: Missing API Key' },
                { status: 500 }
            );
        }

        const { name, message } = await req.json();

        if (!name || !message) {
            return NextResponse.json(
                { error: 'Name and message are required' },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: 'Portfolio Feedback <onboarding@resend.dev>',
            to: ['radhakrishnamaradana22@gmail.com'],
            subject: `New Feedback from ${name}`,
            text: `Name: ${name}\n\nMessage:\n${message}`,
        });

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Feedback API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
