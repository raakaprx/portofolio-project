import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { path = "/" } = await request.json().catch(() => ({ path: "/" }));
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}
