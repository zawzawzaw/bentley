<?php
class ApiController extends Zend_Controller_Action
{
    function init()
    {
		//echo 'hi'; exit();
        $this->initView();
        Zend_Session::start();
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
    }
	
    function indexAction() {
		
        echo json_encode(array('res'=>'failure'));
    }
	
	function submitAction()
	{
		$return = array('res'=>'failure');

		$request_body = file_get_contents('php://input');
		
		$data = array();
		$json = stripslashes($request_body);
		$formData = json_decode($json, true);
		
		$insertData['name'] = (isset($formData['name'])) ? $formData['name'] : '';
		$insertData['email'] = (isset($formData['email'])) ? $formData['email'] : '';
		$insertData['address'] = (isset($formData['address'])) ? $formData['address'] : '';
		$insertData['phone'] = (isset($formData['phone'])) ? $formData['phone'] : '1';
		$insertData['date_added'] = new Zend_Db_Expr('NOW()');

		
		$c = new Customers();
		
		$error = array();
		if(empty($insertData['name'])) $error[] = 'Missing name';

		if(count($error)==0){
			$insert_id = $c->insert($insertData);

			if($insert_id){
				$return['res'] = 'success';
				$return['id'] = $insert_id;
			}
		}else{
			$return['msg'] = implode(', ', $error);
		}
		
		 echo json_encode($return);
	}

	function saveorderAction()
	{
		$return = array('res'=>'failure');

		$request_body = file_get_contents('php://input');
		
		$data = array();
		$json = $request_body;
		$formData = json_decode($json, true);

		// print_r($formData);
		
		$insertData['customer_id'] = (isset($formData['customer_id'])) ? $formData['customer_id'] : '';
		$insertData['mod_id'] = (isset($formData['mod_id'])) ? $formData['mod_id'] : '';
		$insertData['model_no'] = (isset($formData['model_no'])) ? $formData['model_no'] : '';
		$insertData['cat_id'] = (isset($formData['cat_id'])) ? $formData['cat_id'] : '';
		$insertData['cat_name'] = (isset($formData['cat_name'])) ? $formData['cat_name'] : '';
		$insertData['prod_id'] = (isset($formData['prod_id'])) ? $formData['prod_id'] : '';
		$insertData['prod_name'] = (isset($formData['prod_name'])) ? $formData['prod_name'] : '1';
		$insertData['price_id'] = (isset($formData['price_id'])) ? $formData['price_id'] : '1';
		$insertData['amount'] = (isset($formData['amount'])) ? $formData['amount'] : '1';
		$insertData['option'] = (isset($formData['option'])) ? $formData['option'] : '1';
		$insertData['wheel'] = (isset($formData['wheel'])) ? $formData['wheel'] : '1';
		$insertData['date_added'] = new Zend_Db_Expr('NOW()');

		
		$o = new Orders();
		
		$error = array();
		if(empty($insertData['customer_id'])) $error[] = 'Missing customer_id';
		if(empty($insertData['mod_id'])) $error[] = 'Missing mod_id';
		if(empty($insertData['model_no'])) $error[] = 'Missing model_no';
		if(empty($insertData['cat_id'])) $error[] = 'Missing cat_id';
		if(empty($insertData['cat_name'])) $error[] = 'Missing cat_name';
		if(empty($insertData['prod_id'])) $error[] = 'Missing prod_id';
		if(empty($insertData['prod_name'])) $error[] = 'Missing prod_name';
		if(empty($insertData['price_id'])) $error[] = 'Missing price_id';
		if(empty($insertData['amount'])) $error[] = 'Missing amount';
		
		if(count($error)==0){
			$insert_id = $o->insert($insertData);

			if($insert_id){
				$return['res'] = 'success';
				$return['order_id'] = $insert_id;
			}
		}else{
			$return['msg'] = implode(', ', $error);
		}
		
		 echo json_encode($return);
	}

	function searchuserAction()
	{
		$return = array('res'=>'success');
		$data['search'] = $this->_getParam('search');
		$data['customer_id'] = $this->_getParam('customer_id');
		$query = array();

		$query['search'] = (isset($data['search'])) ? $data['search'] : '';
		$query['customer_id'] = (isset($data['customer_id'])) ? $data['customer_id'] : '';

		if(!empty($query['search']))
			$cols = array('c.customer_id','c.name','c.email','c.address','c.phone','c.date_added');

		if(!empty($query['customer_id']))
			$cols = array('c.cat_id','c.cat_name','c.mod_id','c.model_no','c.customer_id','o.order_id','o.customer_id','o.prod_id','o.prod_name','o.amount', 'o.wheel','o.date_added');

		$o = new Orders();

		$return['usersrecord'] = $o->getOrderByQuery($query);

		echo json_encode($return);
	}
	
	function salesrecordAction()
	{
		$return = array('res'=>'success');
		//$data = json_decode($this->_getParam('data',''), true);
		$data['mod_id'] = $this->_getParam('mod_id');
		$data['cat_id'] = $this->_getParam('cat_id');
		$data['prod_id'] = $this->_getParam('prod_id');
		$data['search'] = $this->_getParam('search');
		$data['model'] = $this->_getParam('model');
		$data['category'] = $this->_getParam('category');
		$data['product'] = $this->_getParam('product');	
		$query = array();
		
		$query['mod_id']	= (isset($data['mod_id']))? $data['mod_id'] : '0';
		$query['model_no']	= (isset($data['model_no']))? $data['model_no'] : '0';
		$query['cat_id']	= (isset($data['cat_id']))? $data['cat_id'] : '0';
		$query['prod_id']	= (isset($data['prod_id']))? $data['prod_id'] : '0';
		$query['search'] = (isset($data['search']))? $data['search'] : '';
		$query['model'] = (isset($data['model']))? $data['model'] : '';
		$query['category'] = (isset($data['category']))? $data['category'] : '';
		$query['product'] = (isset($data['product']))? $data['product'] : '';
		$query['orderby'] = (isset($data['sort']))? $data['sort'] : 'latest';
		$query['page'] = (isset($data['page']))? $data['page'] : '';
		$query['pagelimit'] = (isset($data['pagelimit']))? $data['pagelimit'] : '12';
		
		if(empty($query['mod_id']) && empty($query['model']) && empty($query['cat_id']) && empty($query['prod_id']))
			$cols=array('cm.mod_id','cm.model_no');

		if(!empty($query['mod_id']))
			$cols=array('cm.mod_id','cm.model_no','cat.cat_id','cat.mod_id','cat.cat_name');

		if(!empty($query['cat_id']) || !empty($query['prod_id']))
			$cols=array('cm.mod_id','cm.model_no','cat.cat_id','cat.mod_id','cat.cat_name','prod.prod_id','prod.cat_id','prod.prod_name','prices.price_id','prices.prod_id','prices.amount','prices.option', 'wheel'=>'IF(wheels.wheel_id IS NOT NULL,wheels.wheel,"")');

		// print_r($query); 
		// exit();
		
		## Begin to retrieve submissions.
		$r = new Record();
		$return['salesrecord'] = $r->getRecordByQuery($query, $cols);
		
		unset($query['page']); ## remove the page variable to retrieve full list.
			
		$return['totalsalesrecord'] = $r->getRecordByQuery($query, array('COUNT(cm.mod_id)'), 'one');
		
		echo json_encode($return);
	}
}