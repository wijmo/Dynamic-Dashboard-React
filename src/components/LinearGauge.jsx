// React
import * as React from 'react';
// Wijmo
import * as wjcCore from '@grapecity/wijmo';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
export const LinearGauge = ({ data, palette }) => {
    const lastItem = data.items[data.items.length - 1];
    return (<div style={{ width: '100%' }}>
			<div className="flex-row">
				<h4>Sales: {wjcCore.Globalize.format(lastItem.sales, 'c')}</h4>
				<wjGauge.LinearGauge min={0} max={1000} thickness={0.15} thumbSize={9} value={lastItem.sales} pointer={{ color: palette[0] }}/>
			</div>

			<div className="flex-row">
				<h4>Expenses: {wjcCore.Globalize.format(lastItem.expenses, 'c')}</h4>
				<wjGauge.LinearGauge min={0} max={1000} thickness={0.15} thumbSize={9} value={lastItem.expenses} pointer={{ color: palette[1] }}/>
			</div>

			<div className="flex-row">
				<h4>Profit: {wjcCore.Globalize.format(lastItem.profit, 'c')}</h4>
				<wjGauge.LinearGauge min={0} max={1000} thickness={0.15} thumbSize={9} value={lastItem.profit} pointer={{ color: palette[2] }}/>
			</div>
			
			<h3>KPIs for {wjcCore.Globalize.format(lastItem.date, 'MMMM yyyy')}</h3>
		</div>);
};
