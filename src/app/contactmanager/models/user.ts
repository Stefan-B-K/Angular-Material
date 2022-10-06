import { Note } from "./note";

export class User {
     id: number | undefined
     name = ''
     avatar = ''
     bio = ''
     birthDate: Date  | undefined
     notes: Note []  = []
}
