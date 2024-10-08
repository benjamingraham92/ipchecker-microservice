<?php

use PHPUnit\Framework\TestCase;

class IpEmptyTest extends TestCase {

    public function testNoEmptyIps() {
        $input = '1111.1111.1111.1111,2222.2222.2222.2222';
        $actual = getTotalEmptyIPs($input);
        $expected = 0;
        $this->assertEquals($expected, $actual);
    }

    public function testOneEmptyIp(){
        $input = '1111.1111.1111.1111,,2222.2222.2222.2222';
        $actual = getTotalEmptyIPs($input);
        $expected = 1;
        $this->assertEquals($expected, $actual);
    }

    public function testMultipleEmptyIps() {
        $input = '1111:1111:1111,,,,2222.2222.2222.2222';
        $actual = getTotalEmptyIPs($input);
        $expected = 3;
        $this->assertEquals($expected, $actual);
    }

    public function testAllEmptyIps() {
        $input = ',,';
        $actual = getTotalEmptyIPs($input);
        $expected = 3;
        $this->assertEquals($expected, $actual);
    }

    public function testEmptyInput(){
        $input = '';
        $actual = getTotalEmptyIPs($input);
        $expected = 1;
        $this->assertEquals($expected, $actual);
    }
}