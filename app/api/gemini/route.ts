// app/api/gemini/route.ts
import { NextResponse } from 'next/server';
import GeminiAiServer from '@/app/gemini/GeminiAiServer';
import { SearchInputType } from '@/app/gemini/GeminiAiClient';

export async function POST(request: Request) {
  const data: SearchInputType = await request.json();
  const result = await GeminiAiServer(data);
  return NextResponse.json(result);
}