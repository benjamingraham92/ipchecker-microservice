const classifyIPs = require('../src/classifyIPs');

const ipv4Valid = '4444.4444.4444.4444';
const ipv4InvalidLower = '3333.3333.3333';
const ipv4InvalidUpper = '5555.5555.5555.5555.5555';

const ipv6ValidLower = '222:222';
const ipv6ValidMid = '5555:55:5555:55:55';
const ipv6ValidUpper = '88:88:88:88:88:88:88:88';
const ipv6InvalidLower = '11';
const ipv6InvalidUpper = '99:99:99:99:99:99:99:99:99';

const invalidInput = '222;222;222';
const emptyInput = ', ,  ';

const assertIPValidation = (input, expected) => {
    const actual = classifyIPs(input);
    expect(actual).toBe(expected);
};

test('classifies valid IPv4 addresses', () => {
    const input = ipv4Valid;
    const expected = '4444.4444.4444.4444 -> IPv4';
    assertIPValidation(input, expected);
});

test('classifies invalid IPv4 addresses', () => {
    const input = ipv4InvalidLower + ',' + ipv4InvalidUpper;
    const expected = '3333.3333.3333 -> invalid\n5555.5555.5555.5555.5555 -> invalid';
    assertIPValidation(input, expected);
});

test('classifies valid IPv6 addresses', () => {
    const input = ipv6ValidLower + ',' + ipv6ValidMid + ',' + ipv6ValidUpper;
    const expected = '222:222 -> IPv6\n5555:55:5555:55:55 -> IPv6\n88:88:88:88:88:88:88:88 -> IPv6';
    assertIPValidation(input, expected);
});

test('classifies invalid IPv6 addresses', () => {
    const input = ipv6InvalidLower + ',' + ipv6InvalidUpper;
    const expected = '11 -> invalid\n99:99:99:99:99:99:99:99:99 -> invalid';
    assertIPValidation(input, expected);
});

test('classifies invalid input', () => {
    const input = invalidInput;
    const expected = '222;222;222 -> invalid';
    assertIPValidation(input, expected);
});

test('classifies empty input', () => {
    const input = emptyInput;
    const expected = 'Empty input -> invalid\nEmpty input -> invalid\nEmpty input -> invalid';
    assertIPValidation(input, expected);
});