// server.js yoki index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const users = JSON.parse(fs.readFileSync('users.json', 'utf-8')); // foydalanuvchilar

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if(user) {
    res.json({ success: true, message: "Login muvaffaqiyatli!" });
  } else {
    res.status(401).json({ success: false, message: "Login xato!" });
  }
});

app.listen(port, () => console.log(`Backend server running on http://localhost:${port}`));
