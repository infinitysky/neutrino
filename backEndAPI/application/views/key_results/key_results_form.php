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
        <h2 style="margin-top:0px">Key_results <?php echo $button ?></h2>
        <form action="<?php echo $action; ?>" method="post">
	    <div class="form-group">
            <label for="description">Description <?php echo form_error('description') ?></label>
            <textarea class="form-control" rows="3" name="description" id="description" placeholder="Description"><?php echo $description; ?></textarea>
        </div>
	    <input type="hidden" name="result_id" value="<?php echo $result_id; ?>" /> 
	    <button type="submit" class="btn btn-primary"><?php echo $button ?></button> 
	    <a href="<?php echo site_url('key_results') ?>" class="btn btn-default">Cancel</a>
	</form>
    </body>
</html>