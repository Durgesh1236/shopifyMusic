import { Album } from "../models/Album.js";
import { Song } from "../models/Song.js";
import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary"
import sharp from "sharp"; 

export const createAlbum = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not admin",
        });
    }

    const { title, description } = req.body;
    const file = req.file;

    const compressedImage = await sharp(file.buffer)
        .resize(500, 500) 
        .jpeg({ quality: 50 })
        .png({ quality: 50 })  
        .toBuffer();

    const fileUrl = getDataurl({ ...file, buffer: compressedImage });
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
        quality: "auto", 
    });

    await Album.create({
        title,
        description,
        thumbnail: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
    });

    res.json({
        message: "Album Added",
    });
});


export const addSong = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not admin",
        });
    }

    const { title, description, singer, album } = req.body;
    const file = req.file;
    const fileUrl = getDataurl(file);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
        resource_type: "video",
    });

    await Song.create({
        title,
        description,
        singer,
        audio: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
        album,
    });

    res.json({
        message: "Song Added",
    });
});

export const addThumbnail = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not admin",
        });
    }

    const file = req.file;

    const compressedImage = await sharp(file.buffer)
        .resize(600, 600) 
        .jpeg({ quality: 50 }) 
        .png({ quality: 50 })
        .toBuffer();

    const fileUrl = getDataurl({ ...file, buffer: compressedImage });
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
        quality: "auto", 
    });

    await Song.findByIdAndUpdate(
        req.params.id,
        {
            thumbnail: {
                id: cloud.public_id,
                url: cloud.secure_url,
            },
        },
        { new: true }
    );
    res.json({
        message: "Thumbnail Added",
    });
});

export const getAllAlbum = TryCatch(async (req, res) => {
    const albums = await Album.find()
    res.json(albums);
});

export const getAllSongs = TryCatch(async (req, res) => {
    const songs = await Song.find();

    res.json(songs);
});

export const getAllSongsByAlbum = TryCatch(async (req, res) => {
    const album = await Album.findById(req.params.id);
    const songs = await Song.find({ album: req.params.id });
    res.json({ album, songs });
});

export const deleteSong = TryCatch(async (req, res) => {
    const song = await Song.findById(req.params.id);
    await song.deleteOne()

    res.json({
        message: "Song Deleted",
    });
});

export const deleteAlbum = TryCatch(async (req, res) => {
    const albumdel = await Album.findById(req.params.id);
    await albumdel.deleteOne();

    res.json({
        message: "Album Deleted",
    });
});

export const getSingleSong = TryCatch(async(req,res)=> {
    const song = await Song.findById(req.params.id);
    res.json(song);
});

