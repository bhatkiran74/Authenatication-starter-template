const express = require('express')
const router = express.Router();




router.get('/create-user', (req, res) => {
    res.json({
        data: "heat from user"
    })
})


module.exports = router