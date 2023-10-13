const express = require('express');
const exphbs = require('express-handlebars');
const mysql2 = require('mysql2');
const PORT = 3334;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Middleware para arquivos estáticos

const db = mysql2.createPool({
  host: 'localhost',
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'system_products' 
});
app.get('/', (request, response) => {
  response.render('home');
});

app.get('/produtos', (request, response) => {
  const mostrarRes = `SELECT * FROM tb_produtos;`
  db.query(mostrarRes, (error, result) => {
      if(error){
          console.error(error);
          return {error: error};
      }
      const produtoS = result
      return response.render('produtos', { produtoS })
  });
});
app.get('/produtos/delete/:id', (request, response) => {
  const {id} = request.params
  const deleteProduto = `DELETE FROM tb_produtos WHERE id='${id}'`
  db.query(deleteProduto, (error, result) => {
      if(error){
          console.error(error);
          return {error: error};
      }
      return response.redirect('/produtos')
  });
});
app.get('/produtos/edit/:id', (request, response) => {
  const {id} = request.params
  const SHOWp = `SELECT * FROM tb_produtos WHERE id='${id}'`
  db.query(SHOWp, (error, result) => {
      if(error){
          console.error(error);
          return {error: error};
      }
      return response.render('edit')
  });
});

app.post("/cadastrar", (request, response) => {
  const { titulo,categoria, descricao, preco, disponibilidade } = request.body;
  const insertSQL = `INSERT INTO tb_produtos( titulo,categoria, descricao, preco, disponibilidade) VALUES('${titulo}', '${categoria}', '${descricao}', '${preco}','${disponibilidade}');`;
  db.query(insertSQL, (error, result) => {
      if(error){
          console.error(error);
          return response.status(500).json({ error: "Erro ao inserir o produto" });
      }
      return response.redirect('/produtos');
  });
});
app.listen(3334, () => {
  console.log(`Servidor rodando na porta ${3334}`)
});

