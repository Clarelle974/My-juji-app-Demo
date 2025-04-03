import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Technique = {
  id: number;
  name: string;
  signification: string;
  description: string;
  category_id: number;
  belt_id: number;
};

class TechniqueRepository {
  //   The C of CRUD - Create operation

  async create(technique: Omit<Technique, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into technique (name, signification, description, category_id, belt_id) values (?, ?, ?, ?, ?)",
      [
        technique.name,
        technique.signification,
        technique.description,
        technique.category_id,
        technique.belt_id,
      ],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select technique.id, technique.name, technique.signification, technique.description, technique.belt_id, technique.category_id, category.name as category_name from technique join category on technique.category_id = category.id where technique.id = ?",
      [id],
    );

    return rows[0] as Technique;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select technique.*, category.name as category_name from technique join category on technique.category_id = category.id",
    );
    return rows as Technique[];
  }

  async readAllSearchedTechniques(searchedTechnique: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM technique WHERE name LIKE ? ORDER BY belt_id",
      [`%${searchedTechnique}%`],
    );
    return rows as Technique[];
  }

  async readByBelt(rank_order_query: string | string[]) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT technique.id, technique.name, technique.signification, 
      technique.description, technique.category_id, 
      category.name AS category_name 
       FROM technique 
       JOIN category ON technique.category_id = category.id 
       JOIN belt ON technique.belt_id = belt.id 
       WHERE belt.rank_order IN (${rank_order_query})
       ORDER BY category.name, technique.name`,
      [...rank_order_query],
    );
    return rows as Technique[];
  }

  async readByCategoryAndBelt(
    category_slug: string,
    rank_order_query: string | string[],
  ) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT technique.id, technique.name, technique.signification, technique.description, 
              category.name AS category_name 
       FROM technique 
       JOIN category ON technique.category_id = category.id 
       JOIN belt ON technique.belt_id = belt.id 
       WHERE category.slug = ? AND belt.rank_order IN (${rank_order_query})`,
      [category_slug, ...rank_order_query],
    );
    return rows as Technique[];
  }

  // The U of CRUD - Update operation

  async update(technique: Technique) {
    const [result] = await databaseClient.query<Result>(
      "update technique set name = ?, signification = ?, description = ?, category_id = ?, belt_id = ? WHERE id= ?",
      [
        technique.name,
        technique.signification,
        technique.description,
        technique.category_id,
        technique.belt_id,
        technique.id,
      ],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from technique where id= ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new TechniqueRepository();
