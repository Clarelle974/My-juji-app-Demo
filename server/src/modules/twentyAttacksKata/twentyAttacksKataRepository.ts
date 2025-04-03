import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type TwentyAttacksKata = {
  id: number;
  rank_order: string;
  defense: string;
  technique_id: number;
  belt_id: number;
};

class TwentyAttacksKataRepository {
  //   The C of CRUD - Create operation

  async create(kata: Omit<TwentyAttacksKata, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into twenty_attacks_kata (rank_order, defense, technique_id, belt_id) values (?, ?, ?, ?)",
      [kata.rank_order, kata.defense, kata.technique_id, kata.belt_id],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `select twenty_attacks_kata.*, 
    technique.name as technique_name,
    technique.signification AS technique_signification
    from twenty_attacks_kata
    join technique on twenty_attacks_kata.technique_id = technique.id 
    where twenty_attacks_kata.id = ?`,
      [id],
    );

    return rows[0] as TwentyAttacksKata;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `select twenty_attacks_kata.*, 
    technique.name as technique_name,
    technique.signification AS technique_signification
    from twenty_attacks_kata
    join technique on twenty_attacks_kata.technique_id = technique.id
    ORDER BY twenty_attacks_kata.rank_order`,
    );
    return rows as TwentyAttacksKata[];
  }

  async readByBelt(rank_order_query: string | string[]) {
    const [rows] = await databaseClient.query<Rows>(
      `select twenty_attacks_kata.*,
    technique.name as technique_name,
    technique.signification AS technique_signification
    from twenty_attacks_kata
    join technique on twenty_attacks_kata.technique_id = technique.id 
    JOIN belt ON twenty_attacks_kata.belt_id = belt.id 
    WHERE belt.rank_order IN (${rank_order_query})
    ORDER BY twenty_attacks_kata.rank_order`,
      [...rank_order_query],
    );
    return rows as TwentyAttacksKata[];
  }

  // The U of CRUD - Update operation

  async update(kata: TwentyAttacksKata) {
    const [result] = await databaseClient.query<Result>(
      `update twenty_attacks_kata set rank_order= ?, 
      defense= ?, technique_id= ?, belt_id= ? WHERE id= ?`,
      [kata.rank_order, kata.defense, kata.technique_id, kata.belt_id, kata.id],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from twenty_attacks_kata where id= ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new TwentyAttacksKataRepository();
