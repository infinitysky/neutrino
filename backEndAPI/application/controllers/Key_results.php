<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Key_results extends CI_Controller
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
        $this->load->model('Key_results_model');
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
            if (empty($Data['result_name'])) {
                echo json_encode($this->create_error_messageArray("result_name Empty"));
                return 0;
            }
            else {
                if (empty($Data['result_description'])) {
                    $Data['result_description']='';
                }

                $processArray = array(
                    'result_name' => $Data['result_name'],
                    'result_description' => $Data['result_description'],

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
        $tempData=$this->Key_results_model->get_all();

        echo $this->json($tempData);
    }




    public function read($id) 
    {


        $row = $this->Key_results_model->get_by_id($id);
        if ($row) {
            $data = array(
                'result_id' => $row->result_id,
                'result_name' => $row->result_name,
                'result_description' => $row->result_description,
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
            $last_insert_id=$this->Key_results_model->insert($checkArray);
            $this->read($last_insert_id);
        }

    }



    public function update($id,$updateData)
    {
        $row = $this->Key_results_model->get_by_id($id);

      
        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {
                $data = array(


                    'result_name' => $processArray['result_name'],
                    'result_description' => $processArray['result_description'],

                );
                $affectedRowsNumber = $this->Key_results_model->update($id, $data);
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
        $row = $this->Key_results_model->get_by_id($id);

        if ($row) {
            $affectRow = $this->Key_results_model->delete($id);
            $tempReturnArray = array(
                "status" => 'success',
                "affectRows" => $affectRow
            );
            $this->json($tempReturnArray);
        } else {
            //$this->session->set_flashdata('message', 'Record Not Found');
            $tempReturnArray = $this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);

        }

    }




}
