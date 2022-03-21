import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const GuestSchema = new Schema(
  {
   eventId: {type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true},
    accountId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

GuestSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

GuestSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})
