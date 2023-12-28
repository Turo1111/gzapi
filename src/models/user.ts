import { Schema, model } from 'mongoose'
import { Auth } from '../interfaces/auth.interface'

const UserSchema = new Schema<Auth>(
  {
    password: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = model('user', UserSchema)
export default UserModel
