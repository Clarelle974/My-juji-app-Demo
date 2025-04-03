import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Note = {
  id: number;
  member_id: number;
  kata_id: number;
  content: string;
};

class KodokanNoteRepository {
  //   The C of CRUD - Create operation

  async create(kodokan_note: Omit<Note, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into kodokan_note (member_id, kata_id, content) values (?, ?, ?)",
      [kodokan_note.member_id, kodokan_note.kata_id, kodokan_note.content],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  //   async readByMemberAndKataId(kodokanId: number, memberId: number) {
  //     const [rows] = await databaseClient.query<Rows>(
  //       "select kodokan_note.* from kodokan_note  where kata_id = ? AND member_id= ?",
  //       [kodokanId, memberId],
  //     );

  //     return rows[0] as Note;
  //   }

  async readByMember(memberId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select kodokan_note.* from kodokan_note  where member_id= ?",
      [memberId],
    );

    return rows as Note[];
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select kodokan_note.* from kodokan_note",
    );
    return rows as Note[];
  }

  // The U of CRUD - Update operation

  async update(kodokanNote: Omit<Note, "member_id">) {
    const [result] = await databaseClient.query<Result>(
      "update kodokan_note set content = ?, kata_id = ?  WHERE id = ?",
      [kodokanNote.content, kodokanNote.kata_id, kodokanNote.id],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from kodokan_note where id=?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new KodokanNoteRepository();
