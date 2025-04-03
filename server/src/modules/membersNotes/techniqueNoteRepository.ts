import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Note = {
  id: number;
  member_id: number;
  technique_id: number;
  content: string;
};

class TechniqueNoteRepository {
  //   The C of CRUD - Create operation

  async create(technique_note: Omit<Note, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into technique_note (member_id, technique_id, content) values (?, ?, ?)",
      [
        technique_note.member_id,
        technique_note.technique_id,
        technique_note.content,
      ],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readByMemberAndTechniqueId(techniqueId: number, memberId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select technique_note.*, technique.name as technique_name from technique_note join technique on technique_note.technique_id = technique.id where technique_id = ? AND member_id= ?",
      [techniqueId, memberId],
    );

    return rows[0] as Note;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select technique_note.* from technique_note",
    );
    return rows as Note[];
  }

  // The U of CRUD - Update operation

  async update(techniqueNote: Omit<Note, "member_id">) {
    const [result] = await databaseClient.query<Result>(
      "update technique_note set content = ?, technique_id = ?  WHERE id = ?",
      [techniqueNote.content, techniqueNote.technique_id, techniqueNote.id],
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from technique_note where id=?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new TechniqueNoteRepository();
