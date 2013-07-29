<?php

date_default_timezone_set('Asia/Singapore');

// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/application'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'general'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
	realpath(APPLICATION_PATH . '/classes'),
	realpath(APPLICATION_PATH . '/models'),
	realpath(APPLICATION_PATH . '/../../../../library'),
    get_include_path(),
)));

require_once 'Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->setFallbackAutoloader(true);

/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
	APPLICATION_ENV,
	APPLICATION_PATH . '/config.ini'
);

try 
{
	$front = Zend_Controller_Front::getInstance();
	$front->registerPlugin(new Initialize(APPLICATION_ENV))
      ->addControllerDirectory(APPLICATION_PATH . '/controllers')
	  ->dispatch();
}catch(Exception $exception) 
{
	// an exception has occurred after the ErrorController's postdispatch() has run
	$msg = $exception->getMessage(); 
	$trace = $exception->getTraceAsString();
	echo "<div>Error: $msg<p><pre>$trace</pre></p></div>"; 
}
