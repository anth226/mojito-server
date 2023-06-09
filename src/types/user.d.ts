export interface IUser {
    email: string
    name?: string
    password: string
    role: string
}

export interface IUser_d extends Document {
    email: string
    password: string
    name: string
    role: string
}

export interface IUserMethods {
    isValidPassword: (password: string) => Promise<boolean>
}

export type UserModel = Model<IUser_d, object, IUserMethods>

export interface IUserDataSource {
    getAll(): Promise<IUser[]>
    getById(id: string): Promise<IUser | null>
    getByEmail(email: string): Promise<IUser | null>
    create(input: IUser): Promise<IUser>
    updateById(id: string, input: Partial<IUser>): Promise<IUser | null>
    deleteById(id: string): Promise<IUser | null>
}
