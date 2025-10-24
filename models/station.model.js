import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const StationSchema = new mongoose.Schema(
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
     * station code
     * */
    code: {
      type: String,
      required: true,
    },
    /**
     * station name
     * */
    name: {
      type: String,
      required: true,
    },
    /**
     * station district
     * */
    district: {
      type: String,
    },
    /**
     * total number of train passing through this station
     * */
    trainPassingThrough: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
StationSchema.plugin(toJSON);
StationSchema.plugin(mongoosePaginateV2);
StationSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const StationModel = mongoose.models.Station || mongoose.model('Station', StationSchema, 'Station');
module.exports = StationModel;
