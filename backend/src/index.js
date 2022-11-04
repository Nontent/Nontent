const express = require('express');
const rootRouter = require("./routes/router.js");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(rootRouter);


app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}.`);
    console.log('Available routes: ', rootRouter.stack.filter(r => r.route).map(r => r.route.path));
});
