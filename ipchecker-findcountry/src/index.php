<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require 'find_country.php';

$output = array(
    "error" => false,
    "items" => '',
    "ip_countries" => ''
);

try {
    $items = isset($_REQUEST['items']) ? $_REQUEST['items'] : '';

    if (empty($items)) {
        throw new Exception('Input cannot be empty. Please provide a valid string of IP addresses.', 400);
    }

    $ip_countries = findCountry($items);
    $output['items'] = $items;
    $output['ip_countries'] = $ip_countries;

    http_response_code(200);

} catch (Exception $e) {
    $output['error'] = true;
	$output['items'] = $items;
	$output['response'] = $e->getMessage();
	$output['status'] = $e->getCode() ? $e->getCode() : 500;

	http_response_code($output['status']);
}

echo json_encode($output);
