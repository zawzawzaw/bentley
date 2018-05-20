<?php
class Orders extends Zend_Db_Table
{
	protected $_name = 'orders';
	protected $_primary = 'order_id';

	public function getOrderByQuery($query, $cols=array(), $return='all')
	{
		if(empty($cols) || !is_array($cols)){
			$cols=array('c.customer_id','c.name','c.email','c.address','c.phone','c.date_added','o.order_id','o.customer_id','o.prod_id','o.prod_name','o.amount', 'o.wheel','o.date_added');
		}
		
		$sql = $this->select()->setIntegrityCheck(false)
				->from(array('o'=>$this->_name), array())
				->joinLeft(array('c'=>'customers'), 'c.customer_id=o.customer_id', array())
				->columns($cols);

		// if(empty($query['mod_id']) & empty($query['model']) & empty($query['cat_id']) & empty($query['prod_id']))
		// 	$sql->columns($cols);				
		
		// if(!empty($query['search'])){
		
		// }

		// if(!empty($query['model'])){
		// 	$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
		// 	$sql->columns($cols);
		// 	$sql->where('cm.model_no = ?', $query['model']);
		// }

		// if(!empty($query['cat_id'])){
		// 	$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
		// 	$sql->joinLeft(array('prod'=>'products'), 'prod.cat_id=cat.cat_id', array());
		// 	$sql->joinLeft(array('prices'=>'prices'), 'prices.prod_id=prod.prod_id', array());
		// 	$sql->joinLeft(array('wheels'=>'wheels'), 'wheels.prod_id=prod.prod_id', array());
		// 	$sql->columns($cols);
		// 	$sql->where('cat.cat_id = ?', $query['cat_id']);
		// }

		// if(!empty($query['prod_id'])){
		// 	$sql->joinLeft(array('cat'=>'categories'), 'cat.mod_id=cm.mod_id', array());
		// 	$sql->joinLeft(array('prod'=>'products'), 'prod.cat_id=cat.cat_id', array());
		// 	$sql->joinLeft(array('prices'=>'prices'), 'prices.prod_id=prod.prod_id', array());
		// 	$sql->joinLeft(array('wheels'=>'wheels'), 'wheels.prod_id=prod.prod_id', array());
		// 	$sql->columns($cols);
		// 	$sql->where('prod.prod_id = ?', $query['prod_id']);
		// }
		
		if(!empty($query['search'])){
			$sql->where('o.prod_name LIKE ?', '%'.$query['search'].'%')
				->orWhere('c.name LIKE ?', '%'.$query['search'].'%')
				->orWhere('c.email LIKE ?', '%'.$query['search'].'%');
				// ->orWhere('prod.prod_name LIKE ?', '%'.$query['search'].'%');
		}

		// if(!empty($query['category'])){
		// 	$sql->where('cat.cat_name = ?', $query['category']);
		// }

		// if(!empty($query['product'])){
		// 	$sql->where('prod.prod_name = ?', $query['product']);
		// }

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
}