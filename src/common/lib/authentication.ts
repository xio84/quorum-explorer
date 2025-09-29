import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

export default async function apiAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authStatus = process.env.DISABLE_AUTH;
  
  // If authentication is disabled, always return true
  if (authStatus === "true") {
    return true;
  }
  
  try {
    const session = await getSession({ req });
    if (!session) {
      /// Not Signed in
      res.status(401).end();
      return false;
    } else {
      return true;
    }
  } catch (error) {
    // If there's an error with NextAuth (like CLIENT_FETCH_ERROR), 
    // and auth is not explicitly disabled, still allow access
    console.warn("NextAuth error, allowing access:", error);
    return true;
  }
}
