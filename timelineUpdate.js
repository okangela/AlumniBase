function updateTimeline() {
    d3.json("google.json", function(timeLineData) {
        // console.log (timeLineData);
        function timelineStackedIcons() {
            var chart = d3.timeline()
                .showTimeAxisTick() // toggles tick marks
                .colors(jobScale)
                .colorProperty("job")
                .stack() // toggles graph stacking
                .margin({
                    left: 10,
                    right: 50,
                    top: 0,
                    bottom: 0
                })
                .itemHeight(24)
                .itemMargin(6)
                .tickFormat({
                    format: d3.time.format("%Y"),
                    tickTime: d3.time.year,
                    tickInterval: 1,
                    tickSize: 6
                })
                .background("none")
                .orient("top");

            chart.mouseover(function(d, i, datum) {
                timelineTip.show(d);
            })
                .mouseout(function(d, i, datum) {
                    timelineTip.hide(d);
                });

            d3.select(".timeline").select("svg").remove();
            var svg = d3.select(".timeline").append("svg").attr("width", widthTimeline)
                .datum(timeLineData).call(chart);
        }
        timelineStackedIcons();
    });

}