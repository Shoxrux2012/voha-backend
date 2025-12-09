const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

// users.json fayldan foydalanuvchilarni o‘qish
let users = [];
try {
  const data = fs.readFileSync("users.json");
  users = JSON.parse(data);
} catch (err) {
  console.log("users.json topilmadi yoki bo‘sh:", err.message);
}

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: "Kirish muvaffaqiyatli!" });
  } else {
    res.json({ success: false, message: "Username yoki password xato" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
