import { Request, Response, NextFunction, Router } from 'express';

import User from '../models/User';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find().populate('posts', 'title url -_id');
        res.json(users);
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const user = await User.findById(req.params.id).populate('posts');
        res.json(user);
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ status: 200, newUser });
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.json(user);
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await User.findByIdAndRemove(id);
        res.json(user);
    }

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:id', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:id', this.updateUser);
        this.router.delete('/:id', this.deleteUser);
    }

}

const userRouter = new UserRouter();
export default userRouter.router;

