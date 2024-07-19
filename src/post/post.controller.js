import Post from './post.model.js';

import { dateWithTime } from '../denoucement/denoucement.controller.js';

import { uploadImageToImgBB } from '../helpers/upload-image.js';

export const createPost = async (req, res) => {

    const { date, text, img, tailFriend } = req.body;

    const dateAndTime = dateWithTime(date);

    if(img != null || img != ""){

        const imgPost = req.files.img;

        const result = await uploadImageToImgBB(imgPost);

        const newPost = new Post({

            dateAndTime,
            text,
            img: result,
            tailCreator: req.tailUser.username,
            tailFriend,
            likes: 0
    
        })

        await newPost.save();

        res.status(200).json({

            msg: 'Post created successfully',
            newPost

        });

    }else{

        const newPost = new Post({

            dateAndTime,
            text,
            tailCreator: req.tailUser.username,
            tailFriend,
            likes: 0
    
        })

        await newPost.save();

        res.status(200).json({

            msg: 'Post created successfully',
            newPost

        });

    }

}

export const getPost = async (req, res) => {
    
    const { limit, from } = req.query;

    const query = { status: true };

    const [total, post] = await Promise.all([

        Post.countDocuments(query),
        Post.find(query).skip(Number(from)).limit(Number(limit))

    ]);

    res.status(200).json({ msg: `The ${total} posts are:`, post });

}