import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type KodokanKata = {
  id: number;
  rank_order: number;
  defense: string;
  technique_id: number;
  belt_id: number;
};

class KodokanKataRepository {
  //   The C of CRUD - Create operation

  async create(kata: Omit<KodokanKata, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into kodokan_kata (rank_order, defense, technique_id, belt_id) values (?, ?, ?, ?)",
      [kata.rank_order, kata.defense, kata.technique_id, kata.belt_id],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `select kodokan_kata.*, 
    technique.name as technique_name,
    technique.signification AS technique_signification
    from kodokan_kata
    join technique on kodokan_kata.technique_id = technique.id 
    where kodokan_kata.id = ?`,
      [id],
    );

    return rows[0] as KodokanKata;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `select kodokan_kata.*, 
    technique.name as technique_name,
    technique.signification AS technique_signification
    from kodokan_kata
    join technique on kodokan_kata.technique_id = technique.id`,
    );
    return rows as KodokanKata[];
  }

  async readByBelt(rank_order_query: string | string[]) {
    const [rows] = await databaseClient.query<Rows>(
      `select kodokan_kata.*,
    technique.name as technique_name,
    technique.signification AS technique_signification
    from kodokan_kata
    join technique on kodokan_kata.technique_id = technique.id 
    JOIN belt ON kodokan_kata.belt_id = belt.id 
    WHERE belt.rank_order IN (${rank_order_query})
    ORDER BY kodokan_kata.rank_order`,
      [...rank_order_query],
    );
    return rows as KodokanKata[];
  }

  // The U of CRUD - Update operation

  async update(kata: KodokanKata) {
    const [result] = await databaseClient.query<Result>(
      `update kodokan_kata set rank_order= ?, 
      defense= ?, technique_id= ?, belt_id= ? WHERE id= ?`,
      [kata.rank_order, kata.defense, kata.technique_id, kata.belt_id, kata.id],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from kodokan_kata where id= ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new KodokanKataRepository();
