package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class IpCheckerService {

    public String findBadIPs(String items) {
    	
        if (items.trim().isEmpty()) {
            return "No IPs were processed.";
        }

        String[] badIPs = { "100.200.300.400", "101.201.301.401", "102.202.302.402", "103.203.303.403" };
        String[] ipArray = items.split(",", -1);
        ArrayList<String> results = new ArrayList<>();
        
        for (String ip : ipArray) {
        	
        	ip = ip.trim();

            if (ip.isEmpty() || ip.equals("") || ip == null){
                results.add("Empty input -> invalid");
                continue;
            }

            boolean isBad = false;
            for (String badIP : badIPs) {
                if (ip.equals(badIP)) { 
                    results.add(ip + " -> Bad IP");
                    isBad = true;
                    break;
                }
            }
            if (!isBad) {
                results.add(ip + " -> Good IP");
            }
        }
        
        return String.join("\n", results);
    }

   /*
    public static void main(String[] args) {
        IpCheckerService service = new IpCheckerService();
        String testItems = ",102.202.302.402, 192.168.1.1, 103.203.303.403";
        String result = service.findBadIPs(testItems);
        System.out.println("Result:\n" + result);
    }
  */
}

