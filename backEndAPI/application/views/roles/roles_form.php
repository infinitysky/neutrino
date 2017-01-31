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
        <h2 style="margin-top:0px">Roles <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="varchar">Role <?php echo form_error('role') ?></label>
            <input type="text" class="form-control" name="role" id="role" placeholder="Role" value="<?php echo $role; ?>" />
        </div>
	    <input type="hidden" name="role_id" value="<?php echo $role_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('roles') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>