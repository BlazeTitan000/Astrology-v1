import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error('VITE_API_URL environment variable is not defined');
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const response = await axios.post(
            `${API_URL}/backendApi/generate-astrology-report`,
            req.body
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).json({ message: 'Error generating astrology report' });
    }
} 