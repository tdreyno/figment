import { Reader, map, chain, contramap } from "../Reader"
import { pipe, pluck } from "../../core"

type DB = string
const DB = "database://"

interface User {
  id: string
  name: string
  db: DB
}

const getUser = (id: string): Reader<DB, User> => (db: DB) => ({
  id,
  name: "Thomas",
  db,
})

const saveUser = (user: User): Reader<DB, User> => (db: DB) => ({ ...user, db })

describe("Reader", () => {
  test("Basics", () => {
    expect(getUser("1234")(DB)).toEqual({ id: "1234", name: "Thomas", db: DB })
  })

  test("map", () => {
    const addLastName = (user: User) => ({
      ...user,
      name: user.name + " Reynolds",
    })

    expect(map<string, User, User>(addLastName)(getUser("123"))(DB)).toEqual({
      id: "123",
      name: "Thomas Reynolds",
      db: DB,
    })
  })

  test("contramap", () => {
    const data = {
      db: "other",
    }

    expect(
      contramap(pluck<typeof data, "db">("db"))(getUser("123"))(data),
    ).toEqual({ id: "123", name: "Thomas", db: "other" })
  })

  test("chain", () => {
    const getAndSaveUser = pipe(getUser, chain(saveUser))
    expect(getAndSaveUser("123")(DB)).toEqual({
      id: "123",
      name: "Thomas",
      db: DB,
    })
  })
})
