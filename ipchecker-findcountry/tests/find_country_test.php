<?php

use PHPUnit\Framework\TestCase;

class IpCountryTest extends TestCase
{

    public function testInvalidCountry()
    {
        $input = '1111.1111.1111.1111';
        $actual = findCountry($input);
        $expected = '1111.1111.1111.1111 -> Unknown';
        $this->assertEquals($expected, $actual);
    }

    public function testValidCountries()
    {
        $input = '1000.0000.0000.0000,1010.1111.1111.1111,1020:2222:2222:2222';
        $actual = findCountry($input);
        $expected = "1000.0000.0000.0000 -> US\n1010.1111.1111.1111 -> UK\n1020:2222:2222:2222 -> China";
        $this->assertEquals($expected, $actual);
    }

    public function testValidInvalidCountries(){
        $input = '1001.0000.0000.0000,3333:3333,1022:2222:2333';
        $actual = findCountry($input);
        $expected = "1001.0000.0000.0000 -> US\n3333:3333 -> Unknown\n1022:2222:2333 -> China";
        $this->assertEquals($expected, $actual);
    }

    public function testEmptyInput(){
        $input = '1111.1111.1111.1111,,1000:0000';
        $actual = findCountry($input);
        $expected = "1111.1111.1111.1111 -> Unknown\nEmpty input -> invalid\n1000:0000 -> US";
        $this->assertEquals($expected, $actual);
    }
}