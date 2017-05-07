<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//include APPPATH . 'third_party/OAuth2/Autoloader.php';

/**
 * Created by PhpStorm.
 * User: cliff
 * Date: 30/01/2017
 * Time: 14:13
 */
class Login extends CI_Controller
{
    function __construct()
    {

        header('Content-type: application/json');
    	header('Access-Control-Allow-Origin: *');
   		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    	$method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    };
        parent::__construct();
        $this->load->model('Login_model');
        $this->load->model('Time_frames_model');
        $this->load->library('datatables');
//        $this->load->library("Server", "server");
    }

    public function index()
    {

        //print_r(json_decode(file_get_contents('php://input')));
        $Data = json_decode(trim(file_get_contents('php://input')), true);

    //    $mockData=array(
    //        "email"=>"manager@admin.com",
    //        "password"=>"1234"
    //    );
    //    $Data=$mockData;

        $validatedData=$this->dataValidate($Data);


        if(0!=$validatedData){
            $this->userAuth($validatedData);
        }

    }

    public function dataValidate($Data){

        if(empty($Data)){

            echo json_encode( $this->create_error_messageArray("Message Empty"));

            return 0;

        }else {

            if (empty($Data['email'])) {
                echo json_encode($this->create_error_messageArray("Email Empty"));
                return 0;
            } elseif (empty($Data['password'])) {
                echo json_encode($this->create_error_messageArray("password Empty"));
                return 0;
            } else {
                $loginArray = array(
                    "email" => $Data['email'],
                    "password" => $Data['password']
                );
                return $loginArray;
            }
        }


    }




    public function create_error_messageArray($message){
        $tempMessageArray=array(
            "statu"=>"error",
            "errorMassage"=>$message
        );
        return $tempMessageArray;
    }



    public function userAuth($data){
        $result=$this->Login_model->getUserDetails($data);

        if(empty($result)){
            echo json_encode($this->create_error_messageArray("Email or Password Error"));
        }else{
            $postArray=$this->success_user_info($result);
            //var_dump($result);

            echo json_encode($postArray);
        }


       // return $result;
    }

    public function success_user_info($userInfo){
        $tempMessageArray=array(
//            "user_id"=>$userInfo['user_id'],
//            "email"=>$userInfo['email'],
//            "username"=>$userInfo['username'],
//            "account_status"=>$userInfo['account_status'],
//            "first_name"=> $userInfo['first_name'],
//            "last_name"=> $userInfo['last_name'],
//            "dob"=> $userInfo['dob'],
//            "mobile_number"=> $userInfo['mobile_number'],
//            "user_details_id"=>$userInfo['user_details_id'],
//            "role_id"=>$userInfo['role_id'],
//            "role"=>$userInfo['role'],
//
            "user_id"=>$userInfo->user_id,
            "email"=>$userInfo->email,
            "username"=>$userInfo->username,
            "account_status"=>$userInfo->account_status,
            "first_name"=> $userInfo->first_name,
            "last_name"=> $userInfo->last_name  ,
            "dob"=> $userInfo->dob ,
            "mobile_number"=> $userInfo->mobile_number,
            "user_details_id"=>$userInfo->user_details_id,
            "role_id"=>$userInfo->role_id,
            "role"=>$userInfo->role  ,
        );

        $currentTimeFrame=[];

        $currentTimeFrame = $this->findRangeFromToday();

        $inforArray=array(
            "status"=>'Success',
            "data" =>$tempMessageArray,
            "time_frame" =>$currentTimeFrame,
        );


        return $inforArray;

    }

    public function json($resArray) {
        header('Content-Type: application/json');

        echo json_encode($resArray);

    }




    function findRangeFromToday(){
        $timeLine=[];
        $temp=$this->Time_frames_model->getRangeTime();
        if ($temp){
            $timeLine=$temp;
        }
        return $timeLine;



    }








}