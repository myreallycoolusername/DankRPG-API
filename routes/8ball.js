var express = require('express');

var router = express.Router();

router.get('/:question', (req, res) => {

    const { question } = req.params;

    var responses = [
        'Yes',
        'No',
        "I'm certain of it",
        'Maybe in the future',
        'Maybe',
        'Definitely a no',
        'Definitely a yes',
        'Definitely not.',
        'I see it as a no',
        'I see it as a yes',
        'Perhaps',
        'Definitely',
        'Definitely yes.',
        'As I see it, yes.',
        'Without a doubt',
        'Outlook good.',
        'Signs point to yes.',
    ]

    let response = responses[Math.floor(Math.random() * responses.length)]

    res.status(200).send({
        question: question, response : response
    })

});

module.exports = router;
