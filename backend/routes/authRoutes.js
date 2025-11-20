const express = require("express");
const {registerUser, loginUser, getUserProfile} = require("../controllers/authController")
const {protect} = require("../middlewares/authMiddleware")
const upload = require("../middlewares/uploadMiddleware")
const router = express.Router();
const { v2: cloudinary } = require("cloudinary");
const { Readable } = require("stream")

// Auth routes
router.post("/register", registerUser); // register user
router.post("/login", loginUser);      // login user
router.get("/profile", protect, getUserProfile) // get user Profile

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.post("/upload-image", upload.single("image"),async(req,res)=>{
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"})
    }

    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    const streamUpload = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ace-prep" },
        (error, result) => (result ? resolve(result) : reject(error))
      );
      bufferStream.pipe(stream);
    });

    try{
        const result = await streamUpload();
        res.status(200).json({ imageUrl : result.secure_url })
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router