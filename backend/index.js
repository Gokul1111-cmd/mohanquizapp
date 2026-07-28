import app, { connectDatabase } from "./server.js";

const PORT = process.env.PORT || 5000;

await connectDatabase();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));