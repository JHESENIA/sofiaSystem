export async function getUsuarios() {
  const res = await fetch("http://127.0.0.1:8000/api/usuarios/", {
    credentials: "include", // si luego usas cookies
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}
