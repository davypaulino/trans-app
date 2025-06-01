// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const response = await fetch("http://localhost:3001/users/1", { credentials: "include" });
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to fetch user data");
//     }

//     res.status(200).json(data);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }
