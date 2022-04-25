// React
import * as React from 'react';
// Wijmo
import * as wjcCore from '@grapecity/wijmo';
import * as wjGauge from '@grapecity/wijmo.react.gauge';
export const BulletGraph = ({ data }) => (<div style={{ width: '100%', padding: '0 1rem', overflow: 'hidden' }}>
		<table className="table">
			<tbody>
				{data.items.map((item, index) => (<tr key={index}>
						<td>{wjcCore.Globalize.format(item.date, 'MMM yyyy')}</td>
						<td>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="orange" style={{ display: item.profit <= 400 ? 'block' : 'none' }}>
								<path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"/>
							</svg>
						</td>
						<td>
							<wjGauge.BulletGraph hasShadow={false} value={item.profit} min={0} bad={400} target={600} good={600} max={1000}/>
						</td>
					</tr>))}
			</tbody>
		</table>
	</div>);
