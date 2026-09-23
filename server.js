const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'SecureDocs API funcionando' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SecureDocs API corriendo en http://localhost:${PORT}`);
});