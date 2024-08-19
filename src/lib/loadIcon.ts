export async function loadIcon(name: string) {
  const request = await fetch(`/assets/${name}.json`);
  const data = await request.json();
  return data;
}
