<?php
defined('_JEXEC') or die('Restricted access'); // no direct access
require(JPATH_SITE.DS.'modules'.DS.'mod_rpl_search'.DS.'tmpl'.DS.'js.php');
?>
<div class="quicksearch">
	<form id="rpl_search_form<?php echo $mod_id;?>" onsubmit="return false;" method="get" class="clearfix">
	<div id="rpl_search_<?php echo $mod_id;?>" class="rpl_search_mod<?php echo $moduleclass_sfx?> search_content_box">
		<?php 
		$currently='';
		foreach  ($resulted_fields as $field)
		{
			if ($field['field']->id == 41)
			{
				$currently .=  '<div id="qrpl_search_li'.$field['field']->id.'"'.$field_style.' class="'.$field['options'].'_li">'.$field['rendered'].'</div>';
			}		
		}
		$currently.='<button class="rpl_search_button button fa fa-search" onclick="rpl_do_search'.$mod_id.'()">&nbsp;</button>';
		echo $currently;
		?>
	</div>
	</form>
</div>