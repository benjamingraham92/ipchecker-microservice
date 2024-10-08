<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require('get_total_ips.php');

$output = array(
	"error" => false,
	"items" => "",
	"total_ips" => 0
);

try {
	$items = isset($_REQUEST['items']) ? $_REQUEST['items'] : '';

	if (empty($items)) {
		throw new Exception('Input cannot be empty. Please provide a valid string of IP addresses.', 400);
	}

	$total_ips = getTotalIPs($items);
	$output['items'] = $items;
	$output['total_ips'] = $total_ips;

	http_response_code(200);

} catch (Exception $e) {
	$output['error'] = true;
	$output['items'] = $items;
	$output['response'] = $e->getMessage();
	$output['status'] = $e->getCode() ? $e->getCode() : 500;

	http_response_code($output['status']);
}

echo json_encode($output);
