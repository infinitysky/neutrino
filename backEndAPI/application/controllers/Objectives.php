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
        $this->load->model('Teams_users_model');
        $this->load->model('Goals_model');
        $this->load->model('Objectives_model');
        $this->load->model('Goals_objectives_model');
        $this->load->model('Key_results_model');
        $this->load->model('Users_model');
        $this->load->model('Teams_objectives_model');


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
            if (empty($Data['objective_name'])) {
                echo json_encode($this->create_error_messageArray("objective_name Empty"));
                return 0;
            }

            else {

                if (empty($Data['objective_unit'])) {
                    $Data['objective_unit']='%';

                }

                if (empty($Data['objective_progress_status'])) {
                    $Data['objective_progress_status']="0";
                }


                if(empty($Data['objective_description'])){
                    $Data['objective_description']="";
                }
                if(empty($Data['objective_status'])){
                    $Data['objective_status']="None";
                }
                if(empty($Data['objective_target'])){
                    $Data['objective_target']="";
                }

                $processArray = array(

                    'objective_name' => $Data['objective_name'],
                    'objective_description' => $Data['objective_description'],
                    'objective_unit' => $Data['objective_unit'],
                    'objective_status' => $Data['objective_status'],
                    'objective_progress_status' => $Data['objective_progress_status'],
                    'objective_target' => $Data['objective_target'],


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

                'objective_unit' => $row->objective_unit,
                'objective_status' => $row->objective_status,
                'objective_progress_status' =>$row->objective_progress_status,
                'objective_target' =>$row->objective_target,





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
                    'objective_unit' => $processArray['objective_unit'],
                    'objective_status' => $processArray['objective_status'],
                    'objective_progress_status' => $processArray['objective_progress_status'],
                    'objective_target' => $processArray['objective_target'],

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
            echo json_encode($tempReturnArray);
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
            echo json_encode($tempReturnArray);

        }



    }


    public function get_key_results_by_objective_id($objective_id){

        $row = $this->Objectives_model->get_by_id($objective_id);
        $row2 = $this->Key_results_model->get_by_objective_id($objective_id);
        if ($row) {
            $data = array(
                'objective_id' => $row->objective_id,
                'objective_name' => $row->objective_name,
                'objective_description' =>$row->objective_description,

                'objective_unit' => $row->objective_unit,
                'objective_status' => $row->objective_status,
                'objective_progress_status' =>$row->objective_progress_status,
                'objective_target' =>$row->objective_target,
                'keyResult_array'=>$row2

            );
            $this->json($data);
        }
        else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }

    }










    // User - Objectives


    public function get_users_team_objectives($userId){

        $teamIdArray=$this->searchUsersTeamId($userId);
        $objectivesArray=$this->searchObjectivesByTeamIdArray($teamIdArray);
        $objectivesIdArray=[];
        $keyResultArray=[];
        $teamObjectiveWithKeyResult=[];
        if ($objectivesArray){
            $i=0;
            $objectiveLength=count($objectivesArray);
            for ($i=0; $i<$objectiveLength; $i++){
                $objectivesArray[$i]->keyResult_array=[];
                array_push($objectivesIdArray,$objectivesArray[$i]->objective_id);
            }

            $keyResultArray=$this->searchKeyResultsForObjective($objectivesIdArray);
            $teamObjectiveWithKeyResult=$this->insertKeyResultToObjective($objectivesArray,$keyResultArray);


        }

        $teamObjectiveWithKeyResult=$this->calculateObjectivesProgress($teamObjectiveWithKeyResult);

        $this->json($teamObjectiveWithKeyResult);


    }

    function searchUsersTeamId($userId){
        $userTeamsIdArray=[];
        $tramResult = $this->Teams_users_model->get_by_user_id($userId);
        if ($tramResult){
            $i=0;

            $arrayLength=count($tramResult);
            for ( $i =0; $i<$arrayLength; $i++){
                array_push($userTeamsIdArray,$tramResult[$i]->team_id);
            }
        }else{
            // TODO :  This logic needs to be refactor. (should I set a 0 into the array at the beginning?)
            // init search Id array, and 0 means the not exist value but show something for the mysql where_in array
            // mysql where in not allowed empty search.
            array_push($userTeamsIdArray,0);
        }
        return $userTeamsIdArray;
    }

    function searchObjectivesByTeamIdArray($teamIdArray){

        $objectivesArray=[];
        $row = $this->Teams_objectives_model->get_by_team_id_array($teamIdArray);

        if ($row){
            $objectivesArray=$row;

        }

        return $objectivesArray;

    }



    function searchKeyResultsForObjective($objectivesIdArray){
        $keyResult=[];
        $i=0;

        $keyResultArray=$this->Key_results_model->get_by_objective_id_array($objectivesIdArray);

        if ($keyResultArray){
            $keyResult=$keyResultArray;

        }

        return $keyResult;
    }

    function insertKeyResultToObjective($objectivesArray,$keyResultArray){
        $i=0;
        $j=0;
        if ($objectivesArray && $keyResultArray){
            $objectivesLength=count($objectivesArray);
            $keyResultArrayLength=count($keyResultArray);


            for ($i=0;$i<$objectivesLength;$i++){
                for ($j=0; $j<$keyResultArrayLength; $j++){
                    if ($keyResultArray[$j]->objective_id == $objectivesArray[$i]-> objective_id){

                        array_push($objectivesArray[$i]->keyResult_array,$keyResultArray[$j]);

                    }
                }
            }

        }


        return $objectivesArray;
    }


    function calculateObjectivesProgress($objectivesArray){
        $calculatedArray=[];
        $x = 0;
        $y = 0;
        $z = 0;


        if ($objectivesArray){

            $objectivesLength=count($objectivesArray);

            for ($x=0;$x< $objectivesLength;$x++){
                if ($objectivesArray[$x]->keyResult_array){

                    $keyResultLength = count($objectivesArray[$x]->keyResult_array);
                    $totalKeyResult=0;


                    for ($y=0; $y<$keyResultLength;$y++){
                        $totalKeyResult=$totalKeyResult+$objectivesArray[$x]->keyResult_array[$y]->result_progress_status;
                    }

                    $objectivesArray[$x]->objective_progress_status=$totalKeyResult / $keyResultLength;

                }else{
                    $objectivesArray[$x]->objective_progress_status=0;
                }

            }


        }

        $calculatedArray=$objectivesArray;
        return $calculatedArray;
    }



















}
