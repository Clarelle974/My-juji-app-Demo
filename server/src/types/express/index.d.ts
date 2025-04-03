import type { JwtPayload } from "jsonwebtoken";

declare global {
  export type MyPayload = JwtPayload & { sub: string; user_role_id: number };

  namespace Express {
    export interface Request {
      auth: {
        name: string;
        isAdmin: boolean;
      };
      member: {
        role: string;
        id: number;
      };
      /* ************************************************************************* */
    }
  }
}
