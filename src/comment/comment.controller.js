import Comment from './comment.model.js';

import Post from '../post/post.model.js';

import { dateWithTime } from '../denoucement/denoucement.controller.js';

export  const createComment = async (req, res) => {

    const { date, text, idPost } = req.body;

    const dateAndTime = dateWithTime(date);

    const newComment = new Comment({

        dateAndTime,
        text,
        like,
        idPost,
        idUser: req.idUser

    });

    await newComment.save();

    const found = await Post.findOneAndUpdate({ _id: idPost },{ $inc: { comentaries: 1 }, $push: { idCommentaries: newComment._id }} );

    await found.save();

    res.status(200).json({ msg: 'Comment created successfully' });

}

export const getComments = async (req, res) => {

    const { limit, from } = req.query;

    const query = { status: true };

    const [total, comment] = await Promise.all([

        Comment.countDocuments(query),

        Comment.find(query).skip(Number(from)).limit(Number(limit))

    ]);

    res.status(200).json({ msg: `The ${total} comments are:`, comment });

}