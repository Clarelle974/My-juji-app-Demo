import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Belt = {
  id: number;
  name: string;
  rank_order: number;
  program_description: string;
};

class BeltRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from belt");
    return rows as Belt[];
  }
}
export default new BeltRepository();
