<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Teams_users extends CI_Controller
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
        $this->load->model('Teams_users_model');
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
        $tempData=$this->Teams_users_model->get_all();

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
            if (empty($Data['team_id'])) {
                echo json_encode($this->create_error_messageArray("team_id Empty"));
                return 0;
            }elseif (empty($Data['user_id'])){
                echo json_encode($this->create_error_messageArray("user_id Empty"));
                return 0;
            }

            else {

                $processArray = array(
                    'team_id' =>$Data['team_id'],
                    'user_id' => $Data['user_id'],

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


//TODO:Create a sertchId functions
//    public function search_id(){
//        $Data = json_decode(trim(file_get_contents('php://input')), true);
//        $method = $_SERVER['REQUEST_METHOD'];
//        if('POST'!=$method){
//
//        }
//
//        $this->json($tempData);
//    }



    public function read($id)
    {
        $row = $this->Teams_users_model->get_by_id($id);

        if ($row) {
            $data = array(
                'team_id' => set_value('team_id', $row->team_id),
                'user_id' => set_value('user_id', $row->user_id),
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
            $last_insert_id=$this->Teams_users_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }



    public function update($id,$updateData)
    {
        $row = $this->Teams_users_model->get_by_id($id);


        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {

                $data = array(

                    'team_id' => set_value('team_id', $row->team_id),
                    'user_id' => set_value('user_id', $row->user_id),

                );
                $affectedRowsNumber = $this->Teams_users_model->update($id, $data);

                $tempReturnArray = array(

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


        $row = $this->Teams_users_model->get_by_id($id);



        if ($row) {
            $affectRow=$this->Teams_users_model->delete($id);
            $tempReturnArray=array(

                "affectRows"=>$affectRow
            );
            $this->json($tempReturnArray);
        }
        else {

            $tempErrorArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempErrorArray);
        }


    }



    public function batch_create()
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);

        if (empty($Data['data'])){
            $tempReturnArray=$this->create_error_messageArray('data empty');
            echo json_encode($tempReturnArray);


        }

        else{
            $dataArray=$Data['data'];
            $last_query=$this->Teams_users_model->batch_insert($dataArray);
            $arraySize=count($dataArray);
            if($last_query==$arraySize){
                $successArray = array(

                    "affectRows" => $last_query
                );
                $this->json($successArray);
            }else{
                $tempErrorArray=$this->create_error_messageArray('Create Error! ');
                echo json_encode($tempErrorArray);

            }

        }

    }

    public function batch_delete_by_team_id()
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);

        if (empty($Data['data'])){
            $tempErrorArray=$this->create_error_messageArray('data empty');
            echo json_encode($tempErrorArray);


        }

        else{
            $dataArray=$Data['data'];
            $teamId=$dataArray['team_id'];
            $deleteArray=$dataArray['user_ids'];


            $last_query=$this->Teams_users_model->batch_delete_by_team_id($teamId,$deleteArray);
            $arraySize=count($dataArray);
            if($last_query==$arraySize){
                $successArray = array(

                    "affectRows" => $last_query
                );
                $this->json($successArray);
            }else{
                $tempErrorArray=$this->create_error_messageArray('Create Error! ');
                echo json_encode($tempErrorArray);

            }

        }

    }


    public function get_by_user_id($id){


        $i=0;
        $data=[];
        $row = $this->Teams_users_model->get_by_user_id($id);



        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){


                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),

                    'team_id' => set_value('team_id', $row[$i]->team_id),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'team_description' => set_value('team_description', $row[$i]->team_description),
                    'team_name' => set_value('team_name', $row[$i]->team_name),
                    'parent_team_id' => set_value('parent_team_id', $row[$i]->parent_team_id),
                    'team_leader_user_id' => set_value('team_leader_user_id', $row[$i]->team_leader_user_id),
                    'first_name' => set_value('first_name', $row[$i]->first_name),
                    'last_name' => set_value('last_name', $row[$i]->last_name),
                    'dob' => set_value('dob', $row[$i]->dob),
                    'mobile_number' => set_value('mobile_number', $row[$i]->mobile_number),
                    'position' => set_value('position', $row[$i]->position),



                );
                array_push($data,$info);

            }
            $this->json($data);


        }
        else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }


    }
    public function get_by_team_id($id){


        $data=[];
        $row = $this->Teams_users_model->get_by_team_id($id);


        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){


                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),

                    'team_id' => set_value('team_id', $row[$i]->team_id),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'team_description' => set_value('team_description', $row[$i]->team_description),
                    'team_name' => set_value('team_name', $row[$i]->team_name),
                    'parent_team_id' => set_value('parent_team_id', $row[$i]->parent_team_id),
                    'team_leader_user_id' => set_value('team_leader_user_id', $row[$i]->team_leader_user_id),
                    'first_name' => set_value('first_name', $row[$i]->first_name),
                    'last_name' => set_value('last_name', $row[$i]->last_name),
                    'dob' => set_value('dob', $row[$i]->dob),
                    'mobile_number' => set_value('mobile_number', $row[$i]->mobile_number),
                    'position' => set_value('position', $row[$i]->position),

                );
                array_push($data,$info);

            }
            $this->json($data);


        }
        else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }



    }






}
