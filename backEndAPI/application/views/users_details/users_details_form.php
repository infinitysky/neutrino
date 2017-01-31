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
        <h2 style="margin-top:0px">Users_details <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="varchar">First Name <?php echo form_error('first_name') ?></label>
            <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" value="<?php echo $first_name; ?>" />
        </div>
	    <div class="form-group">
            <label for="varchar">Last Name <?php echo form_error('last_name') ?></label>
            <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" value="<?php echo $last_name; ?>" />
        </div>
	    <div class="form-group">
            <label for="varchar">Dob <?php echo form_error('dob') ?></label>
            <input type="text" class="form-control" name="dob" id="dob" placeholder="Dob" value="<?php echo $dob; ?>" />
        </div>
	    <div class="form-group">
            <label for="int">Mobile Number <?php echo form_error('mobile_number') ?></label>
            <input type="text" class="form-control" name="mobile_number" id="mobile_number" placeholder="Mobile Number" value="<?php echo $mobile_number; ?>" />
        </div>
	    <div class="form-group">
            <label for="int">User Id <?php echo form_error('user_id') ?></label>
            <input type="text" class="form-control" name="user_id" id="user_id" placeholder="User Id" value="<?php echo $user_id; ?>" />
        </div>
	    <input type="hidden" name="user_details_id" value="<?php echo $user_details_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('users_details') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>