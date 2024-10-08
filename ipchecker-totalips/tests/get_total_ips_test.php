<?php

use PHPUnit\Framework\TestCase;

class GetTotalIPsTest extends TestCase {

    public function testSingleIp(){
        $input = '1111.1111.1111.1111';
        $actual = getTotalIPs($input);
        $expected = 1;
        $this->assertEquals($expected, $actual);
    }
    
    public function testMultipleIp(){
        $input = '1111.1111.1111.1111,1111:1111:1111,1111:1111';
        $actual = getTotalIPs($input);
        $expected = 3;
        $this->assertEquals($expected, $actual);
    }

    public function testEmptyIp(){
        $input = '';
        $actual = getTotalIPs($input);
        $expected = 0;
        $this->assertEquals($expected, $actual);
    }

    public function testLeadingTrailingCommas(){
        $input = ',1111.1111.1111.1111,2222:2222:2222,';
        $actual = getTotalIPs($input);
        $expected = 2;
        $this->assertEquals($expected, $actual);
    }

    public function testMixedEmptyEntries(){
        $input = '1111.1111.1111.1111,,2222:2222:2222:2222';
        $actual = getTotalIPs($input);
        $expected = 2;
        $this->assertEquals($expected, $actual);
    }

    public function testInvalidEntries(){
        $input = '1111.1111.1111,,2222:2222:2222:2222:::::';
        $actual = getTotalIPs($input);
        $expected = 0;
        $this->assertEquals($expected, $actual);
    }
}