import { Application } from "express";
import ProfileRoutes from "./profile.routes";
import RecentRoutes from "./recent.routes";
import GroupRoutes from "./group.routes";
import MainRoutes from "./main.routes";

export default class Routes {
    constructor(app: Application) {
        app.use(ProfileRoutes);
        app.use(RecentRoutes);
        app.use(GroupRoutes);
        app.use(MainRoutes);
    }
}