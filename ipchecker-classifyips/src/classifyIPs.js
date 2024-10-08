const classifyIPs = (items) => {

    results = [];
    ipArray = items.split(',');

    ipArray.forEach(ip =>{
        ip = ip.trim();

        if (ip === ''){
            results.push('Empty input -> invalid');
            return;
        }
        
        if (ip.includes('.')){
            ipGroups = ip.split('.');
            if (ipGroups.length === 4){
                results.push(ip + ' -> IPv4');
            } else {
                results.push(ip + ' -> invalid');
            }
        } else if (ip.includes(':')){
            ipGroups = ip.split(':');
            if (ipGroups.length > 1 && ipGroups.length < 9){
                results.push(ip + ' -> IPv6');
            } else {
                results.push(ip + ' -> invalid');
            }
        } else {
            results.push(ip + ' -> invalid');
        }
    });

    const response = results.join('\n');
    return response;
}

module.exports = classifyIPs;

// console.log(classifyIPs('1212.1212.1212.1212,222:333:22:222:222:2,11.11'));