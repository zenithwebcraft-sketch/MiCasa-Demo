import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  // ── Verificar secret ─────────────────────────────────────
  const cronSecret = req.headers['x-cron-secret'] || req.query.secret;
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return res.status(500).json({ error: 'Missing Google credentials' });
  }

  try {
    // ── 1. Refrescar el access token ──────────────────────
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type:    'refresh_token',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(`Token refresh failed: ${tokenData.error_description}`);
    }

    console.log('✅ Access token refreshed successfully');

    // ── 2. Si Google devuelve un nuevo refresh token, actualizar Vercel ──
    const newRefreshToken = tokenData.refresh_token;

    if (newRefreshToken && newRefreshToken !== refreshToken) {
      console.log('🔄 New refresh token received, updating Vercel...');
      await updateVercelEnv('GOOGLE_REFRESH_TOKEN', newRefreshToken);
      console.log('✅ Vercel ENV updated');
    } else {
      console.log('ℹ️ No new refresh token, nothing to update');
    }

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      newTokenReceived: !!newRefreshToken,
      expiresIn: tokenData.expires_in,
    });

  } catch (error: any) {
    console.error('❌ Token refresh error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// ── Helper: Actualizar ENV en Vercel ─────────────────────────
async function updateVercelEnv(key: string, value: string) {
  const projectId = process.env.VERCEL_PROJECT_ID;
  const token     = process.env.VERCEL_TOKEN;
  const teamId    = process.env.VERCEL_TEAM_ID;

  if (!projectId || !token) {
    console.warn('⚠️ Missing VERCEL_TOKEN or VERCEL_PROJECT_ID');
    return;
  }

  // Obtener lista de ENV vars
  const listResponse = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env?teamId=${teamId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const listData = await listResponse.json();
  const envVar = listData.envs?.find((e: any) => e.key === key);

  if (!envVar) {
    console.warn(`⚠️ ENV var ${key} not found in Vercel`);
    return;
  }

  // Actualizar el valor
  const updateResponse = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env/${envVar.id}?teamId=${teamId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    }
  );

  if (!updateResponse.ok) {
    const err = await updateResponse.json();
    throw new Error(`Failed to update Vercel ENV: ${JSON.stringify(err)}`);
  }
}
