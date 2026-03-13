/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { NextRequest } from 'next/server'

import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  REST_GET(req, context, { config })

export const POST = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  REST_POST(req, context, { config })

export const DELETE = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  REST_DELETE(req, context, { config })

export const PATCH = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  REST_PATCH(req, context, { config })
