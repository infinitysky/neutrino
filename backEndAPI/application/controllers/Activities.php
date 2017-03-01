<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Activities extends CI_Controller
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
        $this->load->model('Activities_model');
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

    public function getall()
    {
        $tempData=$this->Activities_model->get_all();

        echo $this->json($tempData);
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
            if (empty($Data['activity_detail'])) {
                echo json_encode($this->create_error_messageArray("activity_detail Empty"));
                return 0;
            }elseif (empty($Data['activity_type'])){
                echo json_encode($this->create_error_messageArray("activity_type Empty"));
                return 0;
            }
            elseif (empty($Data['user_id'])){
                echo json_encode($this->create_error_messageArray("user_id Empty"));
                return 0;
            }
            else {
                $date = new DateTime();

                $processArray = array(
                    'activity_detail' => $Data['activity_detail'],
                    'activity_type' => $Data['activity_type'],
                    'activity_timestamp' => $date->format('Y-m-d H:i:s'),
                    'user_id' =>$Data['user_id'],
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





    public function read($id)
    {
        $row = $this->Activities_model->get_by_id($id);

        if ($row) {
            $data = array(

                'activity_id' => $row->activity_id,
                'activity_detail' => $row->activity_detail,
                'activity_type' => $row->activity_type,
                'activity_timestamp' => $row->activity_timestamp,
                'user_id' =>$row->user_id,

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
            $last_insert_id=$this->Activities_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }


    public function update($id,$updateData)
    {
        $row = $this->Activities_model->get_by_id($id);


        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {
                $date = new DateTime();
                $data = array(


                    'activity_detail' => $processArray['activity_detail'],
                    'activity_type' => $processArray['activity_type'],
                    'activity_timestamp' => $date->format('U = Y-m-d H:i:s'),
                    'user_id' => $processArray['user_id'],


                );
                $affectedRowsNumber = $this->Activities_model->update($id, $data);

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
        $row = $this->Activities_model->get_by_id($id);

        if ($row) {
            $affectRow=$this->Activities_model->delete($id);
            $tempReturnArray=array(
                "status"=>'success',
                "affectRows"=>$affectRow
            );
            $this->json($tempReturnArray);
        }
        else {
            //$this->session->set_flashdata('message', 'Record Not Found');
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);

        }

    }

    public function get_by_user_id($id){
        $i=0;
        $data=[];
        $row = $this->Activities_model->get_by_user_id($id);
        if ($row) {
            $length= count($row);
            for($i=0;$i<$length;$i++) {
                $info = array(
                    'activity_id' => set_value('activity_id', $row[$i]->activity_id),
                    'activity_detail' => set_value('activity_detail', $row[$i]->activity_detail),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'activity_type' => set_value('activity_type', $row[$i]->activity_type),
                    'activity_timestamp' => set_value('activity_timestamp', $row[$i]->activity_timestamp),


                    'first_name' => set_value('first_name', $row[$i]->first_name),
                    'last_name' => set_value('last_name', $row[$i]->last_name),

                );
                array_push($data, $info);

            }
            $this->json($data);
        }
        else {
            $tempErrorArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempErrorArray);

        }


    }
    public function get_by_team_id($id){
        $row = $this->Activities_model->get_by_team_id($id);
        $i=0;
        $data=[];
        if ($row) {
            $length= count($row);
            for($i=0;$i<$length;$i++) {
                $info = array(
                    'activity_id' => set_value('activity_id', $row[$i]->activity_id),
                    'activity_detail' => set_value('activity_detail', $row[$i]->activity_detail),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'activity_type' => set_value('activity_type', $row[$i]->activity_type),
                    'activity_timestamp' => set_value('activity_timestamp', $row[$i]->activity_timestamp),


                    'first_name' => set_value('first_name', $row[$i]->first_name),
                    'last_name' => set_value('last_name', $row[$i]->last_name),

                );
                array_push($data, $info);

            }
            $this->json($data);
        }
        else {
            $tempErrorArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempErrorArray);

        }

    }


}
