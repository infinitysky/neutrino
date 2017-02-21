<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Company_info extends CI_Controller
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
        $this->load->model('Company_info_model');
        $this->load->library('form_validation');        
	    $this->load->library('datatables');

    }



    public function index()
    {
        $this->getall();
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


            //  goal_description can be empty
            if (empty($Data['company_name'])) {
                echo json_encode($this->create_error_messageArray("company_name Empty"));
                return 0;
            
            }
            else {

                $processArray = array(
                    'company_name' => $Data['company_name'],
                    'company_mission' => $Data['company_mission'],
                    'company_vision'=>$Data['company_vision'],
                    'company_address'=>$Data['company_address'],
                    'company_phone'=>$Data['company_phone'],
                    'company_email'=>$Data['company_email'],

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




    public function getall()
    {
        $tempData=$this->Company_info_model->get_all();

        echo $this->json($tempData);
    }





    public function read($id) 
    {

        $row = $this->Company_info_model->get_by_id($id);
        if ($row) {

            $data = array(


                'company_info_id' => $row->company_info_id,
                'company_name' => $row->company_name,
                'company_vision'=>$row->company_vision,
                'company_mission' => $row->company_mission,
                'company_address'=>$row->company_address,
                'company_phone'=>$row->company_phone,
                'company_email'=>$row->company_email,

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
            $last_insert_id=$this->Company_info_model->insert($checkArray);
            $this->read($last_insert_id);
        }

        


    }


      public function update($id,$updateData)
    {
        $row = $this->Company_info_model->get_by_id($id);

        if ($row) {
            $processArray = $this->dataValidate($updateData);
            if ($processArray != 0) {
//            if(empty($processArray['goal_id'])){
//                $tempReturnArray=$this->create_error_messageArray('goal_id Empty');
//                $this->json($tempReturnArray);
//            }else{

                $data = array(

                    'company_name' => $processArray['company_name'],
                    'company_mission' => $processArray['company_mission'],
                    'company_vision' => $processArray['company_vision'],
                    'company_address' => $processArray['company_address'],
                    'company_phone' => $processArray['company_phone'],
                    'company_email' => $processArray['company_email'],


                );
                $affectedRowsNumber = $this->Company_info_model->update($id, $data);
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
        $row = $this->Company_info_model->get_by_id($id);

        if ($row) {
            $affectRow= $this->Company_info_model->delete($id);
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

}

/* End of file Activities.php */
/* Location: ./application/controllers/Activities.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:09 */
/* http://harviacode.com */