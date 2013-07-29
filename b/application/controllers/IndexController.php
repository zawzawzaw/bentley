<?php
class IndexController extends Zend_Controller_Action
{
    function init() { }

   /* function preDispatch()
    {
        $this->_redirect('api');
    }*/

    function indexAction()
    {
        $this->_redirect('api');
    }
}