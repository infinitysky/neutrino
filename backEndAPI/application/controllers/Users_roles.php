<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Users_roles extends CI_Controller
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
        $this->load->model('Users_roles_model');
        $this->load->library('form_validation');        
	$this->load->library('datatables');
    }

    public function index()
    {
        $$this->getall();
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
            if (empty($Data['role_id'])) {
                echo json_encode($this->create_error_messageArray("role_id Empty"));
                return 0;
            }
            elseif (empty($Data['user_id'])){
                echo json_encode($this->create_error_messageArray("user_id Empty"));
                return 0;
            }
            else {

                $processArray = array(

                    'id' =>$Data['id'],
                    'role_id' => $Data['role_id'],
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





    public function read($id) 
    {
        $row = $this->Users_roles_model->get_by_id($id);
        if ($row) {
            $data = array(
		'id' => $row->id,
		'role_id' => $row->role_id,
		'user_id' => $row->user_id,
	    );
            $this->load->view('users_roles/users_roles_read', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users_roles'));
        }
    }

    public function create() 
    {
        $data = array(
            'button' => 'Create',
            'action' => site_url('users_roles/create_action'),
	    'id' => set_value('id'),
	    'role_id' => set_value('role_id'),
	    'user_id' => set_value('user_id'),
	);
        $this->load->view('users_roles/users_roles_form', $data);
    }
    
    public function create_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->create();
        } else {
            $data = array(
		'role_id' => $this->input->post('role_id',TRUE),
		'user_id' => $this->input->post('user_id',TRUE),
	    );

            $this->Users_roles_model->insert($data);
            $this->session->set_flashdata('message', 'Create Record Success');
            redirect(site_url('users_roles'));
        }
    }
    
    public function update($id) 
    {
        $row = $this->Users_roles_model->get_by_id($id);

        if ($row) {
            $data = array(
                'button' => 'Update',
                'action' => site_url('users_roles/update_action'),
		'id' => set_value('id', $row->id),
		'role_id' => set_value('role_id', $row->role_id),
		'user_id' => set_value('user_id', $row->user_id),
	    );
            $this->load->view('users_roles/users_roles_form', $data);
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users_roles'));
        }
    }
    
    public function update_action() 
    {
        $this->_rules();

        if ($this->form_validation->run() == FALSE) {
            $this->update($this->input->post('id', TRUE));
        } else {
            $data = array(
		'role_id' => $this->input->post('role_id',TRUE),
		'user_id' => $this->input->post('user_id',TRUE),
	    );

            $this->Users_roles_model->update($this->input->post('id', TRUE), $data);
            $this->session->set_flashdata('message', 'Update Record Success');
            redirect(site_url('users_roles'));
        }
    }
    
    public function delete($id) 
    {
        $row = $this->Users_roles_model->get_by_id($id);

        if ($row) {
            $this->Users_roles_model->delete($id);
            $this->session->set_flashdata('message', 'Delete Record Success');
            redirect(site_url('users_roles'));
        } else {
            $this->session->set_flashdata('message', 'Record Not Found');
            redirect(site_url('users_roles'));
        }
    }

    public function _rules() 
    {
	$this->form_validation->set_rules('role_id', 'role id', 'trim|required');
	$this->form_validation->set_rules('user_id', 'user id', 'trim|required');

	$this->form_validation->set_rules('id', 'id', 'trim');
	$this->form_validation->set_error_delimiters('<span class="text-danger">', '</span>');
    }

}

/* End of file Users_roles.php */
/* Location: ./application/controllers/Users_roles.php */
/* Please DO NOT modify this information : */
/* Generated by Harviacode Codeigniter CRUD Generator 2017-01-30 11:54:10 */
/* http://harviacode.com */