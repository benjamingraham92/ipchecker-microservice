// Imports
const axios = require('axios');
const fs = require('fs');
const { getRandomIP } = require('./ipGenerator.js');

// Set up output logs
const logFile = fs.createWriteStream('/usr/src/app/logs/output.log', { flags: 'a' });
function logToFile(message) {
    const timeStamp = new Date().toISOString();
    logFile.write(`[${timeStamp}] ${message}\n`, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
    });
}

// Set up alert logs
const alertFile = fs.createWriteStream('/usr/src/app/logs/alerts.log', { flags: 'a' });
function logAlertToFile(message) {
    const timeStamp = new Date().toISOString();
    alertFile.write(`[${timeStamp}] ALERT: ${message}\n`, (err) => {
        if (err) {
            console.error("Failed to write alert to file:", err);
        }
    });
}

// Override console logs
console.log = logToFile;
console.error = logToFile;

// Declare endpoints and routes for HTTP requests
const reverseProxyURLa = 'http://ipcheckerreverseproxy.40038234.a.qpc.qubcloud.uk/';
const reverseProxyURLb = 'http://ipcheckerreverseproxy.40038234.b.qpc.qubcloud.uk/';

const reverseProxyEndpoints = [reverseProxyURLa, reverseProxyURLb];

const routeTotalIPs = "totalips";
const routeTotalEmptyIPs = "totalemptyips";
const routeTotalValidIPs = "totalvalidips";
const routeClassifyIPs = "classifyips";
const routeFindCountry = "findcountry";
const routeFindBadIPs = "findbadips";

// Send HTTP requests to backend services with randomly generated IP addresses
// Total IPs
async function monitorTotalIPs(index = 0) {
    if (index >= reverseProxyEndpoints.length) {
        const errorMessage = "[Total IPs] All servers unavailable. Monitoring Total IPs failed.";
        console.error(errorMessage);
        logAlertToFile(errorMessage);
        return;
    }

    const ips = new Array(5);
    ips[0] = getRandomIP("valid ipv4");
    ips[1] = getRandomIP("invalid ipv4");
    ips[2] = getRandomIP("valid ipv6");
    ips[3] = getRandomIP("invalid ipv6");
    ips[4] = getRandomIP("empty");

    const items = ips.join(",");
    const expectedTotalIPs = 2;
    const startTime = Date.now();
    const monitoringURL = reverseProxyEndpoints[index] + routeTotalIPs + "/?items=" + items;

    axios.get(monitoringURL)
        .then(response => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`[Total IPs] Response time: ${responseTime}ms`);
            const data = response.data;
            if (data.total_ips === expectedTotalIPs) {
                console.log("[Total IPs] Monitoring passed: Correct number of total IPs.");
            } else {
                const errorMessage = `[Total IPs] Monitoring failed:\nExpected\n${expectedTotalIPs}\nActual\n${data.total_ips}.`;
                console.error(errorMessage);
                logAlertToFile(errorMessage);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.error(`[Total IPs] Client error: ${error.response.status} = ${error.response.statusText}`);
                logAlertToFile(`Monitoring failed with status ${error.response.status}: ${error.response.statusText}`);
            } else {
                return monitorTotalIPs(index + 1);
            }
        });
}

// Total Empty IPs
async function monitorTotalEmptyIPs(index = 0) {
    if (index >= reverseProxyEndpoints.length) {
        const errorMessage = "[Total Empty IPs] All servers unavailable. Monitoring Total Empty IPs failed.";
        console.error(errorMessage);
        logAlertToFile(errorMessage);
        return;
    }

    const ips = new Array(5);
    ips[0] = getRandomIP("empty");
    ips[1] = getRandomIP("valid ipv4");
    ips[2] = getRandomIP("empty");
    ips[3] = getRandomIP("invalid ipv6");
    ips[4] = getRandomIP("empty");

    const items = ips.join(",");
    const expectedTotalEmptyIPs = 3;
    const startTime = Date.now();
    const monitoringURL = reverseProxyEndpoints[index] + routeTotalEmptyIPs + "/?items=" + items;

    axios.get(monitoringURL)
        .then(response => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`[Total Empty IPs] Response time: ${responseTime}ms`);
            const data = response.data;
            if (data.total_empty_ips === expectedTotalEmptyIPs) {
                console.log("[Total Empty IPs] Monitoring passed: Correct number of total empty IPs.");
            } else {
                const errorMessage = `[Total Empty IPs] Monitoring failed:\nExpected\n${expectedTotalEmptyIPs}\nActual\n${data.total_empty_ips}.`;
                console.error(errorMessage);
                logAlertToFile(errorMessage);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.error(`[Total Empty IPs] Client error: ${error.response.status} = ${error.response.statusText}`);
                logAlertToFile(`Monitoring failed with status ${error.response.status}: ${error.response.statusText}`);
            } else {
                return monitorTotalEmptyIPs(index + 1);
            }
        });
}

