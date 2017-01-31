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
        <h2 style="margin-top:0px">Activities_users <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="int">Activity Id <?php echo form_error('activity_id') ?></label>
            <input type="text" class="form-control" name="activity_id" id="activity_id" placeholder="Activity Id" value="<?php echo $activity_id; ?>" />
        </div>
	    <div class="form-group">
            <label for="int">User Id <?php echo form_error('user_id') ?></label>
            <input type="text" class="form-control" name="user_id" id="user_id" placeholder="User Id" value="<?php echo $user_id; ?>" />
        </div>
	    <input type="hidden" name="id" value="<?php echo $id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('activities_users') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>