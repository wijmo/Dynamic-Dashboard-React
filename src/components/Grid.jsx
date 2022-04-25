// React
import * as React from 'react';
// Wijmo
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjGrid from '@grapecity/wijmo.react.grid';
export const Grid = ({ data, palette }) => (<wjGrid.FlexGrid isReadOnly={true} headersVisibility={wjcGrid.HeadersVisibility.Column} selectionMode={wjcGrid.SelectionMode.ListBox} itemsSource={data}>
		<wjGrid.FlexGridColumn header="ID" binding="id" width={50}/>
		<wjGrid.FlexGridColumn header="Date" width="*" binding="date" format="MMM yyyy"/>
		<wjGrid.FlexGridColumn header="Sales" binding="sales" format="c"/>
		<wjGrid.FlexGridColumn header="Expenses" binding="expenses" format="c"/>
		<wjGrid.FlexGridColumn header="Profit" binding="profit" format="c"/>
	</wjGrid.FlexGrid>);
