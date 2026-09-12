import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData();

    // Accept whichever field name the frontend sends
    const uploaded =
      incoming.get("file") ||
      incoming.get("audio") ||
      incoming.get("recording");

    if (!(uploaded instanceof File)) {
      return NextResponse.json(
        { error: "No audio file received." },
        { status: 400 }
      );
    }

    // FastAPI expects the field name to be "file"
    const backendForm = new FormData();
    backendForm.append("file", uploaded, uploaded.name);

    const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/analyze-clip`,
  {
    method: "POST",
    body: backendForm,
  }
);

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    // Send exactly what page.tsx expects
    return NextResponse.json({
      prediction: result.prediction,
      confidence: result.confidence,
      filename: result.filename,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Cannot connect to backend." },
      { status: 500 }
    );
  }
}