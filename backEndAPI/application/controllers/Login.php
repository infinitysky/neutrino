<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Content-type: application/json');
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
        parent::__construct();
        $this->load->model('Login_model');
        $this->load->library('datatables');
//        $this->load->library("Server", "server");
    }

    public function index()
    {

        //print_r(json_decode(file_get_contents('php://input')));
        $Data = json_decode(trim(file_get_contents('php://input')), true);

       $mockData=array(
           "email"=>"manager@admin.com",
           "password"=>"1234"
       );
       $Data=$mockData;

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
            "user_id"=>$userInfo[0]['user_id'],
            "email"=>$userInfo[0]['email'],
            "username"=>$userInfo[0]['username'],
            "account_status"=>$userInfo[0]['account_status'],
            "first_name"=> $userInfo[0]['first_name'],
            "last_name"=> $userInfo[0]['last_name'],
            "dob"=> $userInfo[0]['dob'],
            "mobile_number"=> $userInfo[0]['mobile_number'],

            "statu"=>"success"

        );
        return $tempMessageArray;

    }







}