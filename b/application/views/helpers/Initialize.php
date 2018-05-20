<?php

class Zend_View_Helper_Initialize
{
	function initialize( $view )
	{
		$config = new Zend_Config_Ini( APPLICATION_PATH . '/config.ini', 'general' );
		$sitename = $config->site->name;

		$view->headTitle( $sitename );
		$view->headMeta()->appendHttpEquiv('Content-Type','text/html; charset=UTF-8');
	}

	private function loadStyle( $view )
	{

	}

	private function loadScript( $view )
	{

	}
}