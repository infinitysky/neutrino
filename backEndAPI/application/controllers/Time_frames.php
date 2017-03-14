<?php

//require APPPATH . '/libraries/REST_Controller.php';
//use Restserver\Libraries\REST_Controller;


if (!defined('BASEPATH'))
    exit('No direct script access allowed');
//REST_Controller
class Time_frames extends CI_Controller
//class Time_frames extends REST_Controller
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

        $this->load->model('Time_frames_model');
        $this->load->library('form_validation');
        $this->load->library('datatables');
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
    public function index()
    {
        $this->getall();
    }



    public function getall()
    {
        $tempData=$this->Time_frames_model->get_all();

        //reformat date to (dd/mm/yyyy)
        $tempData=$this->reFormatDate($tempData);
        echo $this->json($tempData);
    }


    //Warning Because  the DateRangePicker required a specified date format. So every date type must been reformatted before it been send to front.
    public function reFormatDate($processArray){
        $arrlength = count($processArray);
        for ($i=0;$i<$arrlength;$i++){

            $startDate=new DateTime($processArray[$i]->time_frame_start);
            $endDate= new DateTime($processArray[$i]->time_frame_end);
            $processArray[$i]->time_frame_start=$startDate->format('d-m-Y');
            $processArray[$i]->time_frame_end=$endDate->format('d-m-Y');



//            $processArray[$i]->append( array('time_frame_start_Epoch' => $startDate->format('U')));
//            $processArray[$i]->append (array('time_frame_end_Epoch' => $endDate->format('U')));

            $processArray[$i]->time_frame_start_epoch=$startDate->format('U');
            $processArray[$i]->time_frame_end_epoch=$endDate->format('U');



        }
        //var_dump($processArray);

        return $processArray;


    }

    public function json($resArray) {
        header('Content-Type: application/json');
        $outputMessageArray=array(
            "status"=>"success",
            "data"=>$resArray
        );
        echo json_encode($outputMessageArray);
    }


    public function read($id)
    {
        $row = $this->Time_frames_model->get_by_id($id);
        if ($row) {
            $startDate=new DateTime($row->time_frame_start);
            $endDate=new DateTime($row->time_frame_end);

            $data = array(
                'time_frame_id' => $row->time_frame_id,
                'time_frame_description' => $row->time_frame_description,
                'time_frame_start' => $startDate->format('d-m-y'),
                'time_frame_end' => $endDate->format('d-m-y'),
                'time_frame_start_Epoch'=>$startDate->format('u'),
                'time_frame_end_Epoch'=>$startDate->format('u')
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
            $last_insert_id=$this->Time_frames_model->insert($checkArray);
            $this->read($last_insert_id);
        }

    }



    public function update($id,$updateData)
    {
        $row = $this->Time_frames_model->get_by_id($id);

        if ($row) {
            $processArray=$this->dataValidate($updateData);
            if($processArray!=0) {
                $data = array(
                    'time_frame_description' => $processArray['time_frame_description'],
                    'time_frame_start' => $processArray['time_frame_start'],
                    'time_frame_end' => $processArray['time_frame_end'],
                );
                $affectedRowsNumber = $this->Time_frames_model->update($id, $data);
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


        $row = $this->Time_frames_model->get_by_id($id);

        if ($row) {
            $affectRow=$this->Time_frames_model->delete($id);
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
            if (empty($Data['time_frame_description'])) {
                echo json_encode($this->create_error_messageArray("time_frame_description Empty"));
                return 0;
            }
            elseif (empty($Data['time_frame_start'])) {
                echo json_encode($this->create_error_messageArray("time_frame_start Empty"));
                return 0;
            }
            elseif (empty($Data['time_frame_end'])) {
                echo json_encode($this->create_error_messageArray("time_frame_end Empty"));
                return 0;
            }
            else {

                $start_epoch =  $Data['time_frame_start'];
                //$dt_start = new DateTime("@$start_epoch");
                $end_epoch =  $Data['time_frame_end'];
                //$dt_end = new DateTime("@$end_epoch");
                $dt_start = date('Y-m-d', "$start_epoch");
                $dt_end = date('Y-m-d', "$end_epoch");

                $processArray = array(
                    "time_frame_description" => $Data['time_frame_description'],
                    "time_frame_start" => $dt_start,
                    "time_frame_end" => $dt_end,
                );
                return $processArray;
            }
        }
    }



    public function dateRangeTest(){
        //print_r( $this->dateRange( '2010/07/26', '2010/08/05', '+1 week') );
        print_r( $this->dateRange( '2010/01/01', '2020/01/01', '+3 month') );
    }




    function dateRange( $first, $last, $step = '+3 month', $format = 'Y/m/d' ) {

        $dates = array();
        $current = strtotime( $first );
        $last = strtotime( $last );




        while( $current <= $last ) {

            $dates[] = date( $format, $current );
            $current = strtotime( $step, $current );
        }

        return $dates;


    }

    public function quick_set(){

        $Data = json_decode(trim(file_get_contents('php://input')), true);
        $insertDataArray=[];
        $dataArray=$Data['data'];
        if (empty($dataArray)){
            $tempReturnArray=$this->create_error_messageArray('Time Frame empty');
            echo json_encode($tempReturnArray);
        }

        elseif(empty($dataArray['start_date'])){
            $tempErrorArray=$this->create_error_messageArray('start_date empty');
            echo json_encode($tempErrorArray);
        }elseif(empty($dataArray['end_date'])){
            $tempErrorArray=$this->create_error_messageArray('end_date empty');
            echo json_encode($tempErrorArray);
        }

        else{



            //Date and format been set by front end.
            //If there are any issues about the input check the front end at first.

            $startDate=new DateTime($dataArray['start_date']);
            $endDate=new DateTime($dataArray['end_date']);
            $endDate->modify('+1 day');



            $processDateArray=$this->dateRange($startDate->format('Y/m/d'),$endDate->format('Y/m/d'), '+3 month');
            $i=0;
            $count=count($processDateArray);

            $tf_description="";

            for ($i=0;$i<$count-1;$i++){

                $dt_start = $processDateArray[$i];
                $dt_end =$processDateArray[$i+1];


                $tempEndDate=new DateTime($dt_end);
                $tempEndDate->modify('-1 day');

                $final_dt_end = $tempEndDate->format('Y/m/d');



                $time=strtotime($dt_start);
                $month =date('m',$time);
                $year = date('Y', $time);


                if ($month=="01"){
                    $tf_description=$year.", Q1";
                }
                if ($month=="04"){
                    $tf_description=$year.", Q2";
                }
                if ($month=="07"){
                    $tf_description=$year.", Q3";
                }
                if ($month=="10"){
                    $tf_description=$year.", Q4";
                }


                $processArray = array(
                    "time_frame_description" => $tf_description,
                    "time_frame_start" => $dt_start,
                    "time_frame_end" => $final_dt_end,
                );


                array_push($insertDataArray,$processArray);
            }


        }





        $last_query=$this->Time_frames_model->batch_insert($insertDataArray);
        $arraySize=count($insertDataArray);
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






    function findRangeFromToday(){

        $temp=$this->Time_frames_model->getRangeTime();
        $this->json($temp);


    }

}


