// Create string of random IP addresses
function getRandomIP(type) {
    if (type === "valid ipv4") {
        let random = new Array(4);
        for (let index = 0; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        return random.join(".");
    }

    if (type === "invalid ipv4") {
        let lengths = [1, 2, 3, 5, 6, 7];
        let random = new Array(lengths[Math.floor(Math.random() * 6)]);
        for (let index = 0; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        return random.join(".");
    }

    if (type === "valid ipv6") {
        let length = Math.floor(Math.random() * 7) + 2;
        let random = new Array(length);
        for (let index = 0; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 65536).toString(16).padStart(4, 0);
        }
        return random.join(":");
    }

    if (type === "invalid ipv6") {
        let lengths = [1, 9];
        let random = new Array(lengths[Math.floor(Math.random() * 2)]);
        for (let index = 0; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 65536).toString(16).padStart(4, 0);
        }
        return random.join(":");
    }

    if (type === "valid country us") {
        let random = new Array(4);
        random[0] = 100;
        for (let index = 1; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        return random.join(".");
    }

    if (type === "valid country uk") {
        let random = new Array(4);
        random[0] = 101;
        for (let index = 1; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        return random.join(".");
    }

    if (type === "valid country china") {
        let random = new Array(4);
        random[0] = 102;
        for (let index = 1; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        return random.join(".");
    }

    if (type === "invalid country") {
        let countryCodes = [100, 101, 102];
        let random = new Array(4);
        for (let index = 0; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        if (countryCodes.includes(random[0])) {
            return getRandomIP(type);
        }
        return random.join(".");
    }

    if (type === "valid bad") {
        let badIps = ["100.200.300.400", "101.201.301.401", "102.202.302.402", "103.203.303.403"];
        return badIps[Math.floor(Math.random() * 4)];
    }

    if (type === "invalid bad") {
        let badIps = ["100.200.300.400", "101.201.301.401", "102.202.302.402", "103.203.303.403"];
        let random = new Array(4);
        for (let index = 0; index < random.length; index++) {
            random[index] = Math.floor(Math.random() * 256);
        }
        let generatedIp = random.join(".");
        if (badIps.includes(generatedIp)) {
            return getRandomIP(type);
        }
        return generatedIp;
    }

    if (type === "empty") {
        return "";
    }
}

module.exports = { getRandomIP };