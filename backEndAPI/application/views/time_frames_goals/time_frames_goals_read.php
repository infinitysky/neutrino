<!doctype html>
<html>
    <head>
        <title>harviacode.com - codeigniter crud generator</title>
        <link rel="stylesheet" href="<?php echo base_url('assets/bootstrap/css/bootstrap.min.css') ?>"/>
        <style>
            body{
                padding: 15px;
            }
        </style>
    </head>
    <body>
        <h2 style="margin-top:0px">Time_frames_goals Read</h2>
        <table class="table">
	    <tr><td>Goal Id</td><td><?php echo $goal_id; ?></td></tr>
	    <tr><td>Time Frame Id</td><td><?php echo $time_frame_id; ?></td></tr>
	    <tr><td></td><td><a href="<?php echo site_url('time_frames_goals') ?>" class="btn btn-default">Cancel</a></td></tr>
	</table>
        </body>
</html>