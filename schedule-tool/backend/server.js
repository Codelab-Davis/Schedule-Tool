const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const courseRouter = require('./routes/course')
const detailRouter = require('./routes/detail')
const enrollmentRouter = require('./routes/enrollment')

// routers in use
app.use('/course', courseRouter);
app.use('/detail', detailRouter);
app.use('/enrollment', enrollmentRouter);

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})