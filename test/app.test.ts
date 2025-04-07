import request, { Response } from "supertest";

import app from "../src/app"

describe("app.ts test", () => {
    describe("GET /", () => {
        it("should return Hello, world!", async () => {
            // create GET request to root endpoint
            const response: Response = await request(app).get("/");

            // assert that response status is OK, response text is "Hello, world!"
            expect(response.status).toBe(200);
            expect(response.text).toBe("Hello, world!");
        });
    });

    describe("GET /api/v1/health", () => {
        it("should return server health status", async () => {
            const response: Response = await request(app).get("/api/v1/health");

            const today: string = new Date().toISOString().slice(0,13)

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("OK");
            expect(response.body.timestamp).toMatch(`${today}`);
            expect(response.body.uptime).toBeGreaterThan(0.1);
            expect(response.body.version).toBe("1.0.0");

        });
    });
})