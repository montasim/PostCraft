import mongoose, { type Document, type Model } from "mongoose"

export interface IProfile extends Document {
  userId: string
  bio: string
  location: string
  title: string
  company: string
  website: string
  twitterHandle: string
  linkedInSlug: string
  createdAt: Date
  updatedAt: Date
}

const profileSchema = new mongoose.Schema<IProfile>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    bio: { type: String, default: "", maxlength: 500 },
    location: { type: String, default: "", maxlength: 100 },
    title: { type: String, default: "", maxlength: 100 },
    company: { type: String, default: "", maxlength: 100 },
    website: { type: String, default: "", maxlength: 300 },
    twitterHandle: { type: String, default: "", maxlength: 50 },
    linkedInSlug: { type: String, default: "", maxlength: 100 },
  },
  { timestamps: true }
)

const ProfileModel: Model<IProfile> =
  (mongoose.models.Profile as Model<IProfile>) ||
  mongoose.model<IProfile>("Profile", profileSchema)

export { ProfileModel }
