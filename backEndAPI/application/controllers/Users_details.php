<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_details extends CI_Controller
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


        header('Content-type: application/json');
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }

        parent::__construct();
        $this->load->model('Users_details_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
    }

    public function index()
    {
        $this->getall();
    }

    public function getall()
    {
        $tempData=$this->Users_details_model->get_all();
        echo $this->json($tempData);
    }


    public function json($resArray) {
        header('Content-Type: application/json');
        $outputMessageArray=array(
            "status"=>"success",
            "data"=>$resArray
        );
        echo json_encode($outputMessageArray);
    }


    public function create_error_messageArray($message){
        $tempMessageArray=array(
            "status"=>"error",
            "errorMassage"=>$message
        );
        return $tempMessageArray;
    }

    public function dataValidate($Data){
        if(empty($Data)){
            echo json_encode( $this->create_error_messageArray("Message Empty"));
            return 0;
        }
        else {
            if(empty($Data['user_id'])){
                echo json_encode( $this->create_error_messageArray("user_id Empty"));
            return 0;
            }else{
                $processArray = array(
                    'first_name' => $Data['first_name'],
                    'last_name' => $Data['last_name'],
                    'dob'=>$Data['dob'],
                    'mobile_number' => $Data['mobile_number'],
                    'user_id' => $Data['user_id'],
                    'position' => $Data['position'],
                );
                return $processArray;
            }

        }

    }

    //Main entrance
    public function items($id)
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);
        //GET, POST, OPTIONS, PUT, DELETE
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }elseif ($method == "GET"){

            $this->read($id);
        }elseif ($method == "PUT"){

            $this->update($id,$Data);
        }elseif ($method == "DELETE"){

            $this->delete($id);
        }

    }

    //Main entrance
    public function items_full_info($id)
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);
        //GET, POST, OPTIONS, PUT, DELETE
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }elseif ($method == "GET"){

            $this->read_full_info($id);
        }elseif ($method == "PUT"){

            $this->update($id,$Data);
        }elseif ($method == "DELETE"){

            $this->delete($id);
        }

    }





    public function read($id)
    {
        $row = $this->Users_details_model->get_by_user_id($id);
        if ($row) {
            $data = array(
                'user_details_id' => $row->user_details_id,
                'first_name' => $row->first_name,
                'last_name' => $row->last_name,
                'dob' => $row->dob,
                'mobile_number' => $row->mobile_number,
                'user_id' => $row->user_id,
                'position' => $row->position,



        );
            $this->json($data);
        } else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }
    }

    public function read_full_info($id)
    {

        $row = $this->Users_details_model->getUserDetails_by_id($id);
        if ($row) {

            $data = array(
                'user_details_id' => $row->user_details_id,
                'first_name' => $row->first_name,
                'last_name' => $row->last_name,
                'dob' => $row->dob,
                'mobile_number' => $row->mobile_number,
                'user_id' => $row->user_id,
                'position' => $row->position,
                'email'=>$row->email,
                'username'=>$row->username,



            );
            $this->json($data);
        }
        else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }

    }





    public function create()
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);


        $checkArray=$this->dataValidate($Data);
        if($checkArray!=0){
            $last_insert_id=$this->Users_details_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }


    public function update($id,$updateData)
    {
             $row = $this->Users_details_model->get_by_id($id);

        if ($row) {
            $processArray = $this->dataValidate($updateData);

                if($processArray!=0){
                    $data = array(

                        'first_name' => $processArray['first_name'],
                        'last_name' => $processArray['last_name'],
                        'mobile_number' => $processArray['mobile_number'],
                        'position' => $processArray['position'],
                    );
                    $affectedRowsNumber = $this->Users_details_model->update($id, $data);

                    $tempReturnArray = array(
                        "status" => 'success',
                        "affectRows" => $affectedRowsNumber
                    );
                    $this->json($tempReturnArray);
                }

        }
        else {

                $tempReturnArray=$this->create_error_messageArray('Record Not Found');
                echo json_encode($tempReturnArray);
            }



    }


    public function delete($id)
    {

        $row = $this->Users_details_model->getUserDetails_by_id($id);

        if ($row) {
            $affectRow= $this->Users_details_model->delete($id);
            $tempReturnArray=array(
                "status"=>'success',
                "affectRows"=>$affectRow
            );
            $this->json($tempReturnArray);

        } else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }


    }



    public function success_info($userInfo){
        $tempMessageArray=array(
            "user_id"=>$userInfo[0]['user_id'],
            "email"=>$userInfo[0]['email'],
            "username"=>$userInfo[0]['username'],
            "account_status"=>$userInfo[0]['account_status'],
            "first_name"=> $userInfo[0]['first_name'],
            "last_name"=> $userInfo[0]['last_name'],
            "dob"=> $userInfo[0]['dob'],
            "mobile_number"=> $userInfo[0]['mobile_number'],
            "user_details_id"=>$userInfo[0]['user_details_id'],
        );
        $inforArray=array(
            "status"=>'OK',
            "data" =>$tempMessageArray,
        );


        return $inforArray;

    }
    
    
    
    

}

/* End of file Users_details.php */
/* Location: ./application/controllers/Users_details.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */