'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {Environments} from "@/app/_lib/environments";

export default function Page() {
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${Environments.Resources.Auth.Host}/users/1`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
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
          <p>Nome: {user["nickname"]}</p>
          <p>Email: {user["email"]}</p>
          <img src={user["avatar_url"]} alt="Avatar" width={100} />
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}
