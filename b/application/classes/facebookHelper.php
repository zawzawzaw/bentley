<?php
class facebookHelper
{
	
	public function parse_signed_request($signed_request, $secret) {
		list($encoded_sig, $payload) = explode('.', $signed_request, 2); 

		## decode the data
		$sig = base64_decode(strtr($encoded_sig, '-_', '+/'));
		$data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
		
		if (strtoupper($data['algorithm']) !== 'HMAC-SHA256') {
			return null;
		}

		// check sig
		$expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
		if ($sig !== $expected_sig) {
			return null;
		}

		return $data;
	}
}
?>
