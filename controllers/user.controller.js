import { Profile } from "../model/Profile.model.js";
import { responseMessageInstance } from "../utils/index.js";

//------------------------------------------------
export class UserController {
    static instance;

    //------------------------------------------------
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    //-----------------------------------------------
    async Hello(_, res) {
        return await responseMessageInstance.getSuccess(
            res,
            200,
            "Hello World From User Router!",
            {}
        );
    }
    async Profile(req, res) {
        const username = req.params.username;
        const profile = await Profile.findOne({
            where: { username: username },
        });
        return await responseMessageInstance.getSuccess(res, 200, "hi", {
            profile,
        });
    }
}

//------------------------------------------------
export const userInstance = UserController.getInstance();
