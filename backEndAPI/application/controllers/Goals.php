<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Goals extends CI_Controller
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
        }


        parent::__construct();
        $this->load->model('Goals_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
    }

    public function index()
    {
        $this->getall();
    }


    public function getall()
    {
        $tempData=$this->Goals_model->get_all();

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


            //  goal_description can be empty
            if (empty($Data['goal_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }

            elseif (empty($Data['time_frame_id'])){
                echo json_encode($this->create_error_messageArray("time_frame_id Empty"));
                return 0;
            }

            else {


                if (empty($Data['goal_description'])) {
                    $Data['goal_description']="";
                }
                if (empty($Data['goal_status'])) {
                    $Data['goal_status']="None";
                }
                if (empty($Data['goal_progress_status'])){
                    $Data['goal_progress_status']=0;
                }

                //TODO : Not in use now
                if (empty($Data['goal_unit'])){
                    $Data['goal_unit']=0;
                }
                if (empty($Data['goal_target'])){
                    $Data['goal_target']=0;
                }


                $processArray = array(
                    'goal_name' => $Data['goal_name'],
                    'goal_description' => $Data['goal_description'],
                    'time_frame_id' => $Data['time_frame_id'],
                    'goal_status' => $Data['goal_status'],
                    'goal_unit' => $Data['goal_unit'],
                    'goal_progress_status' => $Data['goal_progress_status'],
                    'goal_target' => $Data['goal_target'],
                    
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

        $row = $this->Goals_model->get_by_id($id);
        if ($row) {

            $data = array(


                'goal_id' => $row->goal_id,
                'goal_name' => $row->goal_name,
                'goal_description' => $row->goal_description,
                'time_frame_id'=>$row->time_frame_id,

                'goal_status' => $row->goal_status,
                'goal_unit' => $row->goal_unit,
                'goal_progress_status' => $row->goal_progress_status,
                'goal_target'=>$row->goal_target,



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
            $last_insert_id=$this->Goals_model->insert($checkArray);
            $this->read($last_insert_id);
        }

        


    }


      public function update($id,$updateData)
    {
        $row = $this->Goals_model->get_by_id($id);

        if ($row) {
            $processArray = $this->dataValidate($updateData);
            if ($processArray != 0) {
                $data = array(

                    'goal_name' => $processArray['goal_name'],
                    'goal_description' => $processArray['goal_description'],
                    'time_frame_id' => $processArray['time_frame_id'],

                    'goal_status' => $processArray['goal_status'],
                    'goal_unit' => $processArray['goal_unit'],
                    'goal_progress_status' => $processArray['goal_progress_status'],

                    'goal_target' => $processArray['goal_target'],




                );
                $affectedRowsNumber = $this->Goals_model->update($id, $data);
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
        $row = $this->Goals_model->get_by_id($id);

        if ($row) {
            $affectRow= $this->Goals_model->delete($id);
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


/*
class Teams extends CI_Controller
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
        }


        parent::__construct();
        $this->load->model('Goals_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
    }

    public function index()
    {
        $$this->getall();
    }

    public function json($resArray) {
        header('Content-Type: application/json');
        echo json_encode($resArray);
    }

    public function read($id)
    {


        $row = $this->Goals_model->get_by_id($id);
        if ($row) {
            $startDate=new DateTime($row->time_frame_start);
            $endDate=new DateTime($row->time_frame_end);

            $data = array(
                'team_id' => $row->team_id,
                'team_description' => $row->team_description,
                'team_name' => $row->team_name,
                'parent_team_id' =>$row->parent_team_id,
                'team_leader_id'=>$row->team_leader_id,
            );
            $this->json($data);
        }
        else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);
        }



        $row = $this->Goals_model->get_by_id($id);
        if ($row) {
            $data = array(

            );
            $this->load->view('teams/teams_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('teams'));
        }
    }

    public function create()
    {


        $Data = json_decode(trim(file_get_contents('php://input')), true);


        $checkArray=$this->dataValidate($Data);
        if($checkArray!=0){
            $last_insert_id=$this->Goals_model->insert($checkArray);
            $this->read($last_insert_id);
        }

    }



    public function update($id,$updateData)
    {


        $row = $this->Goals_model->get_by_id($id);

        if ($row) {
            $processArray=$this->dataValidate($updateData);
            $data = array(

                'team_id' =>$processArray['team_id'],
                'team_description' => $processArray['team_description'],
                'team_name' => $processArray['team_name'],
                'parent_team_id' =>$processArray['parent_team_id'],
                'team_leader_id'=>$processArray['team_leader_id'],
            );
            $affectedRowsNumber=$this->Goals_model->update($id, $data);
            $tempReturnArray=array(
                "status"=>'success',
                "affectRows"=>$affectedRowsNumber
            );
            $this->json($tempReturnArray);

        }
        else {

            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            $this->json($tempReturnArray);
        }

    }



    public function delete($id)
    {

        $row = $this->Goals_model->get_by_id($id);

        if ($row) {
            $affectRow=$this->Goals_model->delete($id);
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
        $tempData=$this->Goals_model->get_all();

        //reformat date to (dd/mm/yyyy)
        // $tempData=$this->reFormatDate($tempData);
        echo $this->json($tempData);
    }


    //Warning Because  the DateRangePicker required a specified date format. So every date type must been reformatted before it been send to front.
    public function reFormatDate($processArray){
        $arrlength = count($processArray);
        for ($i=0;$i<$arrlength;$i++){

            $startDate=new DateTime($processArray[$i]->time_frame_start);
            $endDate= new DateTime($processArray[$i]->time_frame_end);
            $processArray[$i]->time_frame_start=$startDate->format('d-m-Y');
            $processArray[$i]->time_frame_end=$endDate->format('d-m-Y');
        }
        return $processArray;
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

            if (empty($Data['team_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }
            else {

                $processArray = array(
                    'team_id' =>$Data['team_id'],
                    'team_description' => $Data['team_description'],
                    'team_name' => $Data['team_name'],
                    'parent_team_id' =>$Data['parent_team_id'],
                    'team_leader_id'=>$Data['team_leader_id'],

                );
                return $processArray;
            }
        }
    }



}*/

