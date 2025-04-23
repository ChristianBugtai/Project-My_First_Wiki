import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";


const allowedRoles: Array<"admin" | "trustedContributor"> = ["admin", "trustedContributor"];

const redirectUnauthorized = (redirectRoute: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role: string | undefined = res.locals.role;

        if (!role) {
            return next(
                new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                )
            )
        }

        // if role is not on the list, redirects the request to a given route
        if(!allowedRoles.includes(role as "admin" | "trustedContributor" )){
            return res.redirect(redirectRoute)
        }

        // if role is valid continue with the same route
        next()
    }
}

export default redirectUnauthorized;