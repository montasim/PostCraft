import { ProfileModel } from "./profile.model"
import type { UpdateProfileInput } from "./profile.schema"

export const profileRepository = {
  async findByUserId(userId: string) {
    return ProfileModel.findOne({ userId }).lean()
  },

  async upsert(userId: string, data: UpdateProfileInput) {
    return ProfileModel.findOneAndUpdate(
      { userId },
      { $set: data },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    ).lean()
  },
}
