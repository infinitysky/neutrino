<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Goals_objectives extends CI_Controller
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
        $this->load->model('Goals_objectives_model');
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
            if (empty($Data['goal_id'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }elseif (empty($Data['objective_id'])){
                echo json_encode($this->create_error_messageArray("goal_name Empty"));
                return 0;
            }

            else {

                $processArray = array(
                    'goal_id' =>$Data['goal_id'],
                    'objective_id' => $Data['objective_id'],

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
        $row = $this->Goals_objectives_model->get_by_id($id);

        if ($row) {
            $data = array(
                'id' => $row->id,
                'goal_id' => $row->goal_id,
                'objective_id' => $row->objective_id,
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
            $last_insert_id=$this->Goals_objectives_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }



    public function update($id,$updateData)
    {
        $row = $this->Goals_objectives_model->get_by_id($id);


        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {


                $data = array(

                    'team_id' => set_value('team_id', $row->team_id),
                    'user_id' => set_value('user_id', $row->user_id),

                );
                $affectedRowsNumber = $this->Goals_objectives_model->update($id, $data);

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


        $row = $this->Goals_objectives_model->get_by_id($id);



        if ($row) {
            $affectRow=$this->Goals_objectives_model->delete($id);
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
            $last_query=$this->Goals_objectives_model->batch_insert($dataArray);
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


            $last_query=$this->Goals_objectives_model->batch_delete_by_team_id($teamId,$deleteArray);
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


    public function get_by_goal_id($id){


        $i=0;
        $data=[];
        $row = $this->Goals_objectives_model->get_by_goal_id($id);



        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){


                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    //goals informations
                    'goal_id' => set_value('goal_id', $row[$i]->goal_id),
                    'goal_name' => set_value('goal_name', $row[$i]->goal_name),
                    'goal_description' => set_value('goal_description', $row[$i]->goal_description),
                    'time_frame_id' => set_value('time_frame_id', $row[$i]->time_frame_id),


                    //objectives
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'objective_name' => set_value('objective_name', $row[$i]->objective_name),
                    'objective_description' => set_value('objective_description', $row[$i]->objective_description),





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
    public function get_by_objective_id($id){


        $data=[];
        $row = $this->Goals_objectives_model->get_by_objective_id($id);


        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){


                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    //goals informations
                    'goal_id' => set_value('goal_id', $row[$i]->goal_id),
                    'goal_name' => set_value('goal_name', $row[$i]->goal_name),
                    'goal_description' => set_value('goal_description', $row[$i]->goal_description),
                    'time_frame_id' => set_value('time_frame_id', $row[$i]->time_frame_id),


                    //objectives
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'objective_name' => set_value('objective_name', $row[$i]->objective_name),
                    'objective_description' => set_value('objective_description', $row[$i]->objective_description),

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
