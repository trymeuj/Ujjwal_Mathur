export const PRIVATE_ACCESS_COOKIE = "ujjwal-private-access";

export function privateAccessToken() {
  return process.env.SITE_ACCESS_TOKEN ?? "";
}
