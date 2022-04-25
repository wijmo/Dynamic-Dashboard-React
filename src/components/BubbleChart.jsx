// React
import * as React from 'react';
// Wijmo
import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
export const BubbleChart = ({ data, palette }) => (<wjChart.FlexChart chartType={wjcChart.ChartType.Bubble} itemsSource={data} palette={palette} bindingX="date">
		<wjChart.FlexChartAxis wjProperty="axisX" format="MMM yy"/>
		<wjChart.FlexChartSeries name="Sales/Profit" binding="sales,profit"/>
	</wjChart.FlexChart>);
