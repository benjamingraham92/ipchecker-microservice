const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 5000;

const backendServices = {
    'totalips': 'http://ipcheckertotalips.40038234.qpc.qubcloud.uk/',
    'totalemptyips': 'http://ipcheckertotalemptyips.40038234.qpc.qubcloud.uk/',
    'totalvalidips': 'http://ipcheckertotalvalidips.40038234.qpc.qubcloud.uk/',
    'classifyips': 'http://ipcheckerclassifyips.40038234.qpc.qubcloud.uk/',
    'findcountry': 'http://ipcheckerfindcountry.40038234.qpc.qubcloud.uk/',
    'findbadips': 'http://ipcheckerfindbadips.40038234.qpc.qubcloud.uk/'
};

app.use(express.json());

app.use('/:functionName', (req, res) => {
    const functionName = req.params.functionName;

    if (!backendServices[functionName]) {
        console.log(`Service not found for function: ${functionName}`);
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        return res.status(404).send('Service not found');
    }

    const url = backendServices[functionName];
    console.log(`Forwarding request to: ${url}?${new URLSearchParams(req.query).toString()}`);



    const options = {
        url: url,
        qs: req.query,
        method: req.method,
        encoding: null 
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error(`Error connecting to backend service: ${error.message}`);
            return res.status(500).send('Proxy error');
        }

    const excludedHeaders = ['content-encoding', 'content-length', 'transfer-encoding'];
    const headers = {};

    Object.keys(response.headers).forEach((name) => {
        if (!excludedHeaders.includes(name.toLowerCase())) {
            headers[name] = response.headers[name];
        }
    });

    res.status(response.statusCode).set(headers).send(body);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});