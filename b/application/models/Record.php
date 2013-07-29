<?php
class Record extends Zend_Db_Table
{
	protected $_name = 'car_models';
	protected $_primary = 'mod_id';

	public function getRecordByQuery($query, $cols=array(), $return='all')
	{
		if(empty($cols) || !is_array($cols)){
			$cols=array('cm.mod_id','cm.model_no','cat.cat_id','cat.mod_id','cat.cat_name','prod.prod_id','prod.cat_id','prod.prod_name','prices.price_id','prices.prod_id','prices.amount', 'wheel'=>'IF(wheels.wheel_id IS NOT NULL,wheels.wheel,"")');
		}
		
		$sql = $this->select()->setIntegrityCheck(false)
				->from(array('cm'=>$this->_name), array());

		if(empty($query['mod_id']) & empty($query['model']) & empty($query['cat_id']) & empty($query['prod_id']))
			$sql->columns($cols);				
		
		if(!empty($query['mod_id'])){
			$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
			$sql->columns($cols);
			$sql->where('cm.mod_id = ?', $query['mod_id']);
		}

		if(!empty($query['model'])){
			$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
			$sql->columns($cols);
			$sql->where('cm.model_no = ?', $query['model']);
		}

		if(!empty($query['cat_id'])){
			$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
			$sql->joinLeft(array('prod'=>'products'), 'prod.cat_id=cat.cat_id', array());
			$sql->joinLeft(array('prices'=>'prices'), 'prices.prod_id=prod.prod_id', array());
			$sql->joinLeft(array('wheels'=>'wheels'), 'wheels.prod_id=prod.prod_id', array());
			$sql->columns($cols);
			$sql->where('cat.cat_id = ?', $query['cat_id']);
		}

		if(!empty($query['prod_id'])){
			$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
			$sql->joinLeft(array('prod'=>'products'), 'prod.cat_id=cat.cat_id', array());
			$sql->joinLeft(array('prices'=>'prices'), 'prices.prod_id=prod.prod_id', array());
			$sql->joinLeft(array('wheels'=>'wheels'), 'wheels.prod_id=prod.prod_id', array());
			$sql->columns($cols);
			$sql->where('prod.prod_id = ?', $query['prod_id']);
		}
		
		if(!empty($query['search'])){
			$sql->where('cm.model_no LIKE ?', '%'.$query['search'].'%')
				->orWhere('cat.cat_name LIKE ?', '%'.$query['search'].'%')
				->orWhere('prod.prod_name LIKE ?', '%'.$query['search'].'%');
		}

		if(!empty($query['category'])){
			$sql->where('cat.cat_name = ?', $query['category']);
		}

		if(!empty($query['product'])){
			$sql->where('prod.prod_name = ?', $query['product']);
		}

		// if(!empty($query['orderby'])){
		// 	if(strtolower($query['orderby'])=='alphabetical'){## A-Z order
		// 		$sql->order(array('cm.mod_id ASC'));
		// 	}		
		// 	else{## latest
		// 		$sql->order(array('cm.mod_id ASC'));
		// 	}
		// }
		
		if(!empty($query['page'])){ ##If EMPTY, all records will be return.(use for pagination to retrieve total number of records)
			$sql->limitPage($query['page'], empty($query['pagelimit'])?'10':$query['pagelimit']);
		}
		
		// $res = $sql->__toString();
		// echo "$res\n"; exit(); 
		
		if($return=='one'){
			return $this->_db->fetchOne($sql);
		}elseif($return=='row'){
			return $this->_db->fetchRow($sql);
		}else{
			return $this->_db->fetchAll($sql);
		}
	}
	
	public function checkIfRegistered( $query, $cols=array() )
	{
		$sql = $this->select()->setIntegrityCheck(false)
				->from(array('n'=>$this->_name), array())
				->columns($cols);
		
		$sql->where('n.fb_id = ?', $query);	

		//$res = $sql->__toString();
		//echo "$res\n"; exit();		
		
		$data = $this->_db->fetchAll($sql);
		
		//print_r($data); exit();
		
		if(!empty($data))
			return true;
		else
			return false;
	}
	
	public function sendEmail($data)
    {
		$emailconfig = new Zend_Config_Ini(APPLICATION_PATH . '/config.ini', 'emails');
			
		$htmlmail = fopen(APPLICATION_PATH.'/emailtemplates/edm.html','r');
		$htmlmailcontent = fread($htmlmail,filesize(APPLICATION_PATH.'/emailtemplates/edm.html'));

		$htmlmailcontent = str_replace('{{recipientname}}',$data['recipientName'], $htmlmailcontent);
		$htmlmailcontent = str_replace('{{sendername}}',$data['senderName'], $htmlmailcontent);
		$htmlmailcontent = str_replace('{{message}}',$data['message'], $htmlmailcontent);
		$htmlmailcontent = str_replace('{{date}}',$data['orderdate'], $htmlmailcontent);
		$query_string = 'id=' . urlencode($data['id']);
		$url = '<a href="http://fsmint.com/fb/confirm.php?' . htmlentities($query_string) . '">';
		$htmlmailcontent = str_replace('{{url}}',$url, $htmlmailcontent);
		
		try{
			$gmailconfig = array(
			'port' => 80,
			'auth' => 'login',
			'username' => 'admin@fsmint.com',
			'password' => 'Latemee21',
			);

			$tr = new Zend_Mail_Transport_Smtp($data['mailserver'], $gmailconfig);
			Zend_Mail::setDefaultTransport($tr);
			$mail = new Zend_Mail();
			$mail->setFrom($data['senderemail'], $data['senderName']);
			$mail->setBodyHtml($htmlmailcontent);
			$mail->addTo($data['recipientemail'], $data['recipientName']);
			$mail->addBcc('zawzawzaw@gmail.com', 'zawzaw');
			$mail->addBcc('mabaydar@gmail.com', 'lulu');

			$mail->setSubject($data['subject']);
			$result= $mail->send($tr);
		}catch(Exception $ex){
			echo $ex;
		}

		return $result;
    }
}
?>
