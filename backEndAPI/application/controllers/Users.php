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
        //$this->load->view('users/users_list');
        //echo $this->Users_model->json();
        $myanswer=$this->Users_model->get_All();
        //$myanswer=$this->Users_model->get_All()
        $this->json($myanswer);

    }

    public function json($resArray) {
        header('Content-Type: application/json');
        $outputMessageArray=array(
            "status"=>"success",
            "data"=>$resArray
        );
        echo json_encode($outputMessageArray);
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
		'user_id' => $row->user_id,
		'email' => $row->email,
		'username' => $row->username,
		'password' => $row->password,
		'account_status' => $row->account_status,
	    );
            echo json_encode($data);
            //$this->load->view('users/users_read', $data);
        } else {
            //$this->session->set_flashdata('message', 'Record Not Found');
            //redirect(site_url('users'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('users/create_action'),
	    'user_id' => set_value('user_id'),
	    'email' => set_value('email'),
	    'username' => set_value('username'),
	    'password' => set_value('password'),
	    'account_status' => set_value('account_status'),
	);
        $this->load->view('users/users_form', $data);
    }
    
    public function create_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->create();
        } else {
            $data = array(
		'email' => $this->input->post('email',TRUE),
		'username' => $this->input->post('username',TRUE),
		'password' => $this->input->post('password',TRUE),
		'account_status' => $this->input->post('account_status',TRUE),
	    );

            $this->Users_model->insert($data);
            $this->session->set_flashdata('message', 'Create Record Success');
            redirect(site_url('users'));
        }
    }
    
    public function update($id) 
    {
        $row = $this->Users_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('users/update_action'),
		'user_id' => set_value('user_id', $row->user_id),
		'email' => set_value('email', $row->email),
		'username' => set_value('username', $row->username),
		'password' => set_value('password', $row->password),
		'account_status' => set_value('account_status', $row->account_status),
	    );
            $this->load->view('users/users_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users'));
        }
    }
    
    public function update_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->update($this->input->post('user_id', TRUE));
        } else {
            $data = array(
		'email' => $this->input->post('email',TRUE),
		'username' => $this->input->post('username',TRUE),
		'password' => $this->input->post('password',TRUE),
		'account_status' => $this->input->post('account_status',TRUE),
	    );

            $this->Users_model->update($this->input->post('user_id', TRUE), $data);
            $this->session->set_flashdata('message', 'Update Record Success');
            redirect(site_url('users'));
        }
    }
    
    public function delete($id) 
    {
        $row = $this->Users_model->get_by_id($id);

        if ($row) {
            $this->Users_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('users'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users'));
        }
    }

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

