import cors from 'cors';

export function enableCORS(app: any) {
    const corsOpt = {
        origin: process.env.CORS_ALLOW_ORIGIN,
        methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    app.use(cors(corsOpt));
    app.options('*', cors(corsOpt));
}