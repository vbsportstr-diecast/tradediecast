import { Router }  from 'express'
import multer       from 'multer'
import { v2 as cloudinary } from 'cloudinary'

const router  = Router()
const upload  = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
})

// POST /api/uploads  — upload up to 12 images, returns URLs
router.post('/', upload.array('images', 12), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'No files uploaded' })

  try {
    const urls = await Promise.all(req.files.map(file =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tradediecast', transformation: [{ width: 1200, crop: 'limit' }, { quality: 'auto' }] },
          (err, result) => err ? reject(err) : resolve(result.secure_url)
        ).end(file.buffer)
      })
    ))
    res.json({ urls })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

export default router
