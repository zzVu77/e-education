/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
const RAG_SERVICE_URL =
  process.env.NEXT_PUBLIC_RAG_SERVICE_URL || "http://localhost:8001";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resp = await fetch(`${RAG_SERVICE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    if (!resp.ok) {
      return NextResponse.json(
        { error: data?.detail || "RAG chat failed" },
        { status: resp.status },
      );
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
