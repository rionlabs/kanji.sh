import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from './firebaseAdmin';
import axios from 'axios';

const EMPTY_PDF_URL = 'http://localhost:3000/assets/files/empty.pdf';

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    console.log('[Start] Function Download');

    if (request.method !== 'GET') {
        response.status(405).json({ status: 'Method Not allowed' });
        return;
    }

    try {
        console.log('[Start] Read Request');
        const filePath = request.query['path'] as string;
        const fileName = request.query['name'] as string;
        console.log('[End] Read Request');
        console.log(`File path for download: path(${filePath}), name(${fileName})`);

        const fileUrl = await getDownloadURL(filePath);

        if (!fileUrl) {
            // Return Response
            console.log('[ERR] Could not get download URL');
            response.status(500).json({ status: 'Server Error: Cannot find file.' });
            return;
        }

        const mimetype = 'application/pdf';
        response.setHeader('Content-disposition', `attachment; filename=${fileName} Worksheet.pdf`);
        response.setHeader('Content-type', mimetype);
        response.setHeader('Cache-Control', '"public, max-age=21600, stale-while-revalidate"');
        response.flushHeaders();

        const fileResponse = await axios({
            method: 'get',
            url: fileUrl,
            responseType: 'stream'
        });

        fileResponse.data.pipe(response);
    } catch (error: unknown) {
        response.status(500).json({ status: JSON.stringify(error) });
    }
};

const getDownloadURL: (filePath: string) => Promise<string | undefined> = async (filePath) => {
    if (process.env.NODE_ENV !== 'production') {
        // Send local file URL for development
        return EMPTY_PDF_URL;
    }

    // Get Download URL from Firebase Storage
    // TODO remove forward slash (/) from filePath[0]
    try {
        const signedUrls = await firebaseAdmin
            .storage()
            .bucket()
            .file(filePath)
            .getSignedUrl({
                action: 'read',
                expires: new Date(new Date().getTime() + 3600 * 1000)
            });
        return signedUrls[0];
    } catch (error) {
        console.error(error);
        await Promise.reject(error);
    }
};