// Total Valid IPs
async function monitorTotalValidIPs(index = 0) {
    if (index >= reverseProxyEndpoints.length) {
        const errorMessage = "[Total Valid IPs] All servers unavailable. Monitoring Total Valid IPs failed.";
        console.error(errorMessage);
        logAlertToFile(errorMessage);
        return;
    }

    const ips = new Array(5);
    ips[0] = getRandomIP("invalid ipv4");
    ips[1] = getRandomIP("valid ipv4");
    ips[2] = getRandomIP("empty");
    ips[3] = getRandomIP("invalid ipv6");
    ips[4] = getRandomIP("valid ipv6");

    const items = ips.join(",");
    const expectedTotalValidIPs = 2;
    const expectedResults = `${ips[0]} -> invalid\n${ips[1]} -> valid\nEmpty input -> invalid\n${ips[3]} -> invalid\n${ips[4]} -> valid`;
    const startTime = Date.now();
    const monitoringURL = reverseProxyEndpoints[index] + routeTotalValidIPs + "/?items=" + items;

    axios.get(monitoringURL)
        .then(response => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`[Total Valid IPs] Response time: ${responseTime}ms`);
            const data = response.data;
            if ((data.total_valid_ips === expectedTotalValidIPs) && (data.results === expectedResults)) {
                console.log("[Total Valid IPs] Monitoring passed: Correct number and results for total valid IPs.");
            } else {
                const errorMessage = `[Total Valid IPs] Monitoring failed:\nExpected\nCount: ${expectedTotalValidIPs}\nResults:\n${expectedResults}\nActual\nCount: ${data.total_valid_ips}\nResults:\n${data.results}.`;
                console.error(errorMessage);
                logAlertToFile(errorMessage);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.error(`[Total Valid IPs] Client error: ${error.response.status} = ${error.response.statusText}`);
                logAlertToFile(`Monitoring failed with status ${error.response.status}: ${error.response.statusText}`);
            } else {
                return monitorTotalValidIPs(index + 1);
            }
        });
}

// Classify IPs
async function monitorClassifyIPs(index = 0) {
    if (index >= reverseProxyEndpoints.length) {
        const errorMessage = "[Classify IPs] IPs] All servers unavailable. Monitoring Classify IPs failed.";
        console.error(errorMessage);
        logAlertToFile(errorMessage);
        return;
    }

    const ips = new Array(5);
    ips[0] = getRandomIP("invalid ipv4");
    ips[1] = getRandomIP("valid ipv4");
    ips[2] = getRandomIP("empty");
    ips[3] = getRandomIP("invalid ipv6");
    ips[4] = getRandomIP("valid ipv6");

    const items = ips.join(",");
    const expectedClassifiedIPs = `${ips[0]} -> invalid\n${ips[1]} -> IPv4\nEmpty input -> invalid\n${ips[3]} -> invalid\n${ips[4]} -> IPv6`;
    const startTime = Date.now();
    const monitoringURL = reverseProxyEndpoints[index] + routeClassifyIPs + "/?items=" + items;

    axios.get(monitoringURL)
        .then(response => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`[Classify IPs] Classify IPs response time: ${responseTime}ms`);
            const data = response.data;
            if (data.classified_ips === expectedClassifiedIPs) {
                console.log("[Classify IPs] Monitoring passed: Correctly classified IPs.");
            } else {
                const errorMessage = `[Classify IPs] Monitoring failed:\nExpected\n${expectedClassifiedIPs}\nActual\n${data.classified_ips}.`;
                console.error(errorMessage);
                logAlertToFile(errorMessage);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.error(`[Classify IPs] Client error: ${error.response.status} = ${error.response.statusText}`);
                logAlertToFile(`Monitoring failed with status ${error.response.status}: ${error.response.statusText}`);
            } else {
                return monitorClassifyIPs(index + 1);
            }
        });
}

