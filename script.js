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
        // console.log(cluster1);
        // $("#search").submit();

        $(".cluster2 li a").click(function() {
        text = $(this).closest("li").text();
        $("input[name='selection']").val(text);
        $(this).parents('.dropdown').find('.dropdown-toggle').html(text+' <span class="caret"></span>');
        var cluster2 = $(this).attr("id");
        // console.log(cluster2);
        // $("#search").submit();
    	
    	getMyData();


function getMyData() {
    var output;
    var myData = [];
    var myFilters = [cluster1, cluster2];

    $.getJSON('cluster.json', function (data) {
        var obj = {name: "", children: data.People};
        
        myData = sliceDice(obj, myFilters[0], false);
        
        $.each(myData, function (l1, group_l1) {
            myData[l1]["children"] = sliceDice(group_l1, myFilters[1], true);
        });
        
        // $.each(myData, function (l1, group_l1) {
        //     $.each(group_l1.children, function (l2, group_l2) {
        //         myData[l1]["children"][l2]["children"] = sliceDice(group_l2, myFilters[2], true);
        //     });
        // });

        output = {name:"", children: myData};    
        updateClusterData(output);
        // $('body').html(JSON.stringify(output));
    });
}

function updateClusterData(newData) {

    var w = 480,
    h = 480,
    r = 450,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;
    
    var pack = d3.layout.pack()
        .size([r, r])
        .padding(10)
        .sort(function (a, b) {
            return b.value - a.value;
        })
        .value(function(d) { return d.size; })

    node = root = newData;
    var nodes = pack.nodes(root);

    var vis = d3.select(".clusterChart").select("svg").select("g");

    var nodeSVG = vis.selectAll("circle").data(nodes);

    nodeSVG.on("click", function(d) { 
            if(d.depth == 2) {
                tip.hide(d);
            } else {
                return zoom(node == d ? root : d); 
        }
        })
        .transition() 
        .duration(500)
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; });
      
    nodeSVG.enter().append("svg:circle")
        .on("click", function(d) { 
            if(d.depth == 2) {
                tip.hide(d);
            } else {
                return zoom(node == d ? root : d); 
            }
        })
        .transition() 
        .duration(500)
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; });
      

    nodeSVG.exit()
            .transition() 
            .duration(100)
            .remove();

    vis.selectAll("circle")
    .filter(function(d, i) {        
        return d.depth == 2;
    })
    .style("stroke", "gray")
    .style("stroke-opacity", 0.2)
    .style("fill", "gray")
    .style("fill-opacity", 0.2)
    .on("mouseover", function(d, i){
        tip.show(d);
        d3.select(this).style("stroke", "black");
        d3.select(this).style("stroke-opacity", 0.5);
    })
    .on("mouseout", function(d, i){
        tip.hide(d);
        d3.select(this).style("stroke", "gray");   
        d3.select(this).style("stroke-opacity", 0.2);
    });
    
    vis.selectAll("circle")
    .filter(function(d, i) {
        return parseInt(d.depth) - 1 === 0;
    })
    .style("stroke", "purple")
    .style("fill", "#efefef")
    .style("fill-opacity", function(d) {
        return 1;
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

    vis.selectAll("circle")
    .filter(function(d, i) {
        return parseInt(d.depth) === 0;
    })
    .style("stroke", "white")
    .style("fill", "white")
    .style("fill-opacity", 0);


    var nodeText = vis.selectAll("text").remove();

    vis.selectAll("text")
      .data(nodes)
      .enter()
      .append("svg:text")
      .filter(function(d, i) {
        return d.depth == 1;
      })
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")      
      .style("opacity", function(d) { return d.r > 25 ? 1 : 0; })
      .text(function(d) { return d.name; });

  d3.select(window).on("click", function() { 
    zoom(root); 
  });

}

function sliceDice(obj, value, lastLoop) {
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
        if(lastLoop === true) {
            obj.push({name: key, size: group.length});
        } else {
             obj.push({name: key, children: group, size: group.length});
        }
        return obj;
    
    });

    return(result);
}

		}); //end of cluster2 filters click events
   }); //end of cluster1 filters click events


}); //document ready ends





