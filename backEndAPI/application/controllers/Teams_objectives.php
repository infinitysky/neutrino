<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Teams_objectives extends CI_Controller
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

    public function getall()
    {
        $tempData=$this->Teams_objectives_model->get_all();

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
            }elseif (empty($Data['objective_id'])){
                echo json_encode($this->create_error_messageArray("objective_id Empty"));
                return 0;
            }

            else {

                $processArray = array(
                    'team_id' =>$Data['team_id'],
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
        $row = $this->Teams_objectives_model->get_by_id($id);

        if ($row) {
            $data = array(
                'team_id' => set_value('team_id', $row->team_id),
                'objective_id' => set_value('objective_id', $row->objective_id),
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
            $last_insert_id=$this->Teams_objectives_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }



    public function update($id,$updateData)
    {
        $row = $this->Teams_objectives_model->get_by_id($id);


        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {

                $data = array(

                    'team_id' => set_value('team_id', $row->team_id),
                    'objective_id' => set_value('objective_id', $row->objective_id),

                );
                $affectedRowsNumber = $this->Teams_objectives_model->update($id, $data);

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


        $row = $this->Teams_objectives_model->get_by_id($id);



        if ($row) {
            $affectRow=$this->Teams_objectives_model->delete($id);
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
            $tempReturnArray=$this->create_error_messageArray('Team member empty');
            echo json_encode($tempReturnArray);

        }

        else{
            $dataArray=$Data['data'];

            //TODO:improve the security need to create a data Validator before insert the information into database.
            $last_query=$this->Teams_objectives_model->batch_insert($dataArray);
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



    //To receive current members data and work out the inserted and removed members
    public function update_members()
    {

        //JSON structure is
        //├───status
        //├───data
        //│    ├───teamId
        //│    ├───current_member

        $Data = json_decode(trim(file_get_contents('php://input')), true);
        $i=0;
        $insertedNumber=0;
        $deletedNumber=0;
        $insertArray=[];
        $deleteArray=[];
        if (empty($Data['data'])){
            $tempReturnArray=$this->create_error_messageArray('data empty');
            echo json_encode($tempReturnArray);
        }

        elseif(empty($Data['data']['team_id'])){
            $tempReturnArray=$this->create_error_messageArray('data empty');
            echo json_encode($tempReturnArray);
        }

        else{
            $dataArray=$Data['data'];
            $teamId=$Data['data']['team_id'];

            //TODO:improve the security need to create a data Validator before insert the information into database.
            $processArray=$this->relationship_analysis($dataArray);
            if($processArray) {

                $insertArraySize = count($processArray['insert']);
                $deleteArraySize = count($processArray['delete']);


                if (!empty($processArray) && $insertArraySize != 0) {

                    $infos = $processArray['insert'];

                    for ($i = 0; $i < $insertArraySize; $i++) {
                        $insertInformation = array(
                            "objective_id" => $infos[$i],
                            "team_id" => $teamId
                        );
                        array_push($insertArray, $insertInformation);
                    }
                    $insertedNumber = $this->Teams_objectives_model->batch_insert($insertArray);

                }
                if (!empty($processArray) && $deleteArraySize != 0) {
                    // $last_query=$this->Teams_objectives_model->batch_delete_by_team_id($processArray['delete']);
                    array_push($deleteArray, 0);
                    for ($i = 0; $i < $deleteArraySize; $i++) {
                        array_push($deleteArray, $processArray['delete'][$i]);
                    }
                    $deletedNumber = $this->Teams_objectives_model->batch_delete_by_team_id($teamId, $deleteArray);
                }

                $totalAffectSize = $insertArraySize + $deleteArraySize;
                $finalAffectedRows = $insertedNumber + $deletedNumber;

                if ($totalAffectSize == $finalAffectedRows && $finalAffectedRows == 0) {
                    $successArray = array(
                        "affectRows" => $finalAffectedRows
                    );
                    $this->json($successArray);
                }
//                elseif ($finalAffectedRows == 0) {
//                    $tempErrorArray = $this->create_error_messageArray('No Changes');
//                    echo json_encode($tempErrorArray);
//                }
                else {
                    $tempErrorArray = $this->create_error_messageArray('Create Error!' . 'Inserted: ' . $insertedNumber . 'Deleted: ' . $deletedNumber);
                    echo json_encode($tempErrorArray);
                }

            }

        }
    }


    public function relationship_analysis($updateData){

        $memberIdArray=[];
        $newMembersIdArray=[];
        $checkedArray=[];
        $arrayLength=0;
        $i=0;
        if(empty($updateData)||empty($updateData['team_id'])){
            $tempErrorArray=$this->create_error_messageArray('Update Array Not Exist! ');
            echo json_encode($tempErrorArray);

        }elseif(empty($updateData['team_id'])){
            $tempErrorArray=$this->create_error_messageArray('team_id Not Exist! ');
            echo json_encode($tempErrorArray);

        }
        else{

            //Get Current Members
            $membersArray=$this->Teams_objectives_model->get_by_team_id($updateData['team_id']);
            $Members=$updateData['new_members'];

            if ($membersArray){
                $arrayLength=count($membersArray);

                for ($i=0;$i<$arrayLength;$i++){
                    array_push($memberIdArray,$membersArray[$i]->objective_id);
                }

            }
            if (empty($membersArray)){
                $memberIdArray=[];
            }

            $arrayLength=count($Members);

            for ($i=0;$i<$arrayLength;$i++){
                array_push($newMembersIdArray,$Members[$i]);
            }


            //for easy to understand
            //array_diff() is using to check the included element.
            //old = 100,94,83,82,80,78,76
            //new = 99,97,80,78,76
            //added = 99,97
            //removed = 10,98,83,82

            $old=$memberIdArray;
            $new=$newMembersIdArray;
            $removed=array_diff($old,$new);
            $added=array_diff($new,$old);
            $same=array_diff($memberIdArray,$memberIdArray); //empty

            $removedMembers=array_diff($memberIdArray,$newMembersIdArray);

            $addedMembers=array_diff($newMembersIdArray,$memberIdArray);


            //var_dump($addedMembers);


            //array_values() reset the array index start from0
            $checkedArray=array(
                "insert"=>array_values($addedMembers),
                "delete"=>array_values($removedMembers),
            );
        }

        return $checkedArray;
    }





    public function batchUpdateDataValidate($updateData){
        $checkedData=[];
        $tempArray=[];
        $i=0;
        if(empty($updateData)){
            $tempErrorArray=$this->create_error_messageArray('Update Array Not Existing! ');
            echo json_encode($tempErrorArray);

        }else{



        }

    }
    public function batchDeleteDataValidate($deleteData){
        $checkedData=[];
        $tempArray=[];
        $i=0;
        if(empty($updateData)){
            $tempErrorArray=$this->create_error_messageArray('Delete Array Not Existing!');
            echo json_encode($tempErrorArray);
        }else{
            $arrayLength=count($deleteData);
            for ($i=0;$i<$arrayLength;$i++){
                $tempArray=array(
                    $tempArray['objective_id']=>$deleteData[$i]['objective_id'],
                    $tempArray['team_id']=>$deleteData[$i]['team_id'],
                );
                array_push($checkedData,$tempArray);
            }
        }
        return $checkedData;
    }

    public function batchInsertDataValidate($insertDataData){
        $checkedData=[];

        $i=0;
        if(empty($insertDataData)){
            $tempErrorArray=$this->create_error_messageArray('Insert Array Not Existing! ');
            echo json_encode($tempErrorArray);

        }else{

            $arrayLength=count($insertDataData);
            for ($i=0;$i<$arrayLength;$i++){
                $tempArray=array(
                    $tempArray['objective_id']=$insertDataData[$i]['objective_id'],
                    $tempArray['team_id']=$insertDataData[$i]['team_id'],
                );

                array_push($checkedData,$tempArray);
            }

        }

        return $checkedData;
    }








    public function batch_delete_by_team_id()
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);

        if (empty($Data['data'])){
            $tempErrorArray=$this->create_error_messageArray('Team Member empty!');
            echo json_encode($tempErrorArray);


        }

        else{
            $dataArray=$Data['data'];
            $teamId=$dataArray['team_id'];
            $deleteArray=$dataArray['objective_ids'];


            $last_query=$this->Teams_objectives_model->batch_delete_by_team_id($teamId,$deleteArray);
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


    public function get_by_objective_id($objectiveId){


        $i=0;
        $data=[];
        $row = $this->Teams_objectives_model->get_by_objective_id($objectiveId);

        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){
                $info = array(
                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    'team_id' => set_value('team_id', $row[$i]->team_id),
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'objective_name' => set_value('first_name', $row[$i]->objective_name),
                    'objective_description' => set_value('last_name', $row[$i]->objective_description),
                    'objective_unit' => set_value('dob', $row[$i]->objective_unit),
                    'objective_status' => set_value('mobile_number', $row[$i]->objective_status),
                    'objective_progress_status' => set_value('position', $row[$i]->objective_progress_status),
                    'objective_target' => set_value('email', $row[$i]->objective_target),

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
        $row = $this->Teams_objectives_model->get_by_team_id($id);
        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){

                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    'team_id' => set_value('team_id', $row[$i]->team_id),
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'objective_name' => set_value('first_name', $row[$i]->objective_name),
                    'objective_description' => set_value('last_name', $row[$i]->objective_description),
                    'objective_unit' => set_value('dob', $row[$i]->objective_unit),
                    'objective_status' => set_value('mobile_number', $row[$i]->objective_status),
                    'objective_progress_status' => set_value('position', $row[$i]->objective_progress_status),
                    'objective_target' => set_value('email', $row[$i]->objective_target),
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

    public function get_by_team_and_Objectives(){

        $data=[];
        $row = $this->Teams_objectives_model->get_team_and_users_details();
        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){

                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    'team_id' => set_value('team_id', $row[$i]->team_id),
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'objective_name' => set_value('first_name', $row[$i]->objective_name),
                    'objective_description' => set_value('last_name', $row[$i]->objective_description),
                    'objective_unit' => set_value('dob', $row[$i]->objective_unit),
                    'objective_status' => set_value('mobile_number', $row[$i]->objective_status),
                    'objective_progress_status' => set_value('position', $row[$i]->objective_progress_status),
                    'objective_target' => set_value('email', $row[$i]->objective_target),

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
