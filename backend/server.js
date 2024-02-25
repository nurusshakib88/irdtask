const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const PORT = 3000;

// Connect to SQLite database
const db = new sqlite3.Database("./dua_main.sqlite");

// Enable CORS with specific origin
app.use(
  cors({
    origin: "http://localhost:3001", // Adjust the origin based on your frontend URL
  })
);

// Define endpoints
app.get("/", (req, res) => {
  res.send(
    "Welcome to the API server. Please use the following endpoints: <br> GET /category <br> GET /subcategory/:categoryId <br> GET /dua/:categoryId"
  );
});

app.get("/category", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/subcategory/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  db.all(
    "SELECT * FROM sub_category WHERE cat_id = ?",
    [categoryId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});
app.get("/dua/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  db.all("SELECT * FROM dua WHERE cat_id = ?", [categoryId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
