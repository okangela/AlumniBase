$(document).ready(function() {

 $(".dropdown-menu li a").click(function() {
        text = $(this).closest("li").text();
        $("input[name='selection']").val(text);
        $(this).parents('.dropdown').find('.dropdown-toggle').html(text+' <span class="caret"></span>');
        // $("#search").submit();
    });

 $(".cluster1 li a").click(function() {
        text = $(this).closest("li").text();
        $("input[name='selection']").val(text);
        $(this).parents('.dropdown').find('.dropdown-toggle').html(text+' <span class="caret"></span>');
        var cluster1 = $(this).attr("id");
        console.log(cluster1);
        // $("#search").submit();

        $(".cluster2 li a").click(function() {
        text = $(this).closest("li").text();
        $("input[name='selection']").val(text);
        $(this).parents('.dropdown').find('.dropdown-toggle').html(text+' <span class="caret"></span>');
        var cluster2 = $(this).attr("id");
        console.log(cluster2);
        // $("#search").submit();
    	

    	getMyData();


		function getMyData() {
		    var myData = [];
		    var myFilters = [cluster1, cluster2];

		    $.getJSON('cluster.json', function (data) {
		        var obj = {name: "", children: data.People};
		        
		        myData = sliceDice(obj, myFilters[0]);
		        
		        $.each(myData, function (l1, group_l1) {
		            myData[l1]["children"] = sliceDice(group_l1, myFilters[1]);
		        });
		        
		        $.each(myData, function (l1, group_l1) {
		            $.each(group_l1.children, function (l2, group_l2) {
		                myData[l1]["children"][l2]["children"] = sliceDice(group_l2, myFilters[2]);
		            });
		        });
		        console.log(myData);
		    });
		}

		function sliceDice(obj, value) {
		    var groups = {};
		    $.each(obj.children, function (i, person) {
		        var level = person[value];
		        delete person[value];
		        if (groups[level]) {
		            groups[level].push(person);
		        } else {
		            groups[level] = [person];
		        }
		    });

		    var result = $.map(groups, function (group, key) {
		        var obj = [];
		        obj.push({name: key, children: group, size: group.length});
		        return obj;
		    });

		    return(result);
		}

		}); //end of cluster2 filters click events
   }); //end of cluster1 filters click events

}); //document ready ends

