const notesCtrl = {};

const Note = require('../models/Notes');

notesCtrl.renderForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('successMessage', 'Note Added Successfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
    const note = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});
    res.render('notes/notes-list', { note });
};

notesCtrl.renderEditNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(note.user != req.user.id) {
        req.flash('errorMessage', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('successMessage', 'Note Updated Successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('SuccessMessage', 'Note Deleted Successfully');
    res.redirect('/notes');
};

module.exports = notesCtrl;