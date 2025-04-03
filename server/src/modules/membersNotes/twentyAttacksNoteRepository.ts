import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Note = {
  id: number;
  member_id: number;
  kata_id: number;
  content: string;
};

class TwentyAttacksNoteRepository {
  //   The C of CRUD - Create operation

  async create(twenty_attacks_note: Omit<Note, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into twenty_attacks_note (member_id, kata_id, content) values (?, ?, ?)",
      [
        twenty_attacks_note.member_id,
        twenty_attacks_note.kata_id,
        twenty_attacks_note.content,
      ],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  //   async readByMemberAndKataId(twenty_attacksId: number, memberId: number) {
  //     const [rows] = await databaseClient.query<Rows>(
  //       "select twenty_attacks_note.* from twenty_attacks_note  where kata_id = ? AND member_id= ?",
  //       [twenty_attacksId, memberId],
  //     );

  //     return rows[0] as Note;
  //   }

  async readByMember(memberId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select twenty_attacks_note.* from twenty_attacks_note  where member_id= ?",
      [memberId],
    );

    return rows as Note[];
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select twenty_attacks_note.* from twenty_attacks_note",
    );
    return rows as Note[];
  }

  // The U of CRUD - Update operation

  async update(twenty_attacksNote: Omit<Note, "member_id">) {
    const [result] = await databaseClient.query<Result>(
      "update twenty_attacks_note set content = ?, kata_id = ?  WHERE id = ?",
      [
        twenty_attacksNote.content,
        twenty_attacksNote.kata_id,
        twenty_attacksNote.id,
      ],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from twenty_attacks_note where id=?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new TwentyAttacksNoteRepository();
