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
        <h2 style="margin-top:0px">Teams Read</h2>
        <table class="table">
	    <tr><td>Team Description</td><td><?php echo $team_description; ?></td></tr>
	    <tr><td>Team Name</td><td><?php echo $team_name; ?></td></tr>
	    <tr><td></td><td><a href="<?php echo site_url('teams') ?>" class="btn btn-default">Cancel</a></td></tr>
	</table>
        </body>
</html>