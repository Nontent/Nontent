const express = require('express');
const rootRouter = require("./routes/router.js");
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(rootRouter);


app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}.`);
    console.log('Available routes: ', rootRouter.stack.filter(r => r.route).map(r => r.route.path));
});
