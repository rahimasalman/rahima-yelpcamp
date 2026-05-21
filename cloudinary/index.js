const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Custom Multer storage engine — replaces multer-storage-cloudinary
// Compatible with cloudinary v2 and multer v2
class CloudinaryStorage {
    constructor({ cloudinary: cld, params = {} }) {
        this.cloudinary = cld;
        this.params = params;
    }

    _handleFile(req, file, cb) {
        const params = typeof this.params === 'function'
            ? this.params(req, file)
            : this.params;

        const uploadStream = this.cloudinary.uploader.upload_stream(
            params,
            (error, result) => {
                if (error) return cb(error);
                cb(null, {
                    path: result.secure_url,      // → req.files[i].path
                    filename: result.public_id,   // → req.files[i].filename
                });
            }
        );

        file.stream.pipe(uploadStream);
    }

    _removeFile(req, file, cb) {
        this.cloudinary.uploader.destroy(file.filename, cb);
    }
}

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowed_formats: ['jpeg', 'png', 'jpg'],
    },
});

module.exports = { cloudinary, storage };
