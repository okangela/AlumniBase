// var sankey1Value = "Major";
// var sankey2Value = "Year_Completion";
// var sankey3Value = "Current_Employer";

// $(document).ready(function() {

//     $(".sankey1 ul li a").click(function() {
//         text = $(this).closest("li").text();
//         $("input[name='selection']").val(text);
//         $(this).parents('.dropdown').find('.dropdown-toggle').html(text + ' <span class="caret"></span>');
//         var sankeyText = $(this).attr("id");
//         sankey1Value = sankeyText;
//         validateSankeyInput();
//     });

//     $(".sankey2 ul li a").click(function() {
//         text = $(this).closest("li").text();
//         $("input[name='selection']").val(text);
//         $(this).parents('.dropdown').find('.dropdown-toggle').html(text + ' <span class="caret"></span>');
//         var sankeyText = $(this).attr("id");
//         sankey2Value = sankeyText;
//         validateSankeyInput();
//     });

//     $(".sankey3 ul li a").click(function() {
//         text = $(this).closest("li").text();
//         $("input[name='selection']").val(text);
//         $(this).parents('.dropdown').find('.dropdown-toggle').html(text + ' <span class="caret"></span>');
//         var sankeyText = $(this).attr("id");
//         sankey3Value = sankeyText;
//         validateSankeyInput();
//     });
// });

// function validateSankeyInput() {
//     if (sankey1Value == sankey2Value || sankey2Value == sankey3Value || sankey3Value == sankey1Value) {
//         showWarningSign();
//     } else {
//         hideWarningSign();
//     }
// }

// function showWarningSign() {
//     d3.select("#sankeyBadInput")
//         .style("visibility", "visible")
//         .transition()
//         .duration(200)
//         .style("opacity", 1);
//     d3.select(".sankey4")
//         .select("button")
//         .attr("disabled", "disabled");
// }

// function hideWarningSign() {
//     d3.select("#sankeyBadInput")
//         .transition()
//         .duration(200)
//         .style("opacity", 0)
//         .style("visibility", "hidden");
//     d3.select(".sankey4")
//         .select("button")
//         .attr("disabled", null);
// }

// function refreshSankey() {
//     d3.json("cluster.json", function(clusterData) {

//         var pillWidth = 90;
//         var pillHeight = 40;
//         var clickCounter = -1;
//         var nextBoxX = 0;
//         var pillPadding = 3;

//         var column1 = sankey1Value;
//         var column2 = sankey2Value;
//         var column3 = sankey3Value;

//         var id = 0;
//         var nodes = {};
//         var links = {};
//         var types = {};

//         var column1_uniq = 0;
//         var column2_uniq = 0;
//         var column3_uniq = 0;

//         clusterData.People.forEach(function(d) {

//             if (d[column1] == "Unknown" || d[column2] == "Unknown" || d[column3] == "Unknown" || d[column1] == "undefined" || d[column2] == "undefined" || d[column3] == "undefined" || d[column1] === undefined || d[column2] === undefined || d[column3] === undefined) {

//             } else {
//                 if (links[d[column1]] == undefined) {
//                     links[d[column1]] = {};
//                 } else if (links[d[column1]][d[column2]] == undefined) {
//                     links[d[column1]][d[column2]] = 1
//                 } else {
//                     links[d[column1]][d[column2]]++;
//                 }

//                 if (links[d[column2]] == undefined) {
//                     links[d[column2]] = {};
//                 }
//                 if (links[d[column2]][d[column3]] == undefined) {
//                     links[d[column2]][d[column3]] = 1
//                 } else {
//                     links[d[column2]][d[column3]]++;
//                 }

//                 if (nodes[d[column1]] == undefined) {
//                     nodes[d[column1]] = column1_uniq;
//                     types[d[column1]] = column1;
//                     column1_uniq++;
//                 }

//                 if (nodes[d[column2]] == undefined) {
//                     nodes[d[column2]] = column2_uniq;
//                     types[d[column2]] = column2;
//                     column2_uniq++;
//                 }

//                 if (nodes[d[column3]] == undefined) {
//                     nodes[d[column3]] = column3_uniq;
//                     types[d[column3]] = column3;
//                     column3_uniq++;
//                 }
//             }
//         });

//         sankeyLinks = [];

//         for (var level1 in nodes) {
//             if (types[level1] == column2) {
//                 nodes[level1] = nodes[level1] + column1_uniq;
//             } else if (types[level1] == column3) {
//                 nodes[level1] = nodes[level1] + column1_uniq + column2_uniq;
//             }
//         }

//         for (var level1 in links) {
//             for (var level2 in links[level1]) {
//                 var tempLink = {};
//                 tempLink["source"] = nodes[level1];
//                 tempLink["target"] = nodes[level2];
//                 tempLink["value"] = links[level1][level2];
//                 if (tempLink["source"] != tempLink["target"]) {
//                     sankeyLinks.push(tempLink);
//                 }
//             }
//         }

//         sankeyLinks.sort(function(a, b) {
//             return parseInt(a.source) - parseInt(b.source);
//         });

