/**
 * @fileoverview Health check API endpoint
 * @module app/api/health/route
 */

import { NextResponse } from 'next/server'

/**
 * Health check endpoint to verify API availability
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} JSON response with service status and timestamp
 * @description Returns service health information including status, timestamp, and service name
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    service: 'magic-banner-api',
  })
}
