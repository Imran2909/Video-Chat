const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
    console.log("Home")
    res.send("HOME ")
})

app.post("/write", async (req, res) => {
    let {Prompt} = req.body
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Prompt,
            max_tokens: 4000,
        });
        const completion = response.data.choices[0].text
        // console.log(completion)
        res.send({"ans":completion})
    } catch (error) {
        res.send(error)
    }
})

app.listen(3000,()=>{
    console.log("listening")
})
