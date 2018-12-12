import { Router, Request, Response, NextFunction } from 'express';

import Post from '../models/Post';

class PostRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        const posts = await Post.find();
        res.json({ posts });
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        const post = await Post.find({ url: { $regex: req.params.url } });
        res.json(post);
    }

    public async createPost(req: Request, res: Response): Promise<void>{
        const { title, url, content, image } = req.body;
        const newPost= new Post({title, url, content, image});
        await newPost.save();
        res.json({status: res.status, data: newPost});

    }

    public async updatePost(req: Request, res: Response): Promise<void>{
        const { url } = req.params;
        const post = await Post.findOneAndUpdate({url}, req.body);
        res.json({status: res.status, data: post});
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        await Post.findOneAndRemove({ url: req.params.url });
        res.json({ response: 'Post deleted Successfully' });
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRoutes = new PostRouter();

export default postRoutes.router;