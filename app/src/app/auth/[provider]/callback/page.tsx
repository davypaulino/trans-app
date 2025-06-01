'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/1/?code=${code}&state=${state}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-center">
      <h1>Olá auth</h1>
      {user ? (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.avatarUrl} alt="Avatar" width={100} />
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}
