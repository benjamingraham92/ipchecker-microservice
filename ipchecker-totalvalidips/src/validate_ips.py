
def validate_ips(items):
    """ 
    Valildates both IPv4 and IPv6 from a comma-separated string of items.

    Args: 
        items (str): comma-separated string of IP addresses

    Returns:
        str: Concatenated string of IP addresses with validation results
    """
    response = {
        'count': 0,
        'results': ''
    }
    
    results = []
    ipArray = items.split(',')
    count = 0

    for ip in ipArray:
        ip = ip.strip()
        
        if ip == '':
            results.append('Empty input -> invalid')
            continue
        
        if '.' in ip:
            ipGroups = ip.split('.')
            if len(ipGroups) == 4:
                results.append('{} -> valid'.format(ip))
                count += 1         
            else:
                results.append('{} -> invalid'.format(ip))
        elif ':' in ip:
            ipGroups = ip.split(':')
            if len(ipGroups) > 1 and len(ipGroups) < 9:
                results.append('{} -> valid'.format(ip))
                count += 1 
            else:
                results.append('{} -> invalid'.format(ip))
        else:
            results.append('{} -> invalid'.format(ip))
    
    resultsString = '\n'.join(results)
    response['count'] = count
    response['results'] = resultsString
    return response


#print(validateIPs('122.44.5454.45,,2332:56:3455:222:987'))