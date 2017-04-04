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
        $this->load->model('Objectives_model');
        $this->load->model('Goals_objectives_model');
        $this->load->model('Key_results_model');

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

    public function get_detailed_goals(){
        $goalsArray=$this->Goals_model->get_all();
        $i=0;
        $j=0;
        $goalsIdArray=[];

        array_push($goalsIdArray,'0');
        if ($goalsArray){
            $lengthOfGoalsArray=count($goalsArray);

            for ($i=0 ; $i < $lengthOfGoalsArray; $i++ ){
                //init a empty array for later objective array push in
                $emptyArray=[];
                $goalsArray[$i]->objective_array=$emptyArray;


                array_push($goalsIdArray,$goalsArray[$i]->goal_id);
            }

            $objectives=$this->searchObjectivesForGoal($goalsIdArray);

            if ($objectives){
                $lengthOfObjectivesArray=count($objectives);

                for ($i=0 ; $i < $lengthOfObjectivesArray; $i++ ){

                    for ( $j = 0; $j<$lengthOfGoalsArray ; $j++){
                        if ($objectives[$i]->goal_id == $goalsArray[$j]->goal_id){
                            array_push($goalsArray[$j]->objective_array,$objectives[$i]);
                        }
                    }
                }
            }

            $calculatedArray=$this->calculateProgress($goalsArray);
            $this->json($calculatedArray);

        }else{
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }


    }

    public function get_detail_by_time_frame($timeFrame_id){
        $goalsArray=$this->Goals_model->get_by_timeFrame_id($timeFrame_id);
        $i=0;
        $j=0;
        $goalsIdArray=[];


        if ($goalsArray){
            $lengthOfGoalsArray=count($goalsArray);

            for ($i=0 ; $i < $lengthOfGoalsArray; $i++ ){
                //init a empty array for later objective array push in
                $emptyArray=[];
                $goalsArray[$i]->objective_array=$emptyArray;


                array_push($goalsIdArray,$goalsArray[$i]->goal_id);
            }

            $objectives=$this->searchObjectivesForGoal($goalsIdArray);

            if ($objectives){
                $lengthOfObjectivesArray=count($objectives);

                for ($i=0 ; $i < $lengthOfObjectivesArray; $i++ ){

                    for ( $j = 0; $j<$lengthOfGoalsArray ; $j++){
                        if ($objectives[$i]->goal_id == $goalsArray[$j]->goal_id){
                            array_push($goalsArray[$j]->objective_array,$objectives[$i]);


                        }
                    }


                }
            }





            $calculatedArray=$this->calculateProgress($goalsArray);

            $this->json($calculatedArray);

        }else{
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }


    }


    function searchObjectivesForGoal($goalsIdArray){
        $objectives=[];
        $objectivesIdArray=[];
        array_push($objectivesIdArray,'0');
        $i=0;
        $j = 0;

        $keyResultsArray=[];

        $objectivesArray=$this->Goals_objectives_model->get_by_goal_id_array($goalsIdArray);

        if ($objectivesArray){
            $lengthOfObjectivesArray=count($objectivesArray);

            for ($i=0 ; $i < $lengthOfObjectivesArray; $i++ ){

                $objectivesArray[$i]->keyResult_array=[];

                array_push($objectivesIdArray,$objectivesArray[$i]->objective_id);
            }

            $keyResultsArray=$this->searchKeyResultsForObjective($objectivesIdArray);

            if ($keyResultsArray){
                $lengthOfkeyResultsArray=count($keyResultsArray);
                for ($i = 0; $i <$lengthOfkeyResultsArray ;$i++ ){
                    for ( $j = 0 ; $j < $lengthOfObjectivesArray ; $j ++){
                        if ($keyResultsArray[$i]->objective_id == $objectivesArray[$j]->objective_id){

                            array_push($objectivesArray[$j]->keyResult_array, $keyResultsArray[$i]);

                        }
                    }
                }
            }



            $objectives=$objectivesArray;


        }
        return $objectives;
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

    function calculateProgress($goalsArray){
        $calculatedArray=[];
        $x = 0;
        $y = 0;
        $z = 0;
        $goalsLength=count($goalsArray);
        for ($x=0; $x<$goalsLength ; $x++){

            $objectivesLength=count($goalsArray[$x]->objective_array);
            $currentGoalProgress=0;
            $totalObjectiveProgress=0;

            if ($objectivesLength==0){
                $goalsArray[$x]->goal_progress_status=$currentGoalProgress;
            }else{


                for ($y=0; $y<$objectivesLength; $y++){

                    $keyResultLength=count( $goalsArray[$x]->objective_array[$y]->keyResult_array );
                    $keyResultProgressTotal=0;
                    $currentObjectiveProgress=0;

                    if ($keyResultLength==0){
                        $goalsArray[$x]->objective_array[$y]->objective_progress_status=$currentObjectiveProgress;

                    }else{

                        for ($z=0; $z<$keyResultLength; $z++){
                            $keyResultProgressTotal=$keyResultProgressTotal+ $goalsArray[$x]->objective_array[$y]->keyResult_array[$z]->result_progress_status;
                        }
                        $currentObjectiveProgress=$keyResultProgressTotal/$keyResultLength;
                        $goalsArray[$x]->objective_array[$y]->objective_progress_status=$currentObjectiveProgress;
                    }

                    $totalObjectiveProgress=$totalObjectiveProgress+ $goalsArray[$x]->objective_array[$y]->objective_progress_status;
                }

                $goalsArray[$x]->goal_progress_status=$totalObjectiveProgress/$objectivesLength;
            }



        }



        $calculatedArray=$goalsArray;
        return $calculatedArray;
    }



}


