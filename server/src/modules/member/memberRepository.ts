import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Member = {
  id: number;
  name: string;
  email: string;
  hashed_password: string;
  role_id: number;
  belt_id: number;
  role: string;
};

class MemberRepository {
  async create(member: Member) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO member (email, name, hashed_password, belt_id) VALUES (?, ?, ?, ?)",
      [member.email, member.name, member.hashed_password, member.belt_id],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select member.name, member.email, member.belt_id, belt.name as belt_name from member join belt on belt.id=member.belt_id where member.id = ? ",
      [id],
    );

    return rows[0] as Member;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM member");
    return rows;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT member.*, role.name AS role FROM member JOIN role on role_id=role.id WHERE email = ?",
      [email],
    );

    return rows[0];
  }

  async updateBeltId(member: Pick<Member, "belt_id" | "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE member SET belt_id = ? WHERE id = ? ",
      [member.belt_id, member.id],
    );
    return result.affectedRows;
  }

  async updateEmail(member: Pick<Member, "email" | "id">) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE member
       SET email = ? 
       WHERE id = ? `,
      [member.email, member.id],
    );
    return result.affectedRows;
  }
  async updateName(member: Pick<Member, "name" | "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE member SET name = ? WHERE id = ? ",
      [member.name, member.id],
    );
    return result.affectedRows;
  }

  async updatePassword(member: Pick<Member, "hashed_password" | "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE member SET hashed_password = ? WHERE id = ? ",
      [member.hashed_password, member.id],
    );
    return result.affectedRows;
  }
}

export default new MemberRepository();