// Find Country
async function monitorFindCountry(index = 0) {
    if (index >= reverseProxyEndpoints.length) {
        const errorMessage = "[Find Country] All servers unavailable. Monitoring Find Country failed.";
        console.error(errorMessage);
        logAlertToFile(errorMessage);
        return;
    }

    const ips = new Array(5);
    ips[0] = getRandomIP("invalid country");
    ips[1] = getRandomIP("valid country china");
    ips[2] = getRandomIP("empty");
    ips[3] = getRandomIP("valid country us");
    ips[4] = getRandomIP("valid country uk");

    const items = ips.join(",");
    const expectedCountries = `${ips[0]} -> Unknown\n${ips[1]} -> China\nEmpty input -> invalid\n${ips[3]} -> US\n${ips[4]} -> UK`;
    const startTime = Date.now();
    const monitoringURL = reverseProxyEndpoints[index] + routeFindCountry + "/?items=" + items;

    axios.get(monitoringURL)
        .then(response => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`[Find Country] Find Country response time: ${responseTime}ms`);
            const data = response.data;
            if (data.ip_countries === expectedCountries) {
                console.log("[Find Country] Monitoring passed: Correctly found countries.");
            } else {
                const errorMessage = `[Find Country] Monitoring failed:\nExpected\n${expectedCountries}\nActual\n${data.ip_countries}.`;
                console.error(errorMessage);
                logAlertToFile(errorMessage);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.error(`[Find Country] Client error: ${error.response.status} = ${error.response.statusText}`);
                logAlertToFile(`Monitoring failed with status ${error.response.status}: ${error.response.statusText}`);
            } else {
                return monitorFindCountry(index + 1);
            }
        });
}

// Find Bad IPs
async function monitorFindBadIPs(index = 0) {
    if (index >= reverseProxyEndpoints.length) {
        const errorMessage = "[Find Bad IPs] All servers unavailable. Monitoring Find Bad IPs failed.";
        console.error(errorMessage);
        logAlertToFile(errorMessage);
        return;
    }

    const ips = new Array(5);
    ips[0] = getRandomIP("invalid bad");
    ips[1] = getRandomIP("valid bad");
    ips[2] = getRandomIP("valid bad");
    ips[3] = getRandomIP("invalid bad");
    ips[4] = getRandomIP("invalid bad");

    const items = ips.join(",");
    const expectedBadIPs = `${ips[0]} -> Good IP\n${ips[1]} -> Bad IP\n${ips[2]} -> Bad IP\n${ips[3]} -> Good IP\n${ips[4]} -> Good IP\n`;
    const startTime = Date.now();
    const monitoringURL = reverseProxyEndpoints[index] + routeFindBadIPs + "/?items=" + items;

    axios.get(monitoringURL)
        .then(response => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            console.log(`[Find Bad IPs] Find Bad IPs response time: ${responseTime}ms`);
            const data = response.data;
            if (data.results === expectedBadIPs) {
                console.log("[Find Bad IPs] Monitoring passed: Correctly found bad IPs.");
            } else {
                const errorMessage = `[Find Bad IPs] Monitoring failed:\nExpected\n${expectedBadIPs}\nActual\n${data.results}.`;
                console.error(errorMessage);
                logAlertToFile(errorMessage);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.error(`[Find Bad IPs] Client error: ${error.response.status} = ${error.response.statusText}`);
                logAlertToFile(`Monitoring failed with status ${error.response.status}: ${error.response.statusText}`);
            } else {
                return monitorFindBadIPs(index + 1);
            }
        });
}

// Execute monitoring sequentially to create ordered logs
async function monitorAll() {
    try {
        await monitorTotalIPs();
        await monitorTotalEmptyIPs();
        await monitorTotalValidIPs();
        await monitorClassifyIPs();
        await monitorFindCountry();
        await monitorFindBadIPs();
    } catch (error) {
        console.error("Monitoring failed:", error);
    }
}

function startMonitoring() {
    setInterval(() => {
        monitorAll();
    }, 60000);
}

startMonitoring();