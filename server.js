const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
const documentosRoutes = require('./src/routes/documentos.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'SecureDocs API funcionando' });
});

app.use('/auth', authRoutes);
app.use('/documentos', documentosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SecureDocs API corriendo en http://localhost:${PORT}`);
});