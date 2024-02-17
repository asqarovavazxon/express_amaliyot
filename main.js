const {Router} = require('express');
const router = Router()
const path = require('path');
const books = require('../books')
const uuid = require('uuid')

router.get('/', (req,res) => {
    res.send(books)
})

router.get('/:id', (req, res) => {
    const isid = books.some(book => book.id === parseInt(req.params.id))
    if(isid){
        books.forEach( (book) => {
             if(book.id === parseInt(req.params.id)){
                res.json(book)
             }
        })
    }else{
        res.status(500).send('siz soragan id lik kitob topilmadi ')
    }
})

router.post('/', (req, res) => {
    const newBook = {
        id : uuid.v4(),
        name : req.body.name,  
        autor : req.body.autor
    }
    books.forEach((book) => {
        if(book.name === newBook.name){
            return res.send('bu nomlik kitob bazada mavjud iltimos boshqa kitob kiriting,')
        }
    })
    if(!newBook.name || !newBook.autor){
        return res.send(' iltimos barcha parametrlarni kiritng')
    }else{
    books.push(newBook)
    res.json(books)
    }
})

router.put('/:id', (req, res) => {
    const isid = books.some(book => book.id === parseInt(req.params.id))
    if(isid){
        books.forEach(book => {
            if(book.id === parseInt(req.params.id)){
                book.name = req.body.name ? req.body.name : book.name
                book.autor = req.body.autor ? req.body.autor : book.autor
                res.json(book)
            }
        });
    }else{
        res.send('siz soragan id lik kitob topilmadi ')
    }
})

module.exports = router