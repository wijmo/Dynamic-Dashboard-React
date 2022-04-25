// React
import * as React from 'react';
// Wijmo
import * as wjcChart from '@grapecity/wijmo.chart';
import * as wjChart from '@grapecity/wijmo.react.chart';
export const ColumnChart = ({ data, palette }) => (<wjChart.FlexChart chartType={wjcChart.ChartType.Column} itemsSource={data} palette={palette} bindingX="date" axisX={{ format: 'MMM-yy' }}>
		<wjChart.FlexChartAxis wjProperty="axisX" format="MMM yy"/>
		<wjChart.FlexChartSeries name="Sales" binding="sales"/>
		<wjChart.FlexChartSeries name="Expenses" binding="expenses"/>
		<wjChart.FlexChartSeries name="Profit" binding="profit" chartType={wjcChart.ChartType.LineSymbols}/>
	</wjChart.FlexChart>);
