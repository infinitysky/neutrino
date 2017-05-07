<?php
//defined('BASEPATH') OR exit('No direct script access allowed');


class Home_page extends CI_Controller
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
        $this->load->model('Teams_model');
        $this->load->model('Goals_objectives_model');
        $this->load->model('Goals_model');
        $this->load->model('Objectives_model');
        $this->load->model('Teams_objectives_model');
        $this->load->model('Key_results_model');
        $this->load->model('Teams_users_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
    }



    public function index()
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }elseif ($method == "GET"){

            $this->get_users_over_view($Data);

        }elseif ($method == "POST"){

            $this->get_users_over_view($Data);

        }
        else{
            die();
        }


    }

    public function json($resArray) {
        header('Content-Type: application/json');
        $outputMessageArray=array(
            "status"=>"success",
            "data"=>$resArray
        );
        echo json_encode($outputMessageArray);
    }




    // This Function is for '/okr/okr-teams' page. It query all the teams' progress status and return to the Front End
    public function get_users_over_view($Data){
        // $Data = json_decode(trim(file_get_contents('php://input')), true);

        // If the Current Time Frame = 0, then query as ALL. Otherwise, query as the 'time frame' (period).
        //
        $currentTimeFrameId=0;
        if ($Data){
            if(empty($Data['timeFrameId'])){
                $tempReturnArray=$this->create_error_messageArray('timeFrameId Not Found');
                echo json_encode($tempReturnArray);
            }
            else if (empty($Data['user_id'])){
                $tempReturnArray=$this->create_error_messageArray('user_id Not Found');
                echo json_encode($tempReturnArray);
            }else{
                $goalsArray=$this->searchGoalsForUserByTimeFrame($Data['user_id'],$Data['timeFrameId']);

                $objectivesArray = $this->searchObjectiveForUserByTimeFrame($Data['user_id'],$Data['timeFrameId']);

                $companyGoalsArray = $this->get_detail_by_time_frame($Data['timeFrameId']);


                $returnDataArray=array(
                    "status"=>"success",
                    "goals"=>$goalsArray,
                    "companyGoals"=>$companyGoalsArray,
                    "objectives"=>$objectivesArray
                );
				


                echo json_encode($returnDataArray);
            }



        }





        else{
            $tempReturnArray=$this->create_error_messageArray('$Data Not Found');
            echo json_encode($tempReturnArray);
        }

    }



    function get_detail_by_time_frame($timeFrame_id){
        $goalsArray=$this->Goals_model->get_by_timeFrame_id($timeFrame_id);
        $i=0;
        $j=0;
        $goalsIdArray=[];
        $calculatedArray=[];


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





            $calculatedArray=$this->calculateGoalsProgress($goalsArray);

           // $this->json($calculatedArray);
            //return $calculatedArray;

        }

        return $calculatedArray;



    }





    function searchGoalsForUserByTimeFrame($user_id,$timeFrame_id){

        $goalsArray=$this->Goals_model->get_by_user_id_timeFrame_id($user_id,$timeFrame_id);
        $i=0;
        $j=0;
        $goalsIdArray=[];
        if (empty($goalsArray)){
            array_push($goalsIdArray,'0');
        }


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

            $calculatedArray=$this->calculateGoalsProgress($goalsArray);

            return $calculatedArray;

            // $this->json($calculatedArray);

        }else{
            return $calculatedArray=[];
        }


    }


    // Find out the objective Ids that belong to the time frame.




    function searchObjectiveForUserByTimeFrame($user_id,$timeFrame_id){
        $objectives=[];
        $objectivesIdArray=[];

        $i=0;
        $j = 0;

        $keyResultsArray=[];

        //$objectivesInTimeFrame = $this->Goals_objectives_model->get_by_timeFrame_id($timeFrameId);

        $objectivesArray= $this->Objectives_model->get_objectives_by_user_id_timeFrame_id($user_id,$timeFrame_id);

        // avoid search empty array
        if (empty($objectivesArray)){
            array_push($objectivesIdArray,'0');
        }

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
            $objectivesArray;


            $objectives=$this->calculateObjectivesProgress($objectivesArray);
            return $objectives;

        }else{
            return $objectives=[];
        }

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



    function calculateGoalsProgress($goalsArray){
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


    function calculateObjectivesProgress($ObjectivesArray){
        $calculatedArray=[];

        $y = 0;
        $z = 0;
        $objectivesLength=0;



        $currentTeamProgress=0;
        $totalObjectiveProgress=0;
        $objectivesLength=count($ObjectivesArray);

        for ($y=0; $y<$objectivesLength; $y++){

            $keyResultLength=count($ObjectivesArray[$y]->keyResult_array );
            $keyResultProgressTotal=0;
            $currentObjectiveProgress=0;

            if ($keyResultLength==0){
                $ObjectivesArray[$y]->objective_progress_status=$currentObjectiveProgress;

            }else{

                for ($z=0; $z<$keyResultLength; $z++){
                    $keyResultProgressTotal=$keyResultProgressTotal+ $ObjectivesArray[$y]->keyResult_array[$z]->result_progress_status;
                }
                $currentObjectiveProgress=$keyResultProgressTotal/$keyResultLength;
                $ObjectivesArray[$y]->objective_progress_status=$currentObjectiveProgress;
            }

            $totalObjectiveProgress=$totalObjectiveProgress+ $ObjectivesArray[$y]->objective_progress_status;
        }




        $calculatedArray=$ObjectivesArray;
        return $calculatedArray;
    }

    function get_Last_activities($timeFrame){

    }






    function create_error_messageArray($message){
        $tempMessageArray=array(
            "status"=>"error",
            "errorMassage"=>$message
        );
        return $tempMessageArray;
    }




}