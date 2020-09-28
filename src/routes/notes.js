const { Router } = require('express');
const router = Router();

const { renderForm,
    createNote,
    renderNotes,
    renderEditNote,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

const { isAuthenticated } = require('../validate/auth');

router.get('/notes/add', isAuthenticated, renderForm);

router.post('/notes/new-note', isAuthenticated, createNote);

router.get('/notes', isAuthenticated, renderNotes);

router.get('/notes/edit/:id', isAuthenticated, renderEditNote);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;