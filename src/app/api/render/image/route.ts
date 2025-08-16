import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { org_id, avatar_id, prompt, seed, guidance } = body

    // Mock response - replace with actual API integration
    const mockResponse = {
      job_id: `img_${Date.now()}`,
      status: 'queued',
      estimated_time: 30,
      cost: 0.04,
      prompt,
      seed: seed || Math.floor(Math.random() * 1000000),
      guidance: guidance || 7.5,
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process image generation request' },
      { status: 500 }
    )
  }
}