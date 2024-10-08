<?php
function getTotalIPs($items)
{
  // iterate through ips
  // trim ips
  // determine if empty
  // determine if invalid

  $ipArray = explode(",", $items);
  $count = 0;

  foreach ($ipArray as $ip) {

    $ip = trim($ip);

    if (empty($ip)) {
      continue;
    }

    if (strpos($ip, ".") !== false) {
      $ipGroups = explode(".", $ip);
      if (count($ipGroups) == 4) {
        $count += 1;
      }
    } else if (strpos($ip, ":") !== false) {
      $ipGroups = explode(":", $ip);
      if (count($ipGroups) >= 2 && count($ipGroups) < 9) {
        $count += 1;
      }
    } else {
      continue;
    }
  }
  
  return $count;
}
