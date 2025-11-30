import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
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
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
