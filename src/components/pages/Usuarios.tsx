import { useEffect, useState } from "react";
import { getUsuarios } from "../../lib/api";

interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

export function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsuarios()
      .then(data => setUsuarios(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nombre} — {u.rol}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosPage;
