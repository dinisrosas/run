import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, request }) => {
  console.log(request.headers);

  const response = await fetch("/api/geo");
  const geo = await response.json();
  return { geo };
};
