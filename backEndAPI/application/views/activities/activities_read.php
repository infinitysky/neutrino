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
        <h2 style="margin-top:0px">Activities Read</h2>
        <table class="table">
	    <tr><td>Activity Detail</td><td><?php echo $activity_detail; ?></td></tr>
	    <tr><td></td><td><a href="<?php echo site_url('activities') ?>" class="btn btn-default">Cancel</a></td></tr>
	</table>
        </body>
</html>