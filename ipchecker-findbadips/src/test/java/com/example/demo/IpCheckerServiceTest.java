package com.example.demo;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class IpCheckerServiceTest {

	IpCheckerService ipCheckerService;
	String[] badIPs = new String[5];
	String badIPa, badIPb, badIPc, badIPd;
	String goodIPv4, goodIPv6;
	String multipleEmptyIPs, emptyInput;

	@BeforeEach
	void setUp() throws Exception {
		ipCheckerService = new IpCheckerService();
		
		badIPs[0] = "100.200.300.400";
		badIPs[1] = "101.201.301.401";
		badIPs[2] = "102.202.302.402";
		badIPs[3] = "103.203.303.403";

		badIPa = badIPs[0];
		badIPb = badIPs[1];
		badIPc = badIPs[2];
		badIPd = badIPs[3];

		goodIPv4 = "100.200.300.401";
		goodIPv6 = "101:201:301:401";
		
		multipleEmptyIPs = ", ,  ";
		emptyInput = "";

	}
	
	private void assertIPvalidation(String input, String expected) {
		String actual = ipCheckerService.findBadIPs(input);
		assertEquals(expected, actual);
	}

	@Test
	void testFindBadIPsWithBadIPs() {
		String input = badIPa + "," + badIPb + "," + badIPc + "," + badIPd;
		String expected = "100.200.300.400 -> Bad IP\n101.201.301.401 -> Bad IP\n102.202.302.402 -> Bad IP\n103.203.303.403 -> Bad IP";
		assertIPvalidation(input, expected);
	}
	
	@Test
	void testFindBadIPsWithGoodIPs() {
		String input = goodIPv4 + "," + goodIPv6;
		String expected = "100.200.300.401 -> Good IP\n101:201:301:401 -> Good IP";
		assertIPvalidation(input, expected);
	}
	
	@Test
	void testFindBadIPsWithGoodAndBadIPs() {
		String input = goodIPv4 + "," + badIPa + "," + goodIPv6 + "," + badIPb;
		String expected = "100.200.300.401 -> Good IP\n100.200.300.400 -> Bad IP\n101:201:301:401 -> Good IP\n101.201.301.401 -> Bad IP";
		assertIPvalidation(input, expected);
	}
	
	@Test
	void testFindBadIPsWithMultipleEmptyIPs() {
		String input = multipleEmptyIPs;
		String expected = "Empty input -> invalid\nEmpty input -> invalid\nEmpty input -> invalid";
		assertIPvalidation(input, expected);
	}
	
	@Test
	void testFindBadIPsWithEmptyInput() {
		String input = emptyInput;
		String expected = "No IPs were processed.";
		assertIPvalidation(input, expected);
	}
	
	@Test
	void testFindBadIPs() {
		String input = "100.200.300.400,111.111.111.111,";
		String expected = "100.200.300.400 -> Bad IP\n111.111.111.111 -> Good IP\nEmpty input -> invalid";
		assertIPvalidation(input, expected);
	}
	

}
