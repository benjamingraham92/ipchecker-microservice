from validate_ips import validate_ips

ipv4_valid = '4444.4444.4444.4444'
ipv4_invalid_lower = '3333.3333.3333'
ipv4_invalid_upper = '5555.5555.5555.5555.5555'

ipv6_valid_lower = '222:222'
ipv6_valid_mid = '5555:55:5555:55:55'
ipv6_valid_upper = '88:88:88:88:88:88:88:88'
ipv6_invalid_lower = '11'
ipv6_invalid_upper = '99:99:99:99:99:99:99:99:99'

invalid_input = '222;222;222'
empty_input = ', ,  '

def assert_ip_validation(input, expected_count, expected_result):
    
    actual = validate_ips(input)
    
    assert actual['count'] == expected_count
    assert actual['results'] == expected_result

def test_validate_ipv4_valid():
    
    input = ipv4_valid
    expected_count = 1
    expected_result = '4444.4444.4444.4444 -> valid'
    
    assert_ip_validation(input, expected_count, expected_result)
    
def test_validate_ipv4_invalid():
    
    input = ipv4_invalid_lower + ',' + ipv4_invalid_upper
    expected_count = 0
    expected_result = '3333.3333.3333 -> invalid\n5555.5555.5555.5555.5555 -> invalid'
    
    assert_ip_validation(input, expected_count, expected_result)


def test_validate_ipv6_valid():
    
    input = ipv6_valid_lower + ',' + ipv6_valid_mid + ',' + ipv6_valid_upper
    expected_count = 3
    expected_result = '222:222 -> valid\n5555:55:5555:55:55 -> valid\n88:88:88:88:88:88:88:88 -> valid'
    
    assert_ip_validation(input, expected_count, expected_result)

def test_validate_ipv6_invalid():
    
    input = ipv6_invalid_lower + ',' + ipv6_invalid_upper
    expected_count = 0
    expected_result = '11 -> invalid\n99:99:99:99:99:99:99:99:99 -> invalid'
    
    assert_ip_validation(input, expected_count, expected_result)

def test_validate_ip_invalid():
    
    input = invalid_input
    expected_count = 0
    expected_result = '222;222;222 -> invalid'
    
    assert_ip_validation(input, expected_count, expected_result)
    
def test_validate_empty_input():
    
    input = empty_input
    expected_count = 0
    expected_result = 'Empty input -> invalid\nEmpty input -> invalid\nEmpty input -> invalid'
    
    assert_ip_validation(input, expected_count, expected_result)
