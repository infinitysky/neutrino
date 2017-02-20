<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

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
        };

        
        parent::__construct();
        $this->load->model('Teams_model');
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

    public function read($id) 
    {


        $row = $this->Teams_model->get_by_id($id);
        if ($row) {
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



    }

    public function create() 
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);

        $checkArray=$this->dataValidate($Data);
        if($checkArray!=0){
            $last_insert_id=$this->Teams_model->insert($checkArray);
            $this->read($last_insert_id);
        }

    }
    

    
    public function update($id,$updateData)
    {


        $row = $this->Teams_model->get_by_id($id);

        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {
                $data = array(


                    'team_description' => $processArray['team_description'],
                    'team_name' => $processArray['team_name'],
                    'parent_team_id' => $processArray['parent_team_id'],
                    'team_leader_id' => $processArray['team_leader_id'],
                );
                $affectedRowsNumber = $this->Teams_model->update($id, $data);

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

        $row = $this->Teams_model->get_by_id($id);

        if ($row) {
            $affectRow=$this->Teams_model->delete($id);
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
        $tempData=$this->Teams_model->get_all();
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

            if (empty($Data['team_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }elseif (empty($Data['team_leader_id'])){
                echo json_encode($this->create_error_messageArray("team_leader_id Empty"));
                return 0;
            }

            else {
                if (empty($Data['parent_team_id'])){
                    $Data['parent_team_id']=0;
                }
                if (empty($Data['team_description'])){
                    $Data['team_description']='';
                }

                $processArray = array(

                    'team_description' => $Data['team_description'],
                    'team_name' => $Data['team_name'],
                    'parent_team_id' =>$Data['parent_team_id'],
                    'team_leader_id'=>$Data['team_leader_id'],

                );
                return $processArray;
            }
        }
    }



}

/* End of file Teams.php */
/* Location: ./application/controllers/Teams.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */