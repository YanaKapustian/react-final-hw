const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const appPort = 4004;
const mongoUrl = "mongodb+srv://yanakapustian:violettaflika13@cluster0.ju9kswn.mongodb.net/?retryWrites=true&w=majority"

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())

const corsOptions = {
   origin: 'http://localhost:3000',
   optionsSuccessStatus: 200
}

const NewsSchema = new mongoose.Schema(
   {
      id: String,
      nickname: String,
      content: String,
      image: String,
      date: String,
      status: String,
   }
)
const UsersSchema = new mongoose.Schema(
   {
      nickname: String,
      name: String,
      photo: String,
   }
)

const News = mongoose.model("News", NewsSchema)
const Users = mongoose.model("Users", UsersSchema)

const getNews = ( req, res ) => {
   News.find()
      .exec()
      .then(news => res.json(news))
      .catch(err => res.status(500).json(err))
}
const getUsers = ( req, res ) => {
   Users.find()
      .exec()
      .then(news => res.json(news))
      .catch(err => res.status(500).json(err))
}

const createNews = ( req, res ) => {
   News.create(req.body)
      .then(news => res.json(news))
      .catch(err => res.status(500).json(err))
}
const createUsers = ( req, res ) => {
   Users.create(req.body)
      .then(news => res.json(news))
      .catch(err => res.status(500).json(err))
}

const updateNews = ( req, res ) => {
   News.updateOne({ _id: req.params.id }, { $set: req.body })
      .exec()
      .then((news) => req.json(news))
      .catch(err => res.status(500).json(err))
}
const updateUsers = ( req, res ) => {
   Users.updateOne({ _id: req.params.id }, { $set: req.body })
      .exec()
      .then((news) => req.json(news))
      .catch(err => res.status(500).json(err))
}

const removeNews = ( req, res ) => {
   News.deleteOne( { _id: req.params.id })
       .exec()
       .then(() => res.json({ success: true }))
       .catch(err => res.status(500).json(err))
}
const removeUsers = ( req, res ) => {
   Users.deleteOne( { _id: req.params.id })
       .exec()
       .then(() => res.json({ success: true }))
       .catch(err => res.status(500).json(err))
}


app.get('/news', cors(corsOptions), getNews)
app.post('/addNews', cors(corsOptions), createNews)
app.put('/news/:id', cors(corsOptions), updateNews)
app.delete('/news/:id', cors(corsOptions), removeNews)

app.get('/users', cors(corsOptions), getUsers)
app.post('/addUser', cors(corsOptions), createUsers)
app.put('/users/:id', cors(corsOptions), updateUsers)
app.delete('/users/:id', cors(corsOptions), removeUsers)

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => app.listen(
      appPort,
      () => console.log(`Listening on port ${appPort} ...`)
   ))
   .catch(err => console.log(`Error occured: ${mongoUrl}`, err)
   )



