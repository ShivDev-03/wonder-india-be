import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from 'models/plugins';

const ProductSchema = new mongoose.Schema(
  {
    /**
     * Same as public image URL; kept for compatibility with clients using `image`
     */
    image: {
      type: String,
      trim: true,
    },
    /**
     * Image URL after upload to Cloudinary
     */
    url: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    /**
     * Optional price
     */
    price: {
      type: Number,
    },
    /**
     * When true, product is exposed to the public / storefront API for the frontend
     */
    showInFrontend: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.plugin(toJSON);
ProductSchema.plugin(mongoosePaginateV2);
ProductSchema.plugin(softDelete, {
  overrideMethods: true,
  deleted: 'deleted',
  deletedAt: 'deletedAt',
  indexFields: true,
  deletedBy: 'deletedBy',
  deletedByType: mongoose.Schema.ObjectId,
});

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema, 'Product');
module.exports = ProductModel;
