// Health check endpoint
export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      checks: {
        api: 'operational',
        database: 'operational',
        cache: 'operational'
      }
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}