import { NextRequest, NextResponse } from "next/server";
import { suggestionCoursesData } from "../../../../constants/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId query parameter" },
      { status: 400 },
    );
  }

  return NextResponse.json(suggestionCoursesData);
}
