import { NextApiRequest, NextApiResponse } from 'next';

const SibApiV3Sdk = require('sib-api-v3-typescript');

interface Subscription {
    firstName: string;
    lastName: string;
    email: string;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    console.log('[Start] Function Subscribe');
    if (request.method === 'POST') {
        try {
            console.log('[Start] Read Request');
            const subscriptionData: Subscription = request.body;
            console.log('[End] Read Request');
            await addContact(subscriptionData);
            response.status(200).json({ status: 'Success' });
        } catch (error: any) {
            response.status(500).json({ status: JSON.stringify(error) });
        }
    } else {
        response.status(405).json({ status: 'Method Not allowed' });
    }
}

async function addContact({ firstName, lastName, email }: Subscription) {
    console.log('[Start] Add Contact');
    let apiInstance = new SibApiV3Sdk.ContactsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.SIB_API_KEY;

    let newContact = new SibApiV3Sdk.CreateContact();
    newContact.email = email;
    newContact.attributes = { FIRSTNAME: firstName, LASTNAME: lastName };
    newContact.listIds = [3];
    newContact.updateEnabled = true;

    console.log('[Start] SIB API Call');
    const response = await apiInstance.createContact(newContact);
    console.log(
        '[End] SIB API Call: API called successfully. Returned data: ' +
            JSON.stringify(response.response)
    );
    console.log('[End] Add Contact');
}
