<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Teams_users extends CI_Controller
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

    public function getall()
    {
        $tempData=$this->Activities_model->get_all();

        echo $this->json($tempData);
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


            //  goal_description can be empty
            if (empty($Data['team_id'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }elseif (empty($Data['user_id'])){
                echo json_encode($this->create_error_messageArray("goal_name Empty"));
                return 0;
            }

            else {

                $processArray = array(
                    'team_id' =>$Data['team_id'],
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

    public function search_id(){
        $Data = json_decode(trim(file_get_contents('php://input')), true);
        $method = $_SERVER['REQUEST_METHOD'];
        if('POST'!=$method){

        }

    }





    public function read($id) 
    {
        $row = $this->Teams_users_model->get_by_id($id);
        if ($row) {
            $data = array(
		'team_id' => $row->team_id,
		'user_id' => $row->user_id,
		'id' => $row->id,
	    );
            $this->load->view('teams_users/teams_users_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('teams_users'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('teams_users/create_action'),
	    'team_id' => set_value('team_id'),
	    'user_id' => set_value('user_id'),
	    'id' => set_value('id'),
	);
        $this->load->view('teams_users/teams_users_form', $data);
    }
    

    
    public function update($id) 
    {
        $row = $this->Teams_users_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('teams_users/update_action'),
		'team_id' => set_value('team_id', $row->team_id),
		'user_id' => set_value('user_id', $row->user_id),
		'id' => set_value('id', $row->id),
	    );
            $this->load->view('teams_users/teams_users_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('teams_users'));
        }
    }
    

    
    public function delete($id) 
    {
        $row = $this->Teams_users_model->get_by_id($id);

        if ($row) {
            $this->Teams_users_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('teams_users'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('teams_users'));
        }
    }


}

/* End of file Teams_users.php */
/* Location: ./application/controllers/Teams_users.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */