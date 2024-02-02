import { ActionData, Subscription } from 'apps/kanji.sh/src/subscription/Types';
import { NextRequest, NextResponse } from 'next/server';
import invariant from 'tiny-invariant';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        console.log('[Start] Read Request');
        const formData = await request.formData();
        console.log('[End] Read Request');

        const name = formData.get('name');
        invariant(typeof name === 'string', 'First Name must be a string');
        if (name.trim().length === 0) {
            return NextResponse.json<ActionData>(
                {
                    status: 'error',
                    errors: { name: 'Please input your name. (or nickname) 😄' }
                },
                { status: 400 }
            );
        }

        const email = formData.get('email');
        invariant(typeof email === 'string', 'Email must be a string');
        if (!email || email.trim().length === 0) {
            return NextResponse.json<ActionData>(
                { status: 'error', errors: { email: 'Please input your email. 🥹' } },
                { status: 400 }
            );
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return NextResponse.json<ActionData>(
                { status: 'error', errors: { email: 'Valid email, please. 🙏🏻' } },
                { status: 400 }
            );
        }

        console.log('[Start] Function Subscribe');
        await addContact({ name, email });
        return NextResponse.json<ActionData>({ status: 'success' }, { status: 201 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('[Error] Function Subscribe');
        console.log(JSON.stringify(error, null, 3));
        if ('message' in error) {
            return NextResponse.json<ActionData>(
                { status: 'error', formError: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json<ActionData>(
            { status: 'error', formError: 'Unknown error occurred.' },
            { status: 500 }
        );
    }
}

const addContact = async ({ name, email }: Subscription): Promise<void> => {
    const groupId = process.env.GROUP_ID as string;
    const apiToken = process.env.API_TOKEN as string;
    console.log('[Start] Add subscriber to group');
    const response = await fetch(`https://connect.mailerlite.com/api/subscribers/`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-MailerLite-ApiKey': apiToken
        }),
        body: JSON.stringify({ email, fields: { name }, groups: [groupId] })
    });
    switch (response.status) {
        case 200:
        case 201: {
            console.log(
                `[End] API Call: API called successfully. Returned data: ${JSON.stringify(
                    response,
                    null,
                    3
                )}`
            );
            return;
        }
        case 422: {
            throw new Error('Error subscribing : Invalid input');
        }
        default: {
            throw new Error(`Error subscribing : ${response.status}`);
        }
    }
};