//         sankeyNodes = [];
//         for (var level1 in nodes) {
//             var tempNode = {};
//             tempNode["name"] = level1;
//             tempNode["category"] = types[level1];
//             tempNode["id"] = nodes[level1];
//             sankeyNodes.push(tempNode);
//         }
//         sankeyNodes.sort(function(a, b) {
//             return parseInt(a.id) - parseInt(b.id);
//         });

//         sankeyData = {};
//         sankeyData["nodes"] = sankeyNodes;
//         sankeyData["links"] = sankeyLinks;

//         d3.select(".sankeyChart").select("svg").remove();

//         var svg = d3.select(".sankeyChart").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         var sankey = d3.sankey()
//             .nodeWidth(16)
//             .nodePadding(8)
//             .size([width, height]);

//         var path = sankey.link()
//             .curvature(0.4);

//         mydatabase = sankeyData;

//         sankey.nodes(mydatabase.nodes)
//             .links(mydatabase.links)
//             .layout(40);

//         var link = svg.append("g").selectAll(".link")
//             .data(mydatabase.links)
//             .enter().append("path")
//             .attr("class", "link")
//             .attr("d", path)
//             .style("stroke-width", function(d) {
//                 return Math.max(1, d.dy);
//             })
//             .sort(function(a, b) {
//                 return b.dy - a.dy;
//             })
//             .on("mouseover", function(d) {
//                 d3.select(this).style("stroke-opacity", 0.5);

//                 d3.selectAll(".node")
//                     .style("opacity", 0.3)
//                     .filter(function(p) {
//                         return d.source.name == p.name ||
//                             d.target.name == p.name;
//                     })
//                     .style("opacity", 1)
//                     .selectAll("text")
//                     .style("opacity", 1);
//             })
//             .on("mouseout", function(d) {
//                 d3.select(this).style("stroke-opacity", 0.1);
//                 d3.selectAll(".node")
//                     .style("opacity", null)
//                     .selectAll("text")
//                     .style("opacity", 1);
//             })
//             .on("click", function(d) {}); // end of onclick function

//         // node hover and pills
//         var node = svg.append("g").selectAll(".node")
//             .data(mydatabase.nodes)
//             .enter().append("g")
//             .attr("class", "node")
//             .attr("transform", function(d) {
//                 return "translate(" + d.x + "," + d.y + ")";
//             })
//             .on("mouseover", function(d) {
//                 d3.selectAll(".link")
//                     .style("stroke-opacity", 0.1)
//                     .filter(function(p) {
//                         return (p.source.name == d.name || p.target.name == d.name);
//                     })
//                     .style("stroke-opacity", 0.5);
//             })
//             .on("mouseout", function(d) {
//                 d3.selectAll(".link")
//                     .style("stroke-opacity", 0.1)
//                     .selectAll("text")
//                     .style("opacity", 1);
//             })
//             .on("click", function(d) {

//                 clickCounter++;
//                 var filterPillGroup = d3.select(".filterPills")
//                     .append("g")
//                     .attr("id", function(d) {
//                         return "rect" + clickCounter
//                     });

//                 var textBox = filterPillGroup.append("text")
//                     .attr("x", function(d) {
//                         return (nextBoxX);
//                     })
//                     .attr("y", pillHeight / 2)
//                     .attr("dy", "1em")
//                     .attr("dx", "1em")
//                     .attr("alignment-baseline", "middle")
//                     .attr("text-anchor", "left")
//                     .attr("class", "filterPillsText")
//                     .text(function() {
//                         return d.name + " " + " " + "X";
//                     });

//                 var bbox = textBox.node().getBBox();

//                 filterPillGroup.append("rect")
//                     .style("opacity", "0.2")
//                     .attr("width", bbox.width + 10)
//                     .attr("height", bbox.height)
//                     .attr("rx", 3).attr("ry", 3)
//                     .attr("x", bbox.x)
//                     .attr("y", bbox.y);

//                 nextBoxX = nextBoxX + bbox.width + 15;

//                 filterPillGroup.on("click", function() {
//                     d3.select(this).remove();
//                 });
//             }); // end of onclick function


//         node.append("rect")
//             .attr("height", function(d) {
//                 return d.dy;
//             })
//             .attr("width", sankey.nodeWidth())
//             .style("fill", function(d) {
//                 return color(d.category);
//             })
//             .append("title")
//             .text(function(d) {
//                 return d.name;
//             });


//         node.append("text")
//             .attr("x", 6 + sankey.nodeWidth())
//             .attr("y", function(d) {
//                 return d.dy / 2;
//             })
//             .attr("dy", ".35em")
//             .attr("text-anchor", "start")
//             .attr("transform", null)
//             .text(function(d) {
//                 return d.name;
//             })
//             .filter(function(d) {
//                 return d.x > width * .9;
//             })
//             .attr("class", function(d) {
//                 return d.category;
//             })
//             .attr("text-anchor", "end");

//         node.selectAll("text")
//             .transition()
//             .duration(300)
//             .delay(function(d, i) {
//                 return parseInt(d.id) * 15 > 700 ? parseInt(d.id) * 10 : parseInt(d.id) * 15;
//             })
//             .style("opacity", 1);
//     });
// }