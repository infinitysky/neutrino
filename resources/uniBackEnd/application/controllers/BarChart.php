<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
/**
 * Created by IntelliJ IDEA.
 * User: cliff
 * Date: 1/24/2017
 * Time: 4:01 PM
 */
class BarChart extends CI_Controller
{
	public function index()
	{
		$saArray=array(65, 59, 80, 81, 56, 55, 40);
		$sbArray=array(28, 48, 40, 19, 86, 27, 90);
		$scArray=array(18, 48, 77, 9, 100, 27, 40);

		$sendArray=array(
			'Sa'=>$saArray,
			'Sb'=>$sbArray,
			'Sc'=>$scArray,
		);
		echo json_encode($sendArray);
	//	$this->load->view('welcome_message');
	}

}
