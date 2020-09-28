const { connect } = require('mongoose');

const { NOTESAPP_HOST, NOTESAPP_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTESAPP_HOST}/${NOTESAPP_DATABASE}`;

connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));