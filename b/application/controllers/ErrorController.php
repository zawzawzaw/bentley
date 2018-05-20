<?php

class ErrorController extends Zend_Controller_Action
{
	function init()
    {
        $this->initView();
        $this->view->baseUrl = $this->_request->getBaseUrl();
		$this->view->initialize($this->view);
    }

    function errorAction()
    {
    	$config = new Zend_Config_Ini(APPLICATION_PATH . '/config.ini', 'general');
		$sitename = $config->site->name;
   		$errors = $this->_getParam('error_handler');
        switch ($errors->type) {
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                // 404 error -- controller or action not found
                $this->getResponse()
                     ->setRawHeader('HTTP/1.1 404 Not Found');
                $this->view->Error = $errors;
                $this->view->headMeta()->setName('Description', 'The page you were trying to access on '.$sitename.' Website cannot be found or no longer exists. It is possible that you typed the address incorrectly or that the page has been deleted or removed. Below is a list of links which may help you find what you are looking for.');
                $this->view->headMeta()->setName('Title', $sitename.' – Page not found');
                $this->view->headMeta()->setName('Keywords', $sitename);
                $this->view->headTitle($sitename.' – Page not found','SET');
                $this->view->headTitle()->setSeparator(' - ');
				$this->render('404');
                break;
            default:
            	if($errors['exception']->getCode() == 401)
            	{
            		$this->getResponse()
	                     ->setRawHeader('HTTP/1.1 401 Unauthorised Access');
	                $this->view->Error = $errors;
	                $this->view->headMeta()->setName('Description', 'The page you were trying to access on '.$sitename.' Website cannot be found or no longer exists. It is possible that you typed the address incorrectly or that the page has been deleted or removed. Below is a list of links which may help you find what you are looking for.');
	                $this->view->headMeta()->setName('Title', $sitename.' – Not Authorised');
	                $this->view->headMeta()->setName('Keywords', $sitename);
	                $this->view->headTitle($sitename.' – Not Authorised','SET');
	                $this->render('unauthorised');
            	}else
            	{
	                // application error; display error page, but don't
	                // change status code
	                $this->getResponse()
	                     ->setRawHeader('HTTP/1.1 500 Internal Server Error');
	                $this->view->Error = $errors;
	                $this->view->headMeta()->setName('Description', 'The page you were trying to access on '.$sitename.' Website cannot be found or no longer exists. It is possible that you typed the address incorrectly or that the page has been deleted or removed. Below is a list of links which may help you find what you are looking for.');
	                $this->view->headMeta()->setName('Title', $sitename.' – Problem found');
	                $this->view->headMeta()->setName('Keywords', $sitename);
	                $this->view->headTitle($sitename.' – Problem found','SET');
	                $this->render('applicationerror');
            	}
                break;
        }
    }

}
?>