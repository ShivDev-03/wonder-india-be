import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const TrainSchema = new mongoose.Schema(
  {
    /**
     * created By
     * */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /**
     * updated By
     * */
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /**
     * train name
     * */
    name: {
      type: String,
      required: true,
    },
    /**
     * train number
     * */
    trainNo: {
      type: Number,
      required: true,
      unique: true,
    },
    /**
     * Source Station Code
     * */
    sourceCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    /**
     * destination station code
     * */
    destinationCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
TrainSchema.plugin(toJSON);
TrainSchema.plugin(mongoosePaginateV2);
TrainSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const TrainModel = mongoose.models.Train || mongoose.model('Train', TrainSchema, 'Train');
module.exports = TrainModel;
