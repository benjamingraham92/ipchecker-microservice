<?php

function findCountry($items)
{
    $ipArray = explode(',', $items);
    $results = [];
    foreach ($ipArray as $ip) {
        $ip = trim($ip);

        if (empty($ip)) {
            $results[] = "Empty input -> invalid";
            continue;
        }
        $countryCode = substr($ip, 0, 3);
        switch ($countryCode) {
            case '100':
                $result = "$ip -> US";
                break;
            case '101':
                $result = "$ip -> UK";
                break;
            case '102':
                $result = "$ip -> China";
                break;
            default:
                $result = "$ip -> Unknown";
                break;
        }
        $results[] = $result;
    }

    $response = implode("\n", $results);
    return $response;
}

#echo findCountry('1000.1111.1111.1111,1010.1111.1111.1111');