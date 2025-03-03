const express = require('express')
const app = express()
const rateLimit = require ("express-rate-limit")
const PORT = process.env.PORT || 8000 // Port thingy

const { Canvas } = require('canvas-constructor/cairo')
const canvas = require('canvas')
const { env } = require('process')

const { registerFont } = require('canvas');
registerFont('impact.ttf', { family: 'Impact' });

app.use(express.json() )



// Rate limiter
const limiter = rateLimit({
    windowMs: 100 * 60 * 100, // 10 minutes
    max: 100, // 100 requests max every 10 minutes
    message:"Too many requests, please try again after 10 minutes."
})


// encoding base64 through URI
app.get('/encode/:input', limiter, (req, res) => {
    

    const { input } = req.params;

    // encoding lets
  let data =  `${input}`;
  let buff = new Buffer.from(data);
  let base64data = buff.toString('base64');

    if (!input) {
        res.status(418).send({ message: 'No text to encode'})
    }

    res.status(200).send({
        output: `${base64data}`,
    });
});


// decoding base64 through URI
app.get('/decode/:input', limiter, (req, res) => {

    const { input } = req.params;

    // decoding lets

  let decodeData = `${input}`;
  let decodeBuff = new Buffer.from(decodeData, 'base64');
  let decodeText = decodeBuff.toString('ascii');


    if (!input) {
        res.status(418).send({ message: 'No text to decode.'})
    }

    res.status(200).send({
        output: `${decodeText}`,
    });
});

// Random Dog Image
app.get('/dog', limiter, (req, res) => {
    
    res.status(200).send({
        url: "https://dankrpg.xyz/api/dogs/" + Math.floor(Math.random()*300) +  ".jpg"
    });
});

// Random Bird Image

app.get('/bird', limiter, (req, res) => {
    
    res.status(200).send({
        url: "https://dankrpg.xyz/api/birds/" + Math.floor(Math.random()*109) +  ".jpg"
    });
});

// Image Manipulation
app.get('/memes/smart/text1=:text1/text2=:text2', async(req, res) => {
    const img = await canvas.loadImage('https://th.bing.com/th/id/OIP.v8mzpYYKhQjNP0NYqp2DDwHaFq?pid=ImgDet&rs=1')
    let image = new Canvas(474,362)
    .printImage(img, 0, 0, 474, 362)
    .setTextFont('15px Impact')
    .printText(req.params.text1, 211, 50)
    .printText(req.params.text2, 211, 227)
    .toBuffer();

    res.set({'Content-Type': 'image/png'})
    res.send(image)
});

//

