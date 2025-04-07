import { Server } from "http";

import app from "./app";

const PORT: string | 3000 = process.env.PORT || 3000;

const server:Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});