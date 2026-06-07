export async function GET() {
  try {
    const res = await fetch(
      "https://github-contributions-api.deno.dev/lukaskourilcz.json",
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
