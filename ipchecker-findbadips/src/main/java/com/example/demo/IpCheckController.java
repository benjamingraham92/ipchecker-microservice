/**
 * 
 */
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 
 */
@RestController
public class IpCheckController {

	@Autowired
	private IpCheckerService ipCheckerService;

	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> findBadIPs(@RequestParam(required = false) String items) {
	    
		Map<String, Object> output = new HashMap<>();
		output.put("error", false);
		output.put("items", "");
		output.put("results", "");

		HttpHeaders headers = new HttpHeaders();
		headers.add("Access-Control-Allow-Origin", "*");
		headers.add(HttpHeaders.CONTENT_TYPE, "application/json");

		if (items == null || items.isEmpty()) {
			output.put("error", true);
			output.put("response", "Please provide input");
			output.put("status", 400);
			headers.add("Access-Control-Allow-Origin", "*");
			headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
			return new ResponseEntity<>(output, headers, HttpStatus.BAD_REQUEST);
		}

		try {
			String results = ipCheckerService.findBadIPs(items);
			System.err.println("Output map: " + results);
			output.put("items", items);
			output.put("results", results);

			return new ResponseEntity<>(output, headers, HttpStatus.OK);

		} catch (Exception e) {
			output.put("error", true);
			output.put("response", "An unexpected error occurred: " + e.getMessage());
			output.put("status", 500);

			return new ResponseEntity<>(output, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
