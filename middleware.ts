export {default} from "next-auth/middleware";

export const config = {
    matcher: [
        "/tripts",
        "/reservations",
        "/properties",
        "/favorites"
    ]
}