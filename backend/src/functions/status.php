<?php

	function setHttpStatus($status = 200, $message = null){
		switch ($status) {
			default:
			case 200:
				$status = 'HTTP/1.0 200 OK';
				break;
			case 201:
				$status = 'HTTP/1.0 201 Created';
				break;
			case 400:
				$status = 'HTTP/1.0 400 Bad Request';
				break;
			case 401:
				$status = 'HTTP/1.0 401 Unauthorized';
				break;
			case 404:
				$status = 'HTTP/1.0 404 Not Found';
				break;
			case 405:
				$status = 'HTTP/1.0 405 Method Not Allowed';
				break;
			case 406:
				$status = 'HTTP/1.0 406 Not Acceptable';
				break;
			case 500:
				$status = 'HTTP/1.0 500 Internal Server Error';
				break;
			case 501:
				$status = 'HTTP/1.0 501 Not Implemented';
				break;
			case 503:
				$status = 'HTTP/1.0 503 Service Unavailable';
				break;
		};
		header($status);
		if (!is_null($message)) {
			echo json_encode(['status' => $message]);
		};
	}

?>