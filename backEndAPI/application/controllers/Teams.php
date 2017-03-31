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
        $this->load->model('Teams_objectives_model');
        $this->load->model('Key_results_model');
        $this->load->model('Teams_users_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
    }

    public function index()
    {
        $this->getall();
    }

    public function json($resArray) {



        $outputMessageArray=array(
            "status"=>"success",
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
                'team_leader_user_id'=>$row->team_leader_user_id,
                'team_leader_first_name'=>$row->first_name,
                'team_leader_last_name'=>$row->last_name,

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
                    'team_leader_user_id' => $processArray['team_leader_user_id'],
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
            echo json_encode($tempReturnArray);
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
            echo json_encode($tempReturnArray);

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
    function reFormatDate($processArray){
        $arrlength = count($processArray);
        for ($i=0;$i<$arrlength;$i++){

            $startDate=new DateTime($processArray[$i]->time_frame_start);
            $endDate= new DateTime($processArray[$i]->time_frame_end);
            $processArray[$i]->time_frame_start=$startDate->format('d-m-Y');
            $processArray[$i]->time_frame_end=$endDate->format('d-m-Y');
        }
        return $processArray;
    }


    function create_error_messageArray($message){
        $tempMessageArray=array(
            "status"=>"error",
            "errorMassage"=>$message
        );
        return $tempMessageArray;
    }

    function dataValidate($Data){
        if(empty($Data)){
            echo json_encode( $this->create_error_messageArray("Message Empty"));
            return 0;
        }
        else {

            if (empty($Data['team_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }elseif (empty($Data['team_leader_user_id'])){
                echo json_encode($this->create_error_messageArray("team_leader_user_id Empty"));
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
                    'team_leader_user_id'=>$Data['team_leader_user_id'],

                );
                return $processArray;
            }
        }
    }






    public function get_teams_over_view(){
        $teamsArray=$this->Teams_model->get_all();
        $i=0;
        $j=0;
        $k=0;
        $teamsIdArray=[];
        array_push($teamsIdArray,'0');

        if ($teamsArray){
            $lengthOfTeamsArray=count($teamsArray);


            for ($k=0 ; $k < $lengthOfTeamsArray; $k++ ){

                array_push($teamsIdArray,$teamsArray[$k]->team_id);


                //init a empty array for later objective array push in
                $emptyArray=[];
                $teamMemberEmptyArray=[];

                $teamsArray[$k]->objective_array=$emptyArray;
                $teamsArray[$k]->teamMember_array=$teamMemberEmptyArray;

            }


            $teamMembers=$this->searchTeamMembersForTeam($teamsIdArray);

            if ($teamMembers){
                $teamMembersLength=count($teamMembers);
                for ($i=0 ; $i < $teamMembersLength; $i++ ){
                    for ( $j = 0; $j<$lengthOfTeamsArray ; $j++){
                        if ($teamMembers[$i]->team_id == $teamsArray[$j]->team_id){
                            array_push($teamsArray[$j]->teamMember_array,$teamMembers[$i]);
                        }
                    }
                }
            }



        $objectives=$this->searchObjectivesForTeam($teamsIdArray);
        if ($objectives){
            $lengthOfObjectivesArray=count($objectives);
            for ($i=0 ; $i < $lengthOfObjectivesArray; $i++ ){
                for ( $j = 0; $j<$lengthOfTeamsArray ; $j++){
                    if ($objectives[$i]->team_id == $teamsArray[$j]->team_id){
                        array_push($teamsArray[$j]->objective_array,$objectives[$i]);
                    }
                }
            }
        }

        $calculatedArray=$this->calculateProgress($teamsArray);

        $this->json($calculatedArray);

    }else{
$tempReturnArray=$this->create_error_messageArray('Record Not Found');
echo json_encode($tempReturnArray);
}

}




function searchObjectivesForTeam($teamIdArray){
    $objectives=[];
    $objectivesIdArray=[0];

    $i=0;
    $j = 0;

    $keyResultsArray=[];
    // avoid search empty array
    array_push($objectivesIdArray,'0');



    $objectivesArray=$this->Teams_objectives_model->get_by_team_id_array($teamIdArray);

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

function searchTeamMembersForTeam($teamIdArray){
    $teamMembersArray=[];
    $i=0;

    $menberResultArray=$this->Teams_users_model->get_by_team_id_array($teamIdArray);

    if ($menberResultArray){
        $teamMembersArray=$menberResultArray;

    }

    return $teamMembersArray;
}


function calculateProgress($teamsArray){
    $calculatedArray=[];
    $x = 0;
    $y = 0;
    $z = 0;
    $objectivesLength=0;
    $teamsLength=count($teamsArray);
    for ($x=0; $x<$teamsLength ; $x++){

        $currentTeamProgress=0;
        $totalObjectiveProgress=0;
        $objectivesLength=count($teamsArray[$x]->objective_array);
        if ($objectivesLength==0){
            $teamsArray[$x]->team_progress_status=$currentTeamProgress;
        }else{


            for ($y=0; $y<$objectivesLength; $y++){

                $keyResultLength=count( $teamsArray[$x]->objective_array[$y]->keyResult_array );
                $keyResultProgressTotal=0;
                $currentObjectiveProgress=0;

                if ($keyResultLength==0){
                    $teamsArray[$x]->objective_array[$y]->objective_progress_status=$currentObjectiveProgress;

                }else{

                    for ($z=0; $z<$keyResultLength; $z++){
                        $keyResultProgressTotal=$keyResultProgressTotal+ $teamsArray[$x]->objective_array[$y]->keyResult_array[$z]->result_progress_status;
                    }
                    $currentObjectiveProgress=$keyResultProgressTotal/$keyResultLength;
                    $teamsArray[$x]->objective_array[$y]->objective_progress_status=$currentObjectiveProgress;
                }

                $totalObjectiveProgress=$totalObjectiveProgress+ $teamsArray[$x]->objective_array[$y]->objective_progress_status;
            }

            $teamsArray[$x]->team_progress_status=$totalObjectiveProgress/$objectivesLength;
        }



    }



    $calculatedArray=$teamsArray;
    return $calculatedArray;
}


}