// Random Dog Fact
app.get('/animals/dogfact', limiter, (req, res) => {
    
    var facts = [
        'When dogs howl, they adjust the pitch according to what other dogs’ howls sound like so that theirs can appear unique.',
        'Dogs have been known to detect various illnesses in humans, from cancer to diabetes.',
        'Dogs can smell up to 1000 times better than humans.',
        'Chocolate is toxic to dogs because it contains theobromine and a small amount of caffeine. Dogs do not process these ingredients as fast as humans do. This allows toxic compounds to build up.',
        "Greyfriars Bobby, a Sky Terrier, is known for guarding his owner's grave for 14 years after he died, until Bobby died in 1872.",
        'The oldest dog fossil found dates back to 10,000 BC.',
        'In the 11th century, a dog named Saur was the king of Norway for 3 years.',
        'The mayor of Idyllwild, California is a Golden Retriever, named Max II. He has been the mayor since July 21, 2013.',
        'More than half of all US presidents have owned dogs.',
        "A dog's heart beat can beat up to 120 times a minute.",
        "Most dogs don't actually like hugs. In fact, some may hate you hugging them.",
        "Dogs are great stress relievers.",
        "The fastest dog breed is the Grayhound, which can around 40 mph (64.3 kph)!",
        "Leaving a dog inside a car on a hot day can cause serious brain damage, in as little as 15 minutes.",
        "People in Oklahoma can be fined for making 'ugly faces' at dogs.",
        "Dogs are able to dream, just like humans.",
        "Dogs are capable of affection, they can release the love hormone oxytocin.",
        "The 'Basenji' dog breed is famously known for being the only dog breed that is unable to bark.",
        "Dogs drink the same way that cats do.",
        "The belief that dogs hate cats, is mostly untrue. Most dogs can be nice to cats, and can even develop a relationship with one.",
        "The most popular male dog name for 2020 was Max. The most popular female name was Bella.",
        "The Queen of the UK has 3 dogs, two Corgis and one Dorgi.",
        "The first US president, George Washington, has been credited as the developer of the American Foxhound breed. George Washington owned 36 American Foxhounds.",
        "In the UK, it is against the law to allow your pet to mate with a pet from the royal house.",
        "In Palding, Ohio, police officers are allowed to bite dogs to quiet them.",
        "Dogs have been pets for humans for more than 12,000 years.",
        "The print of a dog's nose is unique.",
        "The first dog in space was Laika, a Russian mongrel in 1957. Unfortunately, she did not make it back home.",
        "Despite common misconception, dogs are not colour-blind. They can see colour, just not as vividly as humans.",
        "Dogs are called a man's best friend, because over thousands of years, we have developed a deep bond with them.",
        "Guide dogs are trained to poop on command, so that their owners can pick up their mess easier.",
        "Dogs can sniff at the same time as breathing.",
        "Typically, guide dogs are trained for up to a year.",
        "Dogs can suffer from PTSD, just like humans.",
        "Some of Moscow's stray dogs use the subway to travel around.", 
        "Spayed/Neutered dogs are less likely to get into fights.",
        "Before the 1800s, animals were sentenced for human crimes.",
        "Dogs are able to watch more TV now, as newer TVs are less blurry for dogs than older ones.",
        "Because of Dogs' ability to track and identify substances, their finds can be used as evidence in a court of law.",
        "Dalmatians are actually born completely white, and their black spots appear as they grow older.",
        "There are more than 150 dog breeds.",
        "An adult dog has 42 teeth.",
        "All dogs, regardless of breed, are descendants of wolves.",
        "There are more than 900 million dogs in the world.",
        "The average dog lives for around 12 years.",
        "Dogs are omnivores. They eat both meat and plants.",
        "Dogs are some of the most loyal and social pets.",
        "The oldest dog lived for 29 years, 282 days.",
        "Three dogs survived the Titanic.",
        "Dogs only sweat from their paws.",
        "Baboons are known for sometimes keeping dogs as pets.",
        '"Three dog night" is a saying that means that it is so cold, that you would need 3 dogs to sleep with you to keep you warm.',
        "Dogs are unable to feel guilt, but are able to be jealous.",
        "Puppies are actually born blind and deaf.",
        "The average speed of a dog is 15-20mph, or 24-32kph!",
        "Dogs can sense the earth's magnetic field, like a compass.",
        "Some have such good noses they can sniff out medical problems.",
        "Service dogs pee and poop on command and know when they're on or off duty.",
        "Chihuahuas are born with an incomplete skull just like a human baby. The soft spot is known as a molera in dogs and fontanelle in humans.",
        "Basset Hounds have the longest ears out of any other dog breed. Many measure between 7 and 10 inches long.",
        "Forty-five percent of U.S. dogs sleep in their owner's bed.",
        "The Basenji is not technically \"barkless,\" as many people think. They can yodel.",
        "When the WCC raises pups without their mothers, they sometimes enlist dogs be parental figures, to show the wolf pups how to properly interact with the hoomans.",
        "When dogs kick after going to the bathroom, they are using the scent glands on their paws to further mark their territory.",
        "The phrase \"Beware of Dog\" is so old that its Latin equivalent — \"cave canem\" — has been found on signs in Roman ruins.",
        "Dogs' eyes contain a special membrane, called the tapetum lucidum, which allows them to see in the dark.",
        "Puppies grow to half their body weight in the first four to five months.",
        ]
        
        let fact = facts[Math.floor(Math.random() * facts.length)]
        
        

        res.status(200).send({
            fact: fact
        });
});

// Random Panda
app.get('/panda', limiter, (req, res) => {
    
    res.status(200).send({
        url: "https://dankrpg.xyz/api/pandas/" + Math.floor(Math.random()*101) +  ".jpg"
    });
});

// Mock text
app.get('/memes/mock/:text', (req, res) => {
    
    let text = req.params.text;
    
        text = text.trim();
        let copy = "";
        for (i = 0; i < text.length; i++) {
          let char = text.substring(i, i + 1);
          if (i % 2 === 0) {
            char = char.toLowerCase();
          } else {
            char = char.toUpperCase();
          }
          copy = copy.concat(char);
        }
      res.status(200).send({
        output: copy    
      });
});

// Handler start
var ball = require('./routes/8ball');

app.use('/8ball',  ball);

// Listen on port
app.listen(PORT, () => console.log(`Sucessfully started server on port ${PORT}`))

app.get('/', (req, res) => {
    res.sendFile('/home/runner/APIv1/index.html')
})
