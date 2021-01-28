// TODO: Require Controllers...
let homeRouter = require('../controllers/home');


module.exports = (app) => {
    // TODO...
    app.get('/', (req, res) => {
      homeRouter(req,res)
    }
    )};