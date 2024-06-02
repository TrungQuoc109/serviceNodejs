import { userRouter } from "./user.route.js";

export const routes = (app) => {
    app.use("/v1/api/user", userRouter);
};
