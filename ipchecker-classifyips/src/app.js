const express = require('express');
const classifyIPs = require('./classifyIPs.js');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {

    const output = {
        'error': false,
        'items': '',
        'classified_ips': '',
    };

    try {
        const items = req.query.items;

        if (!items) {
            output['error'] = true;
            output['response'] = 'Input cannot be empty. Please provide a valid string of IP addresses.';
            output['status'] = 400;
            res.set({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            res.status(400).json(output);
            return;
        }

        const classifiedIPs = classifyIPs(items);
        output['items'] = items;
        output['classified_ips'] = classifiedIPs;

    } catch (error) {
        output['error'] = true;
        output['response'] = error.message;
        output['status'] = 500;
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        res.status(500).json(output);
        return;
    }

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    });

    res.json(output);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);