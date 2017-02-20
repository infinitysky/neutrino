<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Objectives extends CI_Controller
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
        $this->load->model('Objectives_model');
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
            "statu"=>"success",
            "data"=>$resArray
        );
        echo json_encode($outputMessageArray);
    }



    public function create_error_messageArray($message){
        $tempMessageArray=array(
            "statu"=>"error",
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
            if (empty($Data['objective_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }

            else {

                $processArray = array(

                    'objective_name' => $Data['objective_name'],
                    'objective_description' => $Data['objective_description'],

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
        $tempData=$this->Objectives_model->get_all();

        //reformat date to (dd/mm/yyyy)
        // $tempData=$this->reFormatDate($tempData);
        echo $this->json($tempData);
    }


    public function read($id) 
    {

        $row = $this->Objectives_model->get_by_id($id);
        if ($row) {
            $data = array(
                'objective_id' => $row->objective_id,
                'objective_name' => $row->objective_name,
                'objective_description' =>$row->objective_description,

            );
            $this->json($data);
        }
        else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);
        }




    }

    public function create() 
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);

        $checkArray=$this->dataValidate($Data);
        if($checkArray!=0){
            $last_insert_id=$this->Objectives_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }


    public function update($id,$updateData)
    {
        $row = $this->Objectives_model->get_by_id($id);


        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {
                $data = array(


                    'objective_name' => $processArray['objective_name'],
                    'objective_description' => $processArray['objective_description'],

                );
                $affectedRowsNumber = $this->Objectives_model->update($id, $data);

                $tempReturnArray = array(
                    "status" => 'success',
                    "affectRows" => $affectedRowsNumber
                );
                $this->json($tempReturnArray);
            }
        }
        else {

            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);
        }





    }
    

    
    public function delete($id) 
    {



        $row = $this->Objectives_model->get_by_id($id);

        if ($row) {
            $affectRow=$this->Objectives_model->delete($id);
            $tempReturnArray=array(
                "status"=>'success',
                "affectRows"=>$affectRow
            );
            $this->json($tempReturnArray);
        }
        else {
            //$this->session->set_flashdata('message', 'Record Not Found');
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);

        }



    }




}

/* End of file Objectives.php */
/* Location: ./application/controllers/Objectives.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */