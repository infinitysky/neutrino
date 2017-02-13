<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Activities_users extends CI_Controller
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
        $this->load->model('Activities_users_model');
        $this->load->library('form_validation');        
	$this->load->library('datatables');
    }

    public function index()
    {
        $this->getall();
    }


    public function json($resArray) {
        header('Content-Type: application/json');
        echo json_encode($resArray);
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
            if (empty($Data['goal_name'])) {
                echo json_encode($this->create_error_messageArray("team_name Empty"));
                return 0;
            }elseif (empty($Data['goal_name'])){
                echo json_encode($this->create_error_messageArray("goal_name Empty"));
                return 0;
            }
            elseif (empty($Data['time_frame_id'])){
                echo json_encode($this->create_error_messageArray("time_frame_id Empty"));
                return 0;
            }
            else {

                $processArray = array(
                    'goal_id' =>$Data['goal_id'],
                    'goal_name' => $Data['goal_name'],
                    'goal_description' => $Data['goal_description'],
                    'time_frame_id'=>$Data['time_frame_id'],
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
        $row = $this->Activities_users_model->get_by_id($id);
        if ($row) {
            $data = array(
		'id' => $row->id,
		'activity_id' => $row->activity_id,
		'user_id' => $row->user_id,
	    );
            $this->load->view('activities_users/activities_users_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('activities_users'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('activities_users/create_action'),
	    'id' => set_value('id'),
	    'activity_id' => set_value('activity_id'),
	    'user_id' => set_value('user_id'),
	);
        $this->load->view('activities_users/activities_users_form', $data);
    }
    
    public function create_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->create();
        } else {
            $data = array(
		'activity_id' => $this->input->post('activity_id',TRUE),
		'user_id' => $this->input->post('user_id',TRUE),
	    );

            $this->Activities_users_model->insert($data);
            $this->session->set_flashdata('message', 'Create Record Success');
            redirect(site_url('activities_users'));
        }
    }
    
    public function update($id) 
    {
        $row = $this->Activities_users_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('activities_users/update_action'),
		'id' => set_value('id', $row->id),
		'activity_id' => set_value('activity_id', $row->activity_id),
		'user_id' => set_value('user_id', $row->user_id),
	    );
            $this->load->view('activities_users/activities_users_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('activities_users'));
        }
    }
    
    public function update_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->update($this->input->post('id', TRUE));
        } else {
            $data = array(
		'activity_id' => $this->input->post('activity_id',TRUE),
		'user_id' => $this->input->post('user_id',TRUE),
	    );

            $this->Activities_users_model->update($this->input->post('id', TRUE), $data);
            $this->session->set_flashdata('message', 'Update Record Success');
            redirect(site_url('activities_users'));
        }
    }
    
    public function delete($id) 
    {
        $row = $this->Activities_users_model->get_by_id($id);

        if ($row) {
            $this->Activities_users_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('activities_users'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('activities_users'));
        }
    }

    public function _rules() 
    {
	$this->form_validation->set_rules('activity_id', 'activity id', 'trim|required');
	$this->form_validation->set_rules('user_id', 'user id', 'trim|required');

	$this->form_validation->set_rules('id', 'id', 'trim');
	$this->form_validation->set_error_delimiters('<span class="text-danger">', '</span>');
    }

}

/* End of file Activities_users.php */
/* Location: ./application/controllers/Activities_users.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:09 */
/* http://harviacode.com */