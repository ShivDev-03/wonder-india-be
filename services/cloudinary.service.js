import { v2 as cloudinary } from 'cloudinary';
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import config from 'config/config';

export const PRODUCT_IMAGE_FOLDER = 'products';

const FOLDER = PRODUCT_IMAGE_FOLDER;

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

function getFileFromRequest(files) {
  if (!files || !files.image) {
    return null;
  }
  const f = files.image;
  return Array.isArray(f) ? f[0] : f;
}

function uploadFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: FOLDER, resource_type: 'image' }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.secure_url);
      }
    });
    stream.end(buffer);
  });
}

/**
 * @param {string} trimmed - data URL, http(s) URL, or existing Cloudinary URL
 */
async function uploadFromString(trimmed) {
  if (trimmed.includes('res.cloudinary.com')) {
    return trimmed;
  }
  try {
    const result = await cloudinary.uploader.upload(trimmed, {
      folder: FOLDER,
      resource_type: 'image',
    });
    return result.secure_url;
  } catch (e) {
    const msg = (e && e.message) || 'Failed to upload image to Cloudinary';
    throw new ApiError(httpStatus.BAD_REQUEST, msg);
  }
}

/**
 * Upload product image to Cloudinary from multipart file, JSON `image` string (data URL or URL), or return null.
 * @param {{ body: object, files?: object }} reqLike
 * @returns {Promise<string|null>} secure_url or null if no image was provided
 */
export async function uploadProductImageFromRequest(reqLike) {
  const { body, files } = reqLike;
  const file = getFileFromRequest(files);
  if (file && file.data) {
    try {
      return await uploadFromBuffer(file.data);
    } catch (e) {
      const msg = (e && e.message) || 'Failed to upload image to Cloudinary';
      throw new ApiError(httpStatus.BAD_REQUEST, msg);
    }
  }
  const image = body && body.image;
  if (image == null || image === '') {
    return null;
  }
  const trimmed = String(image).trim();
  if (!trimmed) {
    return null;
  }
  return uploadFromString(trimmed);
}
