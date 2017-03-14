<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_objectives extends CI_Controller
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
        $this->load->model('Users_objectives_model');
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
        $tempData=$this->Users_objectives_model->get_all();

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
            if (empty($Data['objective_id'])) {
                echo json_encode($this->create_error_messageArray("objective_id Empty"));
                return 0;
            }elseif (empty($Data['user_id'])){
                echo json_encode($this->create_error_messageArray("user_id Empty"));
                return 0;
            }

            else {

                $processArray = array(
                    'objective_id' =>$Data['objective_id'],
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
        $row = $this->Users_objectives_model->get_by_id($id);

        if ($row) {
            $data = array(
                'objective_id' => set_value('objective_id', $row->objective_id),
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
            $last_insert_id=$this->Users_objectives_model->insert($checkArray);
            $this->read($last_insert_id);
        }
    }



    public function update($id,$updateData)
    {
        $row = $this->Users_objectives_model->get_by_id($id);


        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {

                $data = array(

                    'objective_id' => set_value('objective_id', $row->objective_id),
                    'user_id' => set_value('user_id', $row->user_id),

                );
                $affectedRowsNumber = $this->Users_objectives_model->update($id, $data);

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


        $row = $this->Users_objectives_model->get_by_id($id);



        if ($row) {
            $affectRow=$this->Users_objectives_model->delete($id);
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
            $last_query=$this->Users_objectives_model->batch_insert($dataArray);
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

        elseif(empty($Data['data']['objective_id'])){
            $tempReturnArray=$this->create_error_messageArray('data empty');
            echo json_encode($tempReturnArray);
        }

        else{
            $dataArray=$Data['data'];
            $teamId=$Data['data']['objective_id'];

            //TODO:improve the security need to create a data Validator before insert the information into database.
            $processArray=$this->relationship_analysis($dataArray);
            if($processArray) {

                $insertArraySize = count($processArray['insert']);
                $deleteArraySize = count($processArray['delete']);


                if (!empty($processArray) && $insertArraySize != 0) {

                    $infos = $processArray['insert'];

                    for ($i = 0; $i < $insertArraySize; $i++) {
                        $insertInformation = array(
                            "user_id" => $infos[$i],
                            "objective_id" => $teamId
                        );
                        array_push($insertArray, $insertInformation);
                    }
                    $insertedNumber = $this->Users_objectives_model->batch_insert($insertArray);

                }
                if (!empty($processArray) && $deleteArraySize != 0) {
                    // $last_query=$this->Users_objectives_model->batch_delete_by_objective_id($processArray['delete']);
                    array_push($deleteArray, 0);
                    for ($i = 0; $i < $deleteArraySize; $i++) {
                        array_push($deleteArray, $processArray['delete'][$i]);
                    }
                    $deletedNumber = $this->Users_objectives_model->batch_delete_by_objective_id($teamId, $deleteArray);
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
        if(empty($updateData)||empty($updateData['objective_id'])){
            $tempErrorArray=$this->create_error_messageArray('Update Array Not Exist! ');
            echo json_encode($tempErrorArray);

        }elseif(empty($updateData['objective_id'])){
            $tempErrorArray=$this->create_error_messageArray('objective_id Not Exist! ');
            echo json_encode($tempErrorArray);

        }
        else{

            //Get Current Members
            $membersArray=$this->Users_objectives_model->get_by_objective_id($updateData['objective_id']);
            $Members=$updateData['new_members'];

            if ($membersArray){
                $arrayLength=count($membersArray);

                for ($i=0;$i<$arrayLength;$i++){
                    array_push($memberIdArray,$membersArray[$i]->user_id);
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
                    $tempArray['user_id']=>$deleteData[$i]['user_id'],
                    $tempArray['objective_id']=>$deleteData[$i]['objective_id'],
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
                    $tempArray['user_id']=$insertDataData[$i]['user_id'],
                    $tempArray['objective_id']=$insertDataData[$i]['objective_id'],
                );

                array_push($checkedData,$tempArray);
            }

        }

        return $checkedData;
    }








    public function batch_delete_by_objective_id()
    {
        $Data = json_decode(trim(file_get_contents('php://input')), true);

        if (empty($Data['data'])){
            $tempErrorArray=$this->create_error_messageArray('Team Member empty!');
            echo json_encode($tempErrorArray);


        }

        else{
            $dataArray=$Data['data'];
            $teamId=$dataArray['objective_id'];
            $deleteArray=$dataArray['user_ids'];


            $last_query=$this->Users_objectives_model->batch_delete_by_objective_id($teamId,$deleteArray);
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
        $row = $this->Users_objectives_model->get_by_user_id($id);



        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){
                $info = array(
                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'objective_name' => set_value('team_description', $row[$i]->objective_name),
                    'objective_description' => set_value('team_name', $row[$i]->objective_description),
                    'objective_unit' => set_value('parent_objective_id', $row[$i]->objective_unit),
                    'objective_status' => set_value('team_leader_user_id', $row[$i]->objective_status),
                    'objective_progress_status' => set_value('team_leader_user_id', $row[$i]->objective_progress_status),
                    'objective_target' => set_value('team_leader_user_id', $row[$i]->objective_target),
                    'first_name' => set_value('first_name', $row[$i]->first_name),
                    'last_name' => set_value('last_name', $row[$i]->last_name),


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
        $row = $this->Users_objectives_model->get_by_objective_id($id);
        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){

                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'objective_name' => set_value('team_description', $row[$i]->objective_name),
                    'objective_description' => set_value('team_name', $row[$i]->objective_description),
                    'objective_unit' => set_value('parent_objective_id', $row[$i]->objective_unit),
                    'objective_status' => set_value('team_leader_user_id', $row[$i]->objective_status),
                    'objective_progress_status' => set_value('team_leader_user_id', $row[$i]->objective_progress_status),
                    'objective_target' => set_value('team_leader_user_id', $row[$i]->objective_target),
                    'first_name' => set_value('first_name', $row[$i]->first_name),
                    'last_name' => set_value('last_name', $row[$i]->last_name),

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

    public function get_by_objective_and_Users_details(){

        $data=[];
        $row = $this->Users_objectives_model->get_team_and_users_details();
        if ($row){
            $length= count($row);
            for($i=0;$i<$length;$i++){

                $info = array(

                    'record_id' => set_value('record_id', $row[$i]->record_id),
                    'objective_id' => set_value('objective_id', $row[$i]->objective_id),
                    'user_id' => set_value('user_id', $row[$i]->user_id),
                    'objective_name' => set_value('team_description', $row[$i]->objective_name),
                    'objective_description' => set_value('team_name', $row[$i]->objective_description),
                    'objective_unit' => set_value('parent_objective_id', $row[$i]->objective_unit),
                    'objective_status' => set_value('team_leader_user_id', $row[$i]->objective_status),
                    'objective_progress_status' => set_value('team_leader_user_id', $row[$i]->objective_progress_status),
                    'objective_target' => set_value('team_leader_user_id', $row[$i]->objective_target),
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
