// API Route Example - Placeholder for future API endpoints
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      message: 'NanoURL API',
      version: '1.0.0',
      status: 'operational',
      endpoints: {
        docs: '/api/docs',
        health: '/api/health',
        shorts: '/api/shorts'
      }
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}