import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Return headers as JSON
  return { headers };
};
