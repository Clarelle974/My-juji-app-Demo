import databaseClient from "../../../database/client";

import slugify from "slugify";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
  slug?: string;
};

class CategoryRepository {
  //   The C of CRUD - Create operation

  async create(category: Omit<Category, "id">) {
    const { name } = category;
    const slug = slugify(name, { lower: true, strict: true });

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO category (name, slug) VALUES (?, ?)",
      [name, slug],
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select category.id, category.name, category.slug from category where category.id = ?",
      [id],
    );

    return rows[0] as Category;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from category");
    return rows as Category[];
  }

  // The U of CRUD - Update operation

  async update(category: Category) {
    const slug = slugify(category.name, { lower: true, strict: true });

    const [result] = await databaseClient.query<Result>(
      "UPDATE category SET name = ?, slug = ? WHERE id = ?",
      [category.name, slug, category.id],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from category where id= ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CategoryRepository();
