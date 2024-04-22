import {Router} from "express";
import { Response } from "express";


class MainRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.get('/', ( res: Response) => {
            // res.sendFile(join(__dirname, '..', 'index.html'));
            res.json({
                message: 'Vse okey'
            });
        });

    }
}

export default new MainRoutes().router;