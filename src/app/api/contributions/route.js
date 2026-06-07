// Cache the upstream contributions for an hour instead of hitting it on
// every request — the data only changes daily.
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      "https://github-contributions-api.deno.dev/lukaskourilcz.json",
      { next: { revalidate: 3600 } }
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
