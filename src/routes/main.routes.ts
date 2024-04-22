import {Router} from "express";



class MainRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.get('/', (req, res) => {
            // res.sendFile(join(__dirname, '..', 'index.html'));
            res.json({
                message: 'Vse okey'
            });
        });

    }
}

export default new MainRoutes().router;