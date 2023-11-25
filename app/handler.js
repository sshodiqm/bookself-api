const bookSelf = require('./bookSelf')
// const { nanoid } = require('nanoid')

let nanoid = null

import('nanoid').then(({ nanoid: generateNanoid }) => {
    nanoid = generateNanoid
}).catch(err => {
    console.error(err)
})

//Menghendel pembuatan data buku
const createBooksHandler = (request, h)=>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload

    //mengecek value item name
    if(!name || name === ''){
        const res = h.response({
            status:'fail',
            message:'Gagal menambahkan buku. Mohon isi nama buku'
        })
        res.code(400)
        return res
    }

    const id = nanoid(16)

    if(readPage > pageCount){
        const res = h.response({
            status:'fail',
            message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        res.code(400)
        return res
    }

    const isFinished = (readPage, pageCount)=>{
        if(readPage === pageCount){
            return true
        }
        if(readPage < pageCount){
            return false
        }

    }

    const finished = isFinished(readPage, pageCount)

    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    bookSelf.push(newBook)

    const isSuccess = bookSelf.filter((book) => book.id === id).length > 0

    if(isSuccess){
        const res = h.response({
            status:'success',
            data:{
                bookId:id,
            }
        })
        res.code(201)
        return res
    }

    const res = h.response({
        status:'error',
        message: 'Buku gagal ditambahkan'
    })
    res.code(500)
    return res
}

//Menghendel untuk melihat isi data array
const getAllBooksHandler = (response, h)=>({
    status:'success',
    data:{
        books: bookSelf.map(book=>({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        }))
    }
})

//Menghendel untuk melihat isi data berdasarkan id
const getBookByIdHandler = (request, h) => {
    const { bookid } = request.params;
    const book = bookSelf.find(book => book.id === bookid);
    if (!book) {
        const res = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });
        res.code(404);
        return res;
    }
    const res = h.response({
        status: 'success',
        data: {
            book
        }
    });
    res.code(200);
    return res;
}

// Menghendel untuk memperbarui data buku berdasarkan id
const updateBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const index = bookSelf.findIndex((book) => book.id === bookId);

    if (index === -1) {
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        res.code(404);
        return res;
    }

    if (!name || name === '') {
        const res = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        res.code(400);
        return res;
    }

    if (readPage > pageCount) {
        const res = h.response({
            status: 'fail',
            message:
                'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        res.code(400);
        return res;
    }

    const isFinished = readPage === pageCount;
    const updatedAt = new Date().toISOString();

    bookSelf[index] = {
        ...bookSelf[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: isFinished,
        updatedAt,
    };

    const res = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    res.code(200);
    return res;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params
    const bookIndex = bookSelf.findIndex((book) => book.id === bookId)

    if (bookIndex === -1) {
        const res = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        res.code(404)
        return res
    }

    bookSelf.splice(bookIndex, 1)

    const res = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    })
    res.code(200);
    return res
}


module.exports = {createBooksHandler, getAllBooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler}