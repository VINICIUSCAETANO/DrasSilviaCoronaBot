'use strict';

const { WebhookClient } = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function WebhookProcessing(req, res) {
    const agent = new WebhookClient({ request: req, response: res });
    
    let intentMap = new Map();
    intentMap.set('ReturnWelcomeIntent', ReturnWelcomeIntent);
    intentMap.set('DefaultFallbackIntent', DefaultFallbackIntent);
    agent.handleRequest(intentMap);
}

async function ReturnWelcomeIntent(agent) {
    agent.add("Qual assunto você quer saber?");
}

async function DefaultFallbackIntent(agent) {
    const getHours = () => {
        let hours = new Date().getHours();
        console.log(hours)
        if (hours > 7 && hours < 12) {S
            return 'um bom dia.';
        } else if (hours < 18) {
            return 'uma boa tarde.';
        } else {
            return 'uma boa noite.';S
        }
    }
    agent.add("Se você precisar de mais informações sobre o Coronavírus, pode me chamar..");
    agent.add("E caso sentir que se enquadra em alguns dos sintomas, ligue para o Disque Saúde 136!");
    agent.add(`Tenha ${getHours()}`);
}

app.post('/', function(req, res) {
    WebhookProcessing(req, res);
});

app.listen(process.env.PORT || 5000, function () {
    console.info(`Aplicativo iniciado na porta ${process.env.PORT || 5000}`);
});

app.get('/', function (req, res) {
    return res.status(200).send('Aplicativo iniciado');
});
