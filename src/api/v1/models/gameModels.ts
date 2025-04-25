import { Timestamp } from "firebase-admin/firestore";

/**
 * @interface Item
 * @description Represents an item object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item
 *         description:
 *           type: string
 *           description: A brief description of the item
 *         img:
 *           type: string
 *           format: uri
 *           description: A URL to an image representing the item
 *         price:
 *           type: string
 *           description: The price of the item (optional)
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: The Firestore timestamp when the item was created or updated (optional)
 */
export type Item = {
    name:string;
    description: string;
    img: string;
    price?: string
    datetime?: Timestamp;
};

/**
 * @interface Monster
 * @description Represents a monster object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Monster:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the monster
 *         description:
 *           type: string
 *           description: A brief description of the monster
 *         img:
 *           type: string
 *           format: uri
 *           description: A URL to an image representing the monster
 *         health:
 *           type: string
 *           description: The health value of the monster (optional)
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: The Firestore timestamp when the item was created or updated (optional)
 */
export type Monster = {
    name:string;
    description: string;
    img: string;
    health?: string
    datetime?: Timestamp;
};

/**
 * @interface Location
 * @description Represents a location object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the location
 *         description:
 *           type: string
 *           description: A brief description of the location
 *         img:
 *           type: string
 *           format: uri
 *           description: A URL to an image representing the location
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: The Firestore timestamp when the item was created or updated (optional)
 */
export type Location = {
    name:string;
    description: string;
    img: string;
    datetime?: Timestamp;
};

/**
 * @interface Treasure
 * @description Represents a treasure object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Treasure:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the treasure
 *         description:
 *           type: string
 *           description: A brief description of the treasure
 *         img:
 *           type: string
 *           format: uri
 *           description: A URL to an image representing the treasure
 *         value:
 *           type: string
 *           description: The value of the treasure (optional)
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: The Firestore timestamp when the item was created or updated (optional)
 */
export type Treasure = {
    name:string;
    description: string;
    img: string;
    value?: string
    datetime?: Timestamp;
};