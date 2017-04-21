<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users extends CI_Controller
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
        $this->load->model('Users_details_model');
        $this->load->model('Teams_objectives_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
    }



    public function index()
    {
        $this->getall();
    }


    public function getall()
    {
        $tempData=$this->Users_model->get_all();

        echo $this->json($tempData);
    }


    public function json($resArray) {
        header('Content-Type: application/json');
        $outputMessageArray=array(
            "status"=>"Success",
            "data"=>$resArray
        );
        echo json_encode($outputMessageArray);
    }



    public function create_error_messageArray($message){
        $tempMessageArray=array(
            "status"=>"error",
            "errorMessage"=>$message
        );
        return $tempMessageArray;
    }

    function dataValidate($Data){
        if(empty($Data)){
            echo json_encode( $this->create_error_messageArray("Message Empty"));
            return 0;
        }
        else {
            //  goal_description can be empty
            if (empty($Data['email'])) {
                echo json_encode($this->create_error_messageArray("email Empty"));
                return 0;
            }

            elseif (empty($Data['password'])){
                echo json_encode($this->create_error_messageArray("password Empty"));
                return 0;
            }

            else {


                if (empty($Data['account_status'])) {
                    $Data['account_status']="1";
                }


                $processArray = array(
                    'email' => $Data['email'],
                    'password' => $Data['password'],
                    'account_status' => $Data['account_status'],

                );
                return $processArray;
            }
        }
    }



    function userDetailDataValidate($Data){
        if(empty($Data)){
            echo json_encode( $this->create_error_messageArray("Message Empty"));
            return 0;
        }
        else {
            //  goal_description can be empty
            if (empty($Data['first_name'])) {
                echo json_encode($this->create_error_messageArray("first_name Empty"));
                return 0;
            }

            elseif (empty($Data['last_name'])){
                echo json_encode($this->create_error_messageArray("last_name Empty"));
                return 0;
            }

            else {
                if (empty($Data['dob'])) {
                    $Data['dob']="";
                }
                if (empty($Data['mobile_number'])) {
                    $Data['mobile_number']="";
                }

                if (empty($Data['position'])) {
                    $Data['position'] = "";
                }
                if (empty($Data['role_id'])) {
                    $Data['role_id']="3";
                }

                $processArray = array(
                    'first_name' => $Data['first_name'],
                    'last_name' => $Data['last_name'],
                    'dob' => $Data['dob'],
                    'mobile_number' => $Data['mobile_number'],
                    'position' => $Data['position'],
                    'role_id' => $Data['role_id'],

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

        $row = $this->Users_model->get_by_id($id);
        if ($row) {

            $data = array(
                'user_id' => set_value('user_id', $row->user_id),
                'email' => set_value('email', $row->email),
                'username' => set_value('username', $row->username),
                'password' => set_value('password', $row->password),
                'account_status' => set_value('account_status', $row->account_status),
                'user_details_id' =>set_value('user_details_id',  $row->user_details_id),
                'first_name' =>set_value( 'first_name', $row->first_name),
                'last_name' =>set_value( 'last_name', $row->last_name),
                'dob' =>set_value( 'dob', $row->dob),
                'mobile_number' => set_value('mobile_number', $row->mobile_number),
                'position' =>set_value( 'position', $row->position),
                'role'=>set_value('role', $row->role),
                'role_id'=>set_value('role_id', $row->role_id)

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
        $userDetailArray=$this->userDetailDataValidate($Data);
        if($checkArray !=0&& $userDetailArray!=0){
            $last_insert_id=$this->Users_model->insert($checkArray);
           if ($last_insert_id){
               $userDetailArray['user_id']=$last_insert_id;
               $this->Users_details_model->insert($userDetailArray);

               $this->read($last_insert_id);
           }
        }


    }


    public function update($id,$updateData)
    {
        $row = $this->Users_model->get_by_id($id);

        if ($row) {
            $processArray = $this->dataValidate($updateData);
            $userDetailArray=$this->userDetailDataValidate($updateData);
            if ($processArray != 0 && $userDetailArray!=0) {
                $data1 = array(


                    'email' => $processArray['email'],
                    'password' => $processArray['password'],
                    'account_status' => $processArray['account_status'],

                );

                $data2 = array(

                    'first_name' => $userDetailArray['first_name'],
                    'last_name' => $userDetailArray['last_name'],
                    'dob' => $userDetailArray['dob'],
                    'mobile_number' => $userDetailArray['mobile_number'],
                    'position' => $userDetailArray['position'],
                    'role_id' => $userDetailArray['role_id'],


                );


                $affectedRowsNumber = $this->Users_model->update($id, $data1);
                $affectedRowsNumber =$affectedRowsNumber + $this->Users_details_model->update($id, $data2);


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
        $row = $this->Users_model->get_by_id($id);

        if ($row) {
            $affectRow= $this->Users_model->delete($id);
            $tempReturnArray=array(
                "status"=>'Success',
                "affectRows"=>$affectRow
            );
            $this->json($tempReturnArray);

        } else {
            $tempReturnArray=$this->create_error_messageArray('Record Not Found');
            echo json_encode($tempReturnArray);
        }

    }



    //----------------------------------------------------------------------------





    //-----------------------------------

    public function count_users(){
        $membersNumber=$this->Users_model->total_rows();
        $processArray=array(
            'membersNumber'=>$membersNumber
        );

        $this->json($processArray);

    }




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

        $teamObjectiveWithKeyResult=$this->calculateProgress($teamObjectiveWithKeyResult);

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

