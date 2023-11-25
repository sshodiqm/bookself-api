const bookSelf = require('./bookSelf')
const {createBooksHandler, getAllBooksHandler, updateBookByIdHandler, deleteBookByIdHandler, getBookByIdHandler} = require('./handler')

const routes = [
    {
        method:'GET',
        path:'/',
        handler: ()=>{
            return 'Ini adalah halaman home'
        }
    },
    {
        method:'*',
        path:'/',
        handler: ()=>{
            return 'Halaman ini tidak dapat diakses dengan menggunakan method ini'
        }
    },
    {
        method: 'POST',
        path: '/books',
        handler: createBooksHandler
    },
    {
        method:'GET',
        path:'/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookid}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
    
    
]

module.exports = routes